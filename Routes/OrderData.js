const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/OrderData", async (req, res) => {
  try {
    let data = [...req.body.order_data]; 
    data.unshift({ order_date: req.body.order_date }); 

    
    let existingOrder = await Order.findOne({ email: req.body.email });

    if (!existingOrder) {
      
      await Order.create({
        email: req.body.email, 
        order_data: [data],
      });
    } else {
      
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

router.post('/myorderData', async (req, res) =>{
  try {
    
    let myData = await Order.findOne({'email': req.body.email })
    res.json({orderData: myData })

  } catch (error) {
    res.send("Server Error", error.message)

  }
})

module.exports = router;
