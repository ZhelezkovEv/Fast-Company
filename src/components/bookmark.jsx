import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onToggleBookmark, id }) => {
    return (
        <button onClick={() => onToggleBookmark(id)}>
            <i className={"bi bi-bookmark" + (status ? "-heart" : "")}></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};
export default BookMark;
