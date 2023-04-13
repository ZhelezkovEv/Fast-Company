import React from "react";
import QualitieList from "./qualitieList";
import BookMark from "./bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookmark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{<QualitieList qualities={qualities} />}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        {
          <BookMark
            id={_id}
            onToggleBookmark={onToggleBookmark}
            status={bookmark}
          />
        }
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
