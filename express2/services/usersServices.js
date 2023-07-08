import { z } from "zod";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();



const userSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8),
    passwordRepeat : z.string().min(8)
  })
  .superRefine( ( { email, password, passwordRepeat } , ctx ) => {
    if (password == undefined || email == undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "field is empty",
          fatal: true,
        });
        z.NEVER;
    }

    if (passwordRepeat !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "confirmed pass doen't match password",
          fatal: true,
        });
        z.NEVER;
    }

    if( !checkPassword(password) ){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "password: must be 8 characters with at least 1 capital and 1 small and 1 special character",
            fatal: true,
        });
        z.NEVER;
    }

})

const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8)
  }).superRefine( ( { email, password } , ctx ) =>{
    if (password == undefined || email == undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "field is empty",
          fatal: true,
        });
        z.NEVER;
    }

    if( !checkPassword(password) ){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "password: must be 8 characters with at least 1 capital and 1 small and 1 special character",
            fatal: true,
        });
        z.NEVER;
    }

  })

const checkPassword = (str)=>{
    const re = /^(?=.*[!@#$%^&*_()-+=/"':;><?~`])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

export const validregister = (req, res, next) => {
    try {
      req.body = userSchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json(JSON.parse(error.message));
    }
};


export const validlogin = (req, res, next) => {
    try {
        req.body = loginSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json(JSON.parse(error.message));
    }
};


export const verifiction = (req , res , next) => {
  try {
    const[_ , token] = req.headers.authorization.split(" ");
    const decode = jwt.verify(token , process.env.JWT_PASS)
    req.user = decode
    next();
  } catch (error) {
    return res.status(401).json({ status : "error" , meesage : "Unauthenticatedd"})
  }
}

