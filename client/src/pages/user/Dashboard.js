import React from "react";
import UserMenu from "../../components/layouts/UserMenu";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/auth";

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
     
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
            <UserMenu />
          </div>

       
          <div className="w-full md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-black mb-4">
                Welcome, <span className="text-yellow-300">{auth?.user?.username || "User"}</span>
              </h2>
              <hr className="border-t-2 border-blue-200 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "User Name", value: auth?.user?.username || "N/A" },
                  { label: "User Email", value: auth?.user?.email || "N/A" },
                  { label: "User Phone", value: auth?.user?.phone || "N/A" },
                  { label: "User Address", value: auth?.user?.address || "N/A" },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h5 className="text-sm text-gray-500">{item.label}:</h5>
                    <p className="font-semibold text-gray-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
