import express from 'express' 
import {Router} from './routes/productRoutes.js'
import {userRouter} from './routes/users.js'
import {productRouter} from './routes/product_route.js'



const app = express();
app.use(express.json());
app.use(Router)
app.use(userRouter)
app.use(productRouter)

app.listen(8080 , () => console.log("server on http://localhost:8080"));