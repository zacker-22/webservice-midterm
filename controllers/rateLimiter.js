import setRateLimit from "express-rate-limit";

// Rate limit middleware
export const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {"error":"Rate limit exceeded", "message": "Too many requests, Only 5 allowed per minute"},
  headers: true,
});

