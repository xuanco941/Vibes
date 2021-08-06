const mongoose = require('mongoose');

// const urlConnect = 'mongodb+srv://xuanco941:942001xX@cluster0.ds7ba.mongodb.net/Vibes?retryWrites=true&w=majority';

const urlTest = 'mongodb://localhost:27017/Vibes';

const connectDataBase = async () => {
        try {
                await mongoose.connect(urlTest, { useNewUrlParser: true, useUnifiedTopology: true });
                console.log('Connected');
        }
        catch{
                console.log('connect failure')
        }
}

module.exports = connectDataBase;