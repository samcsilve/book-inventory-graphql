const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config();

const app = express();

// Allow cross-origin requests
app.use(cors())

// Connect to MongoDB Atlas
const MongoURI = process.env.MONGO_URI
mongoose.connect(MongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => console.log(`Connected to MongoDB`))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
