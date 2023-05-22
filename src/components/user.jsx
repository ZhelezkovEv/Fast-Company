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
