import type { Request, Response, NextFunction } from "express"
import Joi from "joi"

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    stock: Joi.number().required().min(0),
    image: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: "Validation Error",
      error: error.details[0].message,
    })
  }

  next()
}

