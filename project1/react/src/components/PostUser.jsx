import React, { useState, useEffect } from "react";
import axios from "axios";

const PostUser = () => {
  const [users, setUsers] = useState([]);
  const [remainingUsersCount, setRemainingUsersCount] = useState(0);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/all");
      setUsers(response.data);
      setRemainingUsersCount(response.data.length);
    } catch (error) {
      console.error('Error', error);
    }
  };

//const checkExistingUser = async (first_name, last_name) => {
  //const eu = await client.query('SELECT * FROM users WHERE first_name = $1 AND last_name = $2', [first_name, last_name]);
  //return eu.rows.length > 0;
//};
  const createUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/form", newUser);
      console.log(response);
      alert("User Created: " + JSON.stringify(response.data, null, 4));
      setNewUser({
        first_name: '',
        last_name: '',
      });
      fetchAllUsers();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('This name is already taken.');
      } else {
        alert('Ann error occurred.');
      }
    }
  };
const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      fetchAllUsers();
      alert(`User deleted. Remaining users: ${remainingUsersCount - 1}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <h1>Create User</h1>
        <form>
          <div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={newUser.first_name}
                onChange={onChangeForm}
                name="first_name"
                placeholder="First Name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={newUser.last_name}
                onChange={onChangeForm}
                name="last_name"
                placeholder="Last Name"
              />
            </div>
          </div>
          <button type="button" onClick={createUser}>Create</button>
        </form>
      </div>

      <div>
        <h1>All Users</h1>
        <p>Remaining Users: {remainingUsersCount}</p>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <h3>ID: {user.id}</h3>
              First Name: {user.first_name} <br />
              Last Name: {user.last_name} <br />
              <button onClick={() => deleteUser(user.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostUser;
