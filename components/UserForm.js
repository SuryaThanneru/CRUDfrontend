import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/users"; // Replace with your actual API endpoint

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  // ✅ Fetch Users from API (GET)
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Handle Form Submission (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, age };

    try {
      if (editingUserId) {
        // ✅ Update Existing User (PUT)
        await axios.put(`${API_URL}/${editingUserId}`, userData);
      } else {
        // ✅ Add New User (POST)
        await axios.post(API_URL, userData);
      }
      fetchUsers(); // Refresh User List
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // ✅ Delete User (DELETE)
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers(); // Refresh User List
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ✅ Populate Form for Editing
  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setEditingUserId(user._id);
  };

  // ✅ Reset Form
  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setEditingUserId(null);
  };

  return (
    <div className="container">
      <h2>{editingUserId ? "Edit User" : "Add User"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </Form.Group>
        <Button type="submit" className="mt-2">{editingUserId ? "Update User" : "Add User"}</Button>
        {editingUserId && (
          <Button variant="secondary" className="mt-2 ms-2" onClick={resetForm}>
            Cancel Edit
          </Button>
        )}
      </Form>

      <h2 className="mt-4">User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <Button variant="warning" onClick={() => editUser(user)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserForm;
