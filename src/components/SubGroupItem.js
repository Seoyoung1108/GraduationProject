import React, { useState } from "react";
import "./SubArtItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const SubGroupItem = ({ groups }) => {
  const name = groups.name;
  const thumbnail = groups.thumbnail;

  return (
    <li className="SubArtItem" style={{ zIndex: 50 }}>
      <div className="image">
        <img src={thumbnail} />
      </div>
      <div className="name">{name}</div>
    </li>
  );
};
export default SubGroupItem;
