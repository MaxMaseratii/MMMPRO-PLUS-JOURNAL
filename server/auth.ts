import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "max-maserati-model-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("[AUTH] LocalStrategy - Looking up user:", username);
        // Support login with email OR username
        let user = await storage.getUserByUsername(username);
        if (!user && username.includes('@')) {
          user = await storage.getUserByEmail(username);
        }
        
        if (!user) {
          console.log("[AUTH] LocalStrategy - User not found:", username);
          return done(null, false);
        }
        
        console.log("[AUTH] LocalStrategy - Comparing passwords for:", username);
        const isPasswordValid = await comparePasswords(password, user.password);
        
        if (!isPasswordValid) {
          console.log("[AUTH] LocalStrategy - Invalid password for:", username);
          return done(null, false);
        }
        
        console.log("[AUTH] LocalStrategy - Authentication success for:", username);
        return done(null, user);
      } catch (error) {
        console.log("[AUTH] LocalStrategy - Error during authentication:", error);
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    console.log("[AUTH] Serializing user:", user.id, user.username);
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      console.log("[AUTH] Deserializing user with ID:", id);
      const user = await storage.getUser(id);
      
      if (!user) {
        console.log("[AUTH] Deserialization failed: User not found with ID:", id);
        return done(null, false);
      }
      
      console.log("[AUTH] User deserialized successfully:", user.username);
      done(null, user);
    } catch (error) {
      console.log("[AUTH] Error deserializing user:", error);
      done(error);
    }
  });

  const registerSchema = insertUserSchema.pick({
    username: true,
    password: true,
    email: true,
    name: true,
  }).extend({
    username: z.string().min(3).max(50),
    password: z.string().min(6),
    email: z.string().email(),
    name: z.union([z.string().min(2), z.literal("")]).optional(),
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      console.log("[AUTH] Registration attempt:", req.body.username);
      
      const validatedData = registerSchema.parse(req.body);
      console.log("[AUTH] Validation successful for:", validatedData.username);
      
      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        console.log("[AUTH] Registration failed: Username already exists:", validatedData.username);
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        console.log("[AUTH] Registration failed: Email already exists:", validatedData.email);
        return res.status(400).json({ message: "Email already exists" });
      }
      
      console.log("[AUTH] Creating user:", validatedData.username);
      const user = await storage.createUser({
        ...validatedData,
        email: validatedData.email.toLowerCase().trim(),
        username: validatedData.username.trim(),
        password: await hashPassword(validatedData.password),
      });
      console.log("[AUTH] User created successfully:", user.id, user.username);

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      console.log("[AUTH] Logging in new user:", user.username);
      req.login(user, (err) => {
        if (err) {
          console.log("[AUTH] Error logging in new user:", err);
          return next(err);
        }
        console.log("[AUTH] Registration and login successful for:", user.username);
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.log("[AUTH] Registration error:", error);
      if (error instanceof z.ZodError) {
        console.log("[AUTH] Validation error:", error.errors);
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    console.log("[AUTH] Login attempt for username:", req.body.username);
    
    passport.authenticate("local", (err: Error | null, user: SelectUser | false, info: any) => {
      if (err) {
        console.log("[AUTH] Login error:", err);
        return next(err);
      }
      if (!user) {
        console.log("[AUTH] Login failed: Invalid credentials");
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      console.log("[AUTH] User authenticated successfully:", user.username);
      
      req.login(user, (loginErr) => {
        if (loginErr) {
          console.log("[AUTH] Session creation error:", loginErr);
          return next(loginErr);
        }
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        console.log("[AUTH] Login successful for:", user.username);
        return res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });
}
