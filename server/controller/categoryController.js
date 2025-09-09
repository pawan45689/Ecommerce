
import slugify from "slugify"
import categoryModel from '../models/categorymodel.js';

export const createCategoryController = async (req,res) =>{
    const {name} =req.body;
   try{
   
    if(!name){
        return res.status(401).send({message:"Name is required"});
    }
    const categroy= await new categoryModel({
        name,
        slug: slugify(name),
    }).save();
    res.status(201).send({
        success: true,
        message: "Category created successfully",
        categroy,
        
      });
   }
    catch (error){
        console.log(error);
        res.status(500).send({
            error,
            message:"error in categroy"
        })
    }
}
//get all
export const getAllCategories = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).json({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({
        success: false,
        message: "Error while getting all categories",
        error,
      });
    }
  }
  // Delete Category
export const deleteCategoryController = async(req,res)=>{
  try{
    const {id} = req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
        return res.status(404).send({
            success: false,
            message: "Category not found"
        });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
        success: true,
        message: "Category Deleted Successfully"
    });
} catch(error) {
    console.log(error);
    res.status(500).send({success: false,
      message: "Error in deleting category", })
    
    
}  
}   
//update 
export const updatecategoryController = async(req,res)=>{
  try{
      const{id}=req.params;
      const{name}=req.body;
      const updatecategory=await categoryModel.findByIdAndUpdate(id,
          {name,slug:slugify(name) },
          {new:true}
      );
      res.status(200).send({
          success:true,
          message:"Category Updated Successfully",
          updatecategory,
      })
  }catch(error){
      console.log(error);
      res.status(500).send({
          success:false,
          message:"Error in updating category",
          error,
      })
  }
};
