import "./style.css";
import api from "../../services/api";
import { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  async function getUsers() {
    const response = await api.get("/users");
    setUsers(response.data);
  }

  async function createUser(event) {
    event.preventDefault();

    await api.post("/users", {
      name,
      age: Number(age),
    });

    setName("");
    setAge("");

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form className="form" onSubmit={createUser}>
        <h1>Cadastro:</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
          </div>
          <button type="button">Apagar</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
