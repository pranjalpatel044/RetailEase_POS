// src/pages/ManageUsers/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import UsersForm from '../../components/UsersForm/UsersForm';
import UsersList from '../../components/UsersList/UsersList';
import { fetchUsers } from '../../service/UserService'; // renamed to avoid recursion
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers(); // renamed to avoid recursion
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);


  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UsersForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UsersList users={users} setUsers={setUsers} loading={loading} />
      </div>
    </div>
  );
};

export default ManageUsers;
