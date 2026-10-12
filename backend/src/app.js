const express=require('express');
const cookieParser=require('cookie-parser');

const cors=require('cors');
//import router
const authRouter=require('./router/auth.router');
//food router
const foodRouter=require('./router/foodAuth.router');
//foodAdd router
const foodAddRouter=require('./router/foodAdd.router');

const foodPartnerRouter=require('./router/food-partner.router')


const app=express();

// app.use((req, res, next) => {
//     console.log("🔥 REQUEST RECEIVED:", req.method, req.url);
//     next();
// });



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
//router API path
app.use('/api/auth',authRouter);
//API for food-Partner
app.use('/api/food',foodRouter);
//API for food-Add
app.use('/api/foodAdd',foodAddRouter);

//API for food-partner
app.use('/api/foodPartner',foodPartnerRouter)


module.exports=app;