const mongoose = require('mongoose');
require('dotenv').config(); // Load variables from .env file


const mongoURI = process.env.MONGODB_URI;

const mongoDB = async () => { 
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected');

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        
        

        global.food_items = fetchedData; 
        global.foodCategory = foodCategory;

        //console.log('Food items:', global.food_items);
        // console.log('Food categories:', global.foodCategory);
    } catch (err) {
        console.error(err);
    } 
}

module.exports = mongoDB;
