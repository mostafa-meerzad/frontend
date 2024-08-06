import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [users, setUsers] = useState([]);
  const [greet, setGreet] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        name,
        email,
      });
      setUsers([...users, response.data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.log("something went wrong ", error);
    }
  };

  useEffect(() => {
    const getGreetingMsg = async () => {
      const greetMsg = await axios.get("http://localhost:3000/");
      // console.log(greetMsg);
      // console.log(greetMsg.data);
      setGreet(greetMsg.data);
    };

    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
    getGreetingMsg();
  }, []);
  return (
    <main>
      <h1>Users</h1>
      <br />
      <h2>{greet}</h2>
      <br />
      {users.map((user) => {
        return <div key={user._id}>{user.name}</div>;
      })}
      <br />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={addUser}>add user</button>
    </main>
  );
};
export default App;
