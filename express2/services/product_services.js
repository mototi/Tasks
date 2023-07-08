import { z } from "zod";

const userSchema = z.object({
    name : z.string().min(3),
    price: z.number(),
    category_id: z.number()
  });

  export const validateProduct_Post = (req, res, next) => {
    try {
        req.body = userSchema.parse(req.body);
        next();
      } catch (error) {
        res.status(400).json(JSON.parse(error.message));
      }
  }

  
  export const validateProduct_Put = (req, res, next) => {
    try {
      const schema = userSchema.partial();
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        res.status(400).json(JSON.parse(error.message));
      }
  }