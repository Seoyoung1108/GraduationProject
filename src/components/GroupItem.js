import React, { useState } from "react";
import "./ArtItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const GroupItem = ({ groups }) => {
  const name = groups.name;
  const id = groups.id;
  const thumbnail = groups.thumbnail;

  return (
    <Link to={`/groups/${name}/${id}`} style={{ textDecoration: "none" }}>
      <li className="ArtItem" style={{ zIndex: 50 }}>
        <div className="image">
          <img src={thumbnail} />
        </div>
        <div className="name">{name}</div>
      </li>
    </Link>
  );
};

export default GroupItem;
