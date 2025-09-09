import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState();

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.error) {
        toast.error(data.message);
      } else {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating product");
    }
  };

  return (
    <Layout>
      <div className="container mt-5 p-5 bg-light shadow-lg rounded-3xl">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-4 border-0 rounded-3xl shadow-sm">
              <h2 className="text-center text-primary mb-4 text-uppercase">
                Add Product
              </h2>
              <form onSubmit={handleCreate}>
                <div className="form-group mb-4">
                  <label>Select Category</label>
                  <Select
                    className="form-control mt-2"
                    bordered={false}
                    showSearch
                    placeholder="Choose category"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="form-group mb-4">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label>Description</label>
                  <textarea
                    className="form-control mt-2"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control mt-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control mt-2"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className=" btn btn-outline-secondary col-md-12">
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      name="image/"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className=" form-group mb-4">
                  {image && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

                <div className="form-group mb-4">
                  <label>Shipping</label>
                  <Select
                    className="form-control mt-2"
                    bordered={false}
                    placeholder="Select shipping option"
                    onChange={(value) => setShipping(value)}
                    value={shipping}
                    required
                  >
                    <Option value="">-- Select Shipping Option --</Option>
                    <Option value="0">Yes</Option>
                    <Option value="1">No</Option>
                  </Select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mt-3"
                >
                  Create Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
