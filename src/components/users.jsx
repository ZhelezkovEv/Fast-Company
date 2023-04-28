import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../api/utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessoinSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    if (allUsers) {
        const filteredUsers = selectedProf
            ? allUsers.filter(
                  (user) => user.profession._id === selectedProf._id
              )
            : allUsers;
        const count = filteredUsers.length;
        const userCrop = paginate(filteredUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {profession && (
                    <div className="div d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={profession}
                            onItemSelect={handleProfessoinSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus userCount={count} />
                    {count > 0 && (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Имя</th>
                                        <th scope="col">Качества</th>
                                        <th scope="col">Профессия</th>
                                        <th scope="col">Встретился,раз</th>
                                        <th scope="col">Оценка</th>
                                        <th scope="col">Избранное</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userCrop.map((user) => (
                                        <User
                                            key={user._id}
                                            {...user}
                                            {...rest}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
export default Users;
