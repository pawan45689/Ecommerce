import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
            <div className="bg-white p-5 shadow-lg rounded-xl">
              <AdminMenu />
            </div>

          
            <div className="col-span-3">
              <div className="bg-white p-8 shadow-lg rounded-xl">
              <h2 className="text-3xl font-semibold text-black mb-4">
                Welcome, <span className="text-yellow-300">{auth?.user?.username || "Admin"}</span>
              </h2>
                <hr className="mb-4" />
                <div className="space-y-4">
                  <div>
                    <h5 className="text-gray-500">Admin Name:</h5>
                    <p className="text-lg font-semibold text-gray-900">
                      {auth?.user?.username || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-gray-500">Admin Email:</h5>
                    <p className="text-lg font-semibold text-gray-900">
                      {auth?.user?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-gray-500">Admin Phone:</h5>
                    <p className="text-lg font-semibold text-gray-900">
                      {auth?.user?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
