import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Products"}>
      <div className="container mt-2 bg-light shadow-lg">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mb-4">
            <h2 className="text-danger text-uppercase mb-4 text-center">
              Product List
            </h2>
            {products.length > 0 ? (
              <div className="row">
                {products.map((product) => (
                  <div className="col-md-4 mb-4" key={product._id}>
                    <Link
                      to={`/dashboard/admin/product/${product.slug}`}
                      className="text-decoration-none"
                    >
                      <div className="card mb-4" style={{ height: "500px" }}>
                        <img
                          src={`/api/v1/product/get-image/${product._id}`}
                          alt={product.name}
                          style={{ height: "200px" }}
                        />
                        <div className="card-body">
                          <h5 className="text-center text-danger fw-bold">
                            {product.name}
                          </h5>
                          {/* <p className="text-center text-muted">
                            {product.description}
                          </p> */}
                          <p className="text-center text-dark fw-bold">
                            Quantity:{product.quantity}
                          </p>
                          <p className="text-center text-dark fw-bold">
                            Price: ₹{product.price}
                          </p>
                          <p className="text-center text-dark fw-bold">
                            Shipping:{product.shipping ? "yes" : "no"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
