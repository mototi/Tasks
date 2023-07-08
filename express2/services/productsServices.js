
import { z } from "zod";

const userSchema = z.object({
    title: z.string(),
    price: z.number(),
    description: z.string(),
    categoryId: z.number(),
    images: z.array(z.string()),
  });

export const validatePost = (req, res, next) => {
  try {
    req.body = userSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(JSON.parse(error.message));
  }
};

export const validatePut = (req, res, next) => {
    try {
        const partialUser = userSchema.partial();
        req.body = partialUser.parse(req.body);
        next();
    } catch (error) {
      res.status(400).json(JSON.parse(error.message));
    }
  };

