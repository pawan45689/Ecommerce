import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    let updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // Fetch Braintree client token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.error("Error fetching Braintree token:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    if (!instance) {
      toast.error("Payment gateway not initialized. Please wait.");
      return;
    }
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful!");
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment Failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {auth?.user ? `Hello, ${auth.user.username}` : "Hello Guest"}
            </h1>
            <p className="text-center">
              {cart.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout!"
                  }`
                : "Your Cart is Empty"}
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {/* Cart Items */}
            <div className="col-md-7 p-0 m-0">
              {cart.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/get-image/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height="130px"
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}...</p>
                    <p>Price: {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                     >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Cart Summary & Payment */}
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>

              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth.user.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", { state: "/cart" })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}

              {/* Braintree DropIn */}
              {clientToken && auth?.token && cart.length > 0 && (
                <div className="mt-2">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(inst) => {
                      console.log("Braintree instance initialized");
                      setInstance(inst);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
