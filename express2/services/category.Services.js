
import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(3)
  });

export const validCategory = (req , res , next) => {
    try {
        req.body = userSchema.parse(req.body);
        next();
      } catch (error) {
        res.status(400).json(JSON.parse(error.message));
      }
}