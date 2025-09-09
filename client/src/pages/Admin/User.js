// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layouts/Layout";
// import AdminMenu from "../../components/layouts/AdminMenu";
// import toast from "react-hot-toast";
// import axios from "axios";

// //  Users Component
// const User = () => {
//   const [users, setUsers] = useState([]);

//   // Get Users
//   const getAllUsers = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/auth/all-users");
//       if (data?.success) {
//         setUsers(data?.Users);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("User Loading Failed");
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   return (
//     <Layout title="Users">
//       <div className="container mt-5 bg-light shadow-lg p-4 rounded-2xl">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-primary text-uppercase mb-4">User List</h1>
//             <div className="card shadow-sm p-3">
//               <table className="table table-hover table-bordered">
//                 <thead className="table-primary">
//                   <tr>
//                     <th scope="col">User Name</th>
//                     <th scope="col">Email</th>
//                     <th scope="col">Phone</th>
//                     <th scope="col">Address</th>
//                     <th scope="col">Role</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users ?.map((users ) => (
//                     <tr key={users ._id}>
//                       <td>{users.username}</td>
//                       <td>{users.email}</td>
//                       <td>{users.phone}</td>
//                       <td>{users.address}</td>
//                       <td>{users.role === 1 ? "Admin" : "User"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default User;