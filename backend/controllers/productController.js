const Product = require('../models/Product')

//create a product
exports.createProduct = async (req,res) => {
 try {
    const product = await Product.create(req.body)
    res.json({
        message:"product added successfully",
        product
    })
 } catch (error) {
    res.status(500).json({
        message:"server error",error
    });
 }   
}

//get all product
exports.getproducts=async (req,res) => {
    try {
      const product = await Product.find().sort({createdAt: -1});
      res.json(product);
      

    } catch (error) {
    res.status(500).json({
        message:"server error",error
    });
 }   
}

//update product
exports.updateproduct=async (req,res) => {
    try {
        const updated= await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json({
            message:"product updated successfully",
            updated,
        });


    } catch (error) {
    res.status(500).json({
        message:"server error",error
    });
 }   
}

//delete product

exports.deleteproduct=async (req,res) => {
    try {
       await Product.findByIdAndDelete(req.params.id)
       res.json({
        message:"product delete successfully"
       })
    } catch (error) {
    res.status(500).json({
        message:"server error",error
    });
 }  
}