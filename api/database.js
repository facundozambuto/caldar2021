const mongoose = require('mongoose');
const db = mongoose.connection;
//const uri = 'mongodb://localhost:27017/caldarDatabase';
const uri = 'mongodb+srv://facundozambuto:mongo123@cluster0.1vih7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

function connectDB() {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db.on('open' , _ => {
        console.log('Database connected');
    });

    db.on('error' , err => {
        console.log(err);
    });
}   

connectDB();