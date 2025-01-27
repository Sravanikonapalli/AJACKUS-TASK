import React, { Component } from "react";
import axios from "axios";
import "../styles/styles.css";

class UserForm extends Component {
  state = {
    id: "",
    name: "",
    username: "",
    email: "",
    address: { city: "" },
    errors: {}
  };

  componentDidMount() {
    if (this.props.user) {
      const { id, name, username, email, address } = this.props.user;
      this.setState({ id, name, username, email, address });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "address.city") {
      this.setState((prevState) => ({
        address: { ...prevState.address, city: value },
      }));
    } else {
      this.setState({ [name]: value });
    }
  };

  validate = () => {
    const { name, username, email, address } = this.state;
    let errors = {};

    if (!name) errors.name = "First Name is required";
    if (!username) errors.username = "Last Name is required";
    if (!email) errors.email = "Email is required";
    if (!address.city) errors.address = "Address is required";

    this.setState({ errors });
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (!this.validate()) return; // If validation fails, stop submission

    const { id, name, username, email, address } = this.state;
    const userData = { id, name, username, email, address };

    try {
      let response;
      if (id) {
        // Update existing user
        response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData);
        alert("User saved successfully");
      } else {
        // Add new user
        response = await axios.post("https://jsonplaceholder.typicode.com/users", userData);
      }

      this.props.onSave(response.data);
    } catch (error) {
      alert("Error saving the user");
    }
  };

  render() {
    const { name, username, email, address, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={this.handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address.city" value={address.city} onChange={this.handleChange} />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <button type="submit">Save User</button>
        <button type="button" onClick={this.props.onClose}>Back</button> 
      </form>
    );
  }
}

export default UserForm;
