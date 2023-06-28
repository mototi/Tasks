import express from 'express' 
import {Router} from './routes/productRoutes.js'


const app = express();
app.use(express.json());
app.use(Router)


app.listen(8080 , () => console.log("server on http://localhost:8080"));