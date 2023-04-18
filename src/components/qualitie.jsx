import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name }) => {
    return <span className={"badge mx-2 bg-" + color}>{name}</span>;
};

Qualitie.propTypes = {
    color: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired
};
export default Qualitie;
