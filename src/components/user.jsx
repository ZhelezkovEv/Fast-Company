import React, { useEffect, useState } from "react";
import api from "../api";
import QualitieList from "./qualitieList";
import { useParams, useHistory } from "react-router-dom";

const Users = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const allUsers = () => {
        history.push("/users");
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
            setIsLoading(false);
        });
    }, [userId]);

    if (isLoading) return <h2>Loading...</h2>;
    if (!user) return <h2>User not found</h2>;

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Профессия:{user.profession.name}</h2>
            <QualitieList qualities={user.qualities} />
            <p>Встретился, раз:{user.completedMeetings}</p>
            <h4>Оценка: {user.rate}</h4>
            <button
                onClick={() => {
                    allUsers();
                }}
                className="btn btn-warning"
            >
                Все пользователи
            </button>
        </div>
    );
};
export default Users;

// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// import apiUsers from "../api/fake.api/user.api";

// const User = ({ userId }) => {
//     const [selectedUser, setSelectedUser] = useState();
//     useEffect(() => {
//         apiUsers.getUserById(userId).then((data) => setSelectedUser(...data));
//     }, []);

//     return (
//         <>
//             {selectedUser && (
//                 <>
//                     <h2>{selectedUser.name}</h2>
//                     <h4>Профессия: {selectedUser.profession.name}</h4>
//                     {selectedUser.qualities.map((item) => (
//                         <h4
//                             key={item._id}
//                             className={"badge bg-" + item.color + " m-1"}
//                         >
//                             {item.name}
//                         </h4>
//                     ))}
//                     <h5>
//                         Completed Meetings: {selectedUser.completedMeetings}
//                     </h5>
//                     <h5>Rate: {selectedUser.rate}</h5>
//                     <Link className="btn btn-secondary" to="/Users">
//                         Back to all users
//                     </Link>
//                 </>
//             )}
//         </>
//     );
// };

// User.propTypes = {
//     userId: PropTypes.string.isRequired
// };

// export default User;
