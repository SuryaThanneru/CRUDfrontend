import React, { useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/users"; // Ensure this matches your backend

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Function to Fetch Users on Button Click
  const fetchUsers = async () => {
    setLoading(true);
    setMessage("Fetching users...");

    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setMessage("Users fetched successfully!");
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>

      {/* ✅ "Get Users" Button */}
      <Button onClick={fetchUsers} variant="primary" className="mb-3">
        Get Users
      </Button>

      <p className="alert alert-info">{message}</p>

      {/* ✅ Display Users Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
