import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-singleproduct/${params.slug}`
      );
      console.log("Fetched Product Data:", data);
      if (data?.success) {
        setId(data.product._id);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category?._id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (image) productData.append("image", image);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        getSingleProduct();
        navigate("/admin/product");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product deleted successfully");
        navigate("/admin/product");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75">
              <div className="card-header">
                <h1>Update Products</h1>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label>Select Category</label>
                  <Select
                    className="form-control mt-2"
                    bordered={false}
                    showSearch
                    placeholder="Choose category"
                    value={category} // Add this line
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {image ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/product/get-image/${id}`}
                        alt=""
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write product name"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Write product description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Write product price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Write product quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <Select
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">Yes</Option>
                    <Option value="1">No</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Update Product
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
