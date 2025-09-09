import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { Checkbox, Radio } from "antd";
import { useCart } from "../../context/cart";
import axios from "axios";
import banner from "../image/banner.webp";
import toast from "react-hot-toast";
import price from "../price/Price.js";
import Layout from "../layouts/Layout";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page !== 1) loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prev) => [...prev, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    setChecked((prev) =>
      value ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProduct();
  }, [checked, radio]);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"E-Commerce Home Page"}>
      <div className="container-fluid mt-4">
        <img src={banner} alt="Banner" className="w-100 rounded shadow-lg" />
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 bg-white p-4 rounded shadow-sm">
            <h4 className="text-primary text-center mb-3">
              Filter by Category
            </h4>
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="mb-2 text-secondary"
              >
                {c.name}
              </Checkbox>
            ))}
            <h4 className="text-primary mt-4 mb-3">Filter by Price</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {price.map((p) => (
                <Radio
                  key={p._id}
                  value={p.array}
                  className="mb-2 text-secondary"
                >
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>
            <button
              className="btn btn-danger w-100 mt-4 rounded-pill"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
          <div className="col-md-9">
            <h1 className="text-center text-success mb-4">All Products</h1>
            <div className="row g-4">
              {products.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    <img
                      src={`/api/v1/product/get-image/${p._id}`}
                      alt={p.name}
                      className="card-img-top object-fit-cover"
                      style={{ height: "200px" }}
                    />
                    <div className="card-body bg-light p-3">
                      <h5 className="text-dark text-center fw-bold">
                        {p.name}
                      </h5>
                      <h5 className="text-primary text-center my-2">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                      <div className="d-flex justify-content-around mt-3">
                        <button
                          className="btn btn-outline-primary rounded-pill"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-outline-danger rounded-pill"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart",JSON.stringify([...cart, p]))
                            toast.success("Item Added to Cart");

                           
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center my-4">
              {products.length < total && (
                <button
                  className="btn btn-danger px-4 py-2 rounded-pill"
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <AiOutlineReload className="me-2" />
                      Load More
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
