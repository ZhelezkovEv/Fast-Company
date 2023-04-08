import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevstate) => prevstate.filter((user) => user._id !== userId));
  };
  const renderPhase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if ([2, 3, 4].indexOf(lastOne) >= 0 && number < 5 && number < 15) {
      return " человека тусанут";
    }
    return number === 1 ? " человек тусанет" : " человек тусанут";
  };

  return (
    <>
      <h2>
        <span
          className={
            "badge " + (users.length > 0 ? "bg-primary " : "bg-danger ")
          }
        >
          {users.length > 0 ? (
            `${users.length + "" + renderPhase(users.length)} с тобой сегодня`
          ) : (
            <h2> Никто не тусанет с тобой сегодня</h2>
          )}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился,раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qualitie) => (
                    <span
                      key={qualitie._id}
                      className={"badge mx-2 bg-" + qualitie.color}
                    >
                      {qualitie.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
