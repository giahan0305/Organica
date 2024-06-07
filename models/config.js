// config/mongo.js
const mongoose = require('mongoose');
const uri = 'mongodb+srv://giahan:02qyyD7QAebWZB08@cluster0.urehlvv.mongodb.net/Organica?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

module.exports = connectDB;
