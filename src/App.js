import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    // post data to server
    fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const newUser=[...users,data];
        setUsers(newUser);
        console.log(data)
      })
      
  };
  return (
    <div>
      <h1>my own dataBage:{users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder="Enter Your Name" />
        <input type="email" name="email" id="" placeholder="Enter Your email" />
        <input type="submit" value="Add User" />
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>name:{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
