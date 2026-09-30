import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeAnalytics, trackPerformance } from "./lib/analytics";

// Initialize Google Analytics
initializeAnalytics();

// Track site performance metrics
trackPerformance();

createRoot(document.getElementById("root")!).render(<App />);
