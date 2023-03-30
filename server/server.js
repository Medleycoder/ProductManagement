const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require("./middleware/errorMiddleware")
const cookieParser = require('cookie-parser');


///////REQUIRING ROUTES FILE/////////////////

const userRoute = require('./routes/userRoute')

///////REQUIRING ROUTES FILE/////////////////



//////////MIDDELWARE///////////////

require('dotenv').config();


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(bodyParser.json());   ////while sending the data from frontend to backend bodyparser convert the data in a object easily understand
app.use(morgan('dev'))

//////////MIDDELWARE///////////////




/////////ROUTES MIDDLEWARE//////////////////

app.use('/api/user',userRoute)


/////////ROUTES MIDDLEWARE//////////////////


//////////ERROR MIDDLEWARE/////////////////

app.use(errorHandler);

//////////ERROR MIDDLEWARE/////////////////



mongoose.set('strictQuery',true);
mongoose.connect(process.env.Database,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(()=>{

    app.listen(process.env.PORT,(req,res)=>{
        console.log('Database Connected','http://localhost:3005')
     })
})
.catch((err)=>{
    console.log(err)
})
;

