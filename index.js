const express = require('express');
const mongoose = require('mongoose');
const PORT = 3000;
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts')
const dotenv = require('dotenv').config();
const connectDb = require('./database/connectDb')

const app = express();

app.use(express.json());
//middleware
app.use('/api/user', authRouter);
app.use('/api/posts', postRouter)


const startServer = () => {
    try {
        connectDb(process.env.CONNECTION);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);

    }
}
startServer();
