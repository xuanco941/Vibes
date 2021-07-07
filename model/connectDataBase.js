const mongoose = require('mongoose');

function connectDataBase () {
    try {
        mongoose.connect('mongodb://localhost:27017/Vibes', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected');

    } catch (error) {
        console('Connect failed !!');
    }
}

module.exports = connectDataBase;