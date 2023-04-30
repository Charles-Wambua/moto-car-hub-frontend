import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const RegisteredUsers = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const getUsers = async () => {
        try {
          const response = await axios.get('https://moto-car-hub-api.onrender.com/users');
          setUsers(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      getUsers();
    }, []);
  
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};
