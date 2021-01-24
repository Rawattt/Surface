const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster.glwj2.mongodb.net/surface?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex: true
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        // Exit process in failure
        process.exit(1);
    }
};

module.exports = connectDB;
