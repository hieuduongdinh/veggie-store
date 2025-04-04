import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface DecodedToken {
  id: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as DecodedToken
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" })
  }
}

export const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Not authorized as an admin" })
  }
}

