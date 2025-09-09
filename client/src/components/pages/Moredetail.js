import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../layouts/Layout";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const detailProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-singleproduct/${slug}`);
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    detailProduct();
  }, []);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to Cart");
    navigate("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className="container my-5">
        <div className="row g-4 align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="border rounded p-3 shadow-lg bg-white">
              <img
                src={`/api/v1/product/get-image/${product._id}`}
                alt={product.name}
                className="img-fluid rounded"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="border rounded p-4 shadow-lg bg-light">
              <h2 className="text-center mb-4 text-danger">{product.name}</h2>
              <hr />
              <h4 className="text-dark mb-4">
                {product.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </h4>
              <p className="mb-4 fw-light">{product.description}</p>
              <p className="mb-4">
                <strong>Category:</strong> {product.category?.name}
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-danger " onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
