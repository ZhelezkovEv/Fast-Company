import React from "react";
import Qualitie from "./qualitie";

const QualitieList = ({ qualities }) => {
    return qualities.map((qualitie) => (
        <Qualitie key={qualitie._id} {...qualitie} />
    ));
};
export default QualitieList;
