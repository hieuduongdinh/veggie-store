import type { Request, Response, NextFunction } from "express"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack)

  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  })
}

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    message: `Not Found - ${req.originalUrl}`,
  })
}

