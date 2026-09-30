import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email").notNull(),
  role: text("role").default("user"),
  profilePicture: text("profile_picture"),
  bio: text("bio"),
  dateOfBirth: text("date_of_birth"),
  tradingExperience: text("trading_experience"),
  tradingSince: text("trading_since"),
  nationality: text("nationality"),
  showFlag: boolean("show_flag").default(false),
  hasActiveSubscription: boolean("has_active_subscription").notNull().default(false),
  subscriptionLevel: text("subscription_level"),
  subscriptionExpiry: text("subscription_expiry"),
  plan: text("plan"),
  resetToken: text("reset_token"),
  resetTokenExpiry: text("reset_token_expiry"),
  hasCompletedTour: boolean("has_completed_tour").notNull().default(false),
  lastLogin: text("last_login"),
  createdAt: text("created_at"),
  lastActive: text("last_active"),
  stripeCustomerId: text("stripe_customer_id"),
  subscriptionStartDate: text("subscription_start_date"),
  subscriptionStatus: text("subscription_status").default("inactive"),
  subscriptionRenewal: boolean("subscription_renewal").default(true),
  tradingViewUsername: text("trading_view_username"),
  tradingViewLinked: boolean("trading_view_linked").default(false),
  tradingViewAccessGranted: boolean("trading_view_access_granted").default(false),
  tradingViewRequestDate: text("trading_view_request_date"),
  tradingViewAccessDate: text("trading_view_access_date"),
  tradingViewAccessExpiryDate: text("trading_view_access_expiry_date"),
  tradingViewAccessStatus: text("trading_view_access_status").default("pending"),
  whopUserId: text("whop_user_id"),
  whopLinked: boolean("whop_linked").default(false),
  youtubeSubscribed: boolean("youtube_subscribed").default(false),
  youtubeVerificationDate: text("youtube_verification_date"),
  referredBy: text("referred_by"),
  referralCount: integer("referral_count").default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  hasActiveSubscription: true,
  subscriptionLevel: true,
  subscriptionExpiry: true,
  plan: true,
  resetToken: true,
  resetTokenExpiry: true,
  hasCompletedTour: true,
  lastLogin: true,
  createdAt: true,
  stripeCustomerId: true,
  subscriptionStartDate: true,
  subscriptionStatus: true,
  subscriptionRenewal: true,
  tradingViewUsername: true,
  tradingViewLinked: true,
  tradingViewAccessGranted: true,
  tradingViewRequestDate: true,
  tradingViewAccessDate: true,
  tradingViewAccessExpiryDate: true,
  tradingViewAccessStatus: true,
  whopUserId: true,
  whopLinked: true,
  youtubeSubscribed: true,
  youtubeVerificationDate: true,
  profilePicture: true,
  bio: true,
  dateOfBirth: true,
  tradingExperience: true,
  tradingSince: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Simplified schema for MMM Pro - focus on core tables
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;

export const inviteCodes = pgTable("invite_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  createdBy: integer("created_by"),
  usedBy: integer("used_by"),
  maxUses: integer("max_uses").default(1),
  usesCount: integer("uses_count").default(0),
  expiryDate: text("expiry_date"),
  isActive: boolean("is_active").default(true),
  createdAt: text("created_at").notNull(),
});

export type InviteCode = typeof inviteCodes.$inferSelect;

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: integer("price").notNull(),
  interval: text("interval").notNull(),
  durationDays: integer("duration_days").notNull(),
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").default(false),
  isActive: boolean("is_active").default(true),
  stripePriceId: text("stripe_price_id"),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at"),
});

export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;

export const userSubscriptions = pgTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  planId: integer("plan_id").notNull(),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  status: text("status").notNull(),
  currentPeriodStart: text("current_period_start").notNull(),
  currentPeriodEnd: text("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  canceledAt: text("canceled_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at"),
  whopDiscountCode: text("whop_discount_code"),
  whopDiscountCodeId: text("whop_discount_code_id"),
  whopPlanId: text("whop_plan_id"),
  whopFulfillmentStatus: text("whop_fulfillment_status").default("pending"),
  whopFulfillmentDate: text("whop_fulfillment_date"),
});

export type UserSubscription = typeof userSubscriptions.$inferSelect;

// Forum system
export const forumCategories = pgTable("forum_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  order: integer("order").default(0),
  isHidden: boolean("is_hidden").default(false),
  createdAt: text("created_at").notNull(),
  icon: text("icon"),
});

export type ForumCategory = typeof forumCategories.$inferSelect;

export const forumThreads = pgTable("forum_threads", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  authorId: integer("author_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  isPinned: boolean("is_pinned").default(false),
  isLocked: boolean("is_locked").default(false),
  views: integer("views").default(0),
  lastPostAt: text("last_post_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at"),
});

export type ForumThread = typeof forumThreads.$inferSelect;

export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  threadId: integer("thread_id").notNull(),
  authorId: integer("author_id").notNull(),
  content: text("content").notNull(),
  isEdited: boolean("is_edited").default(false),
  editedAt: text("edited_at"),
  createdAt: text("created_at").notNull(),
});

export type ForumPost = typeof forumPosts.$inferSelect;

// Analytics and notifications
export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  event: text("event").notNull(),
  page: text("page"),
  data: text("data"),
  timestamp: text("timestamp").notNull(),
  sessionId: text("session_id"),
  ip: text("ip"),
  userAgent: text("user_agent"),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

export const marketAlerts = pgTable("market_alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  symbol: text("symbol").notNull(),
  timeframe: text("timeframe").notNull(),
  alertType: text("alert_type").notNull(),
  condition: text("condition").notNull(),
  value: text("value").notNull(),
  message: text("message"),
  email: boolean("email").default(true),
  browser: boolean("browser").default(true),
  active: boolean("active").default(true),
  createdAt: text("created_at").notNull(),
  lastTriggered: text("last_triggered"),
  cooldownMinutes: integer("cooldown_minutes").default(60),
});

export type MarketAlert = typeof marketAlerts.$inferSelect;

export const marketNotifications = pgTable("market_notifications", {
  id: serial("id").primaryKey(),
  alertId: integer("alert_id").notNull(),
  userId: integer("user_id").notNull(),
  symbol: text("symbol").notNull(),
  message: text("message").notNull(),
  triggerValue: text("trigger_value").notNull(),
  currentValue: text("current_value").notNull(),
  createdAt: text("created_at").notNull(),
  read: boolean("read").default(false),
  data: jsonb("data"),
});

export type MarketNotification = typeof marketNotifications.$inferSelect;
