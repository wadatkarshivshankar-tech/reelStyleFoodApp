require('dotenv').config();
const connectDb=require('./src/db/db.js');
const app=require('./src/app');

connectDb();

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})