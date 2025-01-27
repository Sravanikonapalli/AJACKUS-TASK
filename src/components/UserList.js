import React, { Component } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { TiTick } from "react-icons/ti";
import "../styles/styles.css";

class UserList extends Component {
  state = {
    users: [],
    error: "",
    isEditing: false,
    editingUser: null,
    successMesage:'',
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.setState({ users: response.data });
    } catch (error) {
      this.setState({ error: "Failed to fetch users" });
    }
  };

  handleEdit = (user) => {
    this.setState({ isEditing: true, editingUser: user });
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState({ users: this.state.users.filter((user) => user.id !== id),
        successMesage:"User Deleted Succesfully"
       });
       setTimeout(() => {
        this.setState({successMesage:''})
       }, 2000);

    } catch (error) {
      this.setState({ error: "Failed to delete user" });
    }
  };

  handleAddUser = () => {
    this.setState({ isEditing: true, editingUser: null });
  };

  render() {
    const { users, error, isEditing, editingUser,successMesage } = this.state;
    return (
      <div>
        {successMesage && (
            <div className="success-message">
                <TiTick size={25}/> {successMesage}
            </div>    
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isEditing ? (
          <UserForm
            user={editingUser}
            onSave={(savedUser) => {
                this.setState((prevState) => {
                if (editingUser) {
                    // Update user locally 
                    const updatedUsers = prevState.users.map((user) =>
                    user.id === savedUser.id ? savedUser : user
                    );
                    return { users: updatedUsers, isEditing: false };
                } else {
                    // Add new user to local state
                    return { users: [...prevState.users, savedUser], isEditing: false };
                }
                });
            }}
            onClose={() => this.setState({ isEditing: false })}
            />
        
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>E-MAIL</th>
                  <th>ADDRESS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address?.city}</td>
                    <td>
                      <button className="action-btn" onClick={() => this.handleEdit(user)}>Edit</button>
                      <button className="action-btn" onClick={() => this.handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="adduser-btn" onClick={this.handleAddUser}>Add User</button>
          </>
        )}
      </div>
    );
  }
}

export default UserList;
