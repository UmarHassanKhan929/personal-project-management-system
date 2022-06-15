const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/schema')
const connectDB = require('./config/db')

require('dotenv').config()
const port = process.env.PORT || 5000


const app = express()

connectDB()

app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:process.env.NODE_ENV==='development'
}))


app.listen(port,console.log(`Server running on port ${port}`))

