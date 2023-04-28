import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState();
    const handleDelete = (userId) => {
        setUsers((prevstate) =>
            prevstate.filter((user) => user._id !== userId)
        );
    };
    const handleToggleBookMark = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    return (
        <div>
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookMark}
            />
        </div>
    );
};
export default App;
