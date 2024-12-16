const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const rateLimit = require('express-rate-limit');


const users = require('./routes/user_routes')
const tenants = require('./routes/tenants_routes')
const db = require('./db_config/db_connection')

app.use(bodyParser.json())
app.use(cors())

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 2, // Sample 2 request
    message: {
        status: false,
        message: 'Too many requests, please try again later.',
    },
    standardHeaders: true, 
    legacyHeaders: false,  
});

// Apply the rate limiter to all requests
app.use(apiLimiter);

app.use('/api/auth',users)
app.use('/api/tenant',tenants)


const port = process.env.PORT;


app.listen(port,()=>
{
    console.log("Express Server running on port" + " " + port)
})