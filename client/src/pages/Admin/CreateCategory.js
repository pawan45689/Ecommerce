import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import CategoryForm from "../../components/form/categoryForm";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/category/create-category", { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`);
      if (data.success) {
        toast.success("Category deleted");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {
        name: updatedName,
      });
      if (data?.success) {
        toast.success(`${updatedName} updated successfully`);
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  return (
    <Layout title={"Create Category"}>
      <div className="container mt-5 p-5 bg-light shadow-lg rounded-3xl">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="card p-4 border-0 rounded-3xl shadow-sm">
              <h2 className="text-center text-primary text-uppercase mb-4">
                Create New Category
              </h2>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div className="card p-4 mt-4 shadow-sm">
              <h3 className="text-center text-primary mb-3">Category List</h3>
              <table className="table table-hover table-striped">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td className="text-nowrap">
                        <button
                          className="btn btn-outline-info me-2 mt-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger mt-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal
          onCancel={() => setVisible(false)}
          footer={null}
          visible={visible}
          className="rounded-xl shadow-lg"
        >
          <h4 className="text-center text-primary">Update Category</h4>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
