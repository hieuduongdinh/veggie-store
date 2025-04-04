import type { Response } from "express"

export const successResponse = (res: Response, message: string, data: any = {}): Response => {
  return res.status(200).json({
    message,
    data,
  })
}

export const createdResponse = (res: Response, message: string, data: any = {}): Response => {
  return res.status(201).json({
    message,
    data,
  })
}

export const errorResponse = (res: Response, message: string, statusCode = 500): Response => {
  return res.status(statusCode).json({
    message,
  })
}

export const notFoundResponse = (res: Response, message = "Not Found"): Response => {
  return res.status(404).json({
    message,
  })
}

export const validationErrorResponse = (res: Response, message: string, errors: any): Response => {
  return res.status(400).json({
    message,
    errors,
  })
}

