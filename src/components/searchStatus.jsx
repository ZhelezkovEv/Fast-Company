import React from "react";

const SearchStatus = (props) => {
  const { userCount } = props;
  const renderPhase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if ([2, 3, 4].indexOf(lastOne) >= 0 && number < 5 && number < 15) {
      return " человека тусанут";
    }
    return number === 1 ? " человек тусанет" : " человек тусанут";
  };
  return (
    <h2>
      <span
        className={"badge " + (userCount > 0 ? "bg-primary " : "bg-danger ")}
      >
        {userCount > 0 ? (
          `${userCount + "" + renderPhase(userCount)} с тобой сегодня`
        ) : (
          <h2> Никто не тусанет с тобой сегодня</h2>
        )}
      </span>
    </h2>
  );
};

export default SearchStatus;
