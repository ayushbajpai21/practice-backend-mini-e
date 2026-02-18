const express=require("express")
const router=express.Router()
const {
    createProduct,
    getproducts,
    updateproduct,
    deleteproduct
}= require("../controllers/productController")


router.post("/add",createProduct)
router.get("/",getproducts)
router.put("/update/:id",updateproduct)
router.delete("/delete/:id",deleteproduct)

module.exports=router;