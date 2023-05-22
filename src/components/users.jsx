import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../api/utils/paginate";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [profession, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const params = useParams();
    const { userId } = params;
    const handleToggleBookMark = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };

    const handleProfessoinSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                {userId ? (
                    <Users {...{ userId }} />
                ) : (
                    <div className="main-table">
                        <div className="filter">
                            <div className="d-flex">
                                {profession && (
                                    <div className="div d-flex flex-column flex-shrink-0 p-3">
                                        <GroupList
                                            selectedItem={selectedProf}
                                            items={profession}
                                            onItemSelect={
                                                handleProfessoinSelect
                                            }
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
                                            <UsersTable
                                                users={userCrop}
                                                onSort={handleSort}
                                                selectedSort={sortBy}
                                                onDelete={handleDelete}
                                                onToggleBookmark={
                                                    handleToggleBookMark
                                                }
                                            />
                                            <div className="d-flex justify-content-center">
                                                <Pagination
                                                    itemsCount={count}
                                                    pageSize={pageSize}
                                                    currentPage={currentPage}
                                                    onPageChange={
                                                        handlePageChange
                                                    }
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
    return "Loading...";
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
export default Users;
