const express=require('express')
const cors=require('cors');
const app =express();
const mongoose=require('mongoose')
const router=require('./routes/empRoutes')

app.use(express.json())
app.use(cors());

const port =process.env.port|| '8080'





//Database Connection

mongoose.connect("mongodb://127.0.0.1:27017/emp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
    .then(() => console.log("coonnect to db"))
    .catch((err) => console.log(err))


app.use('/api',router)

app.listen(port,()=>{


    console.log(`server started at ${port}`)
})