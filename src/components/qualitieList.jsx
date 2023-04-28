import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitieList = ({ qualities }) => {
    return qualities.map((qualitie) => (
        <Qualitie key={qualitie._id} {...qualitie} />
    ));
};
QualitieList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitieList;
