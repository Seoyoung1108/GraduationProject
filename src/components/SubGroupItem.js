import React, { useState } from "react";
import "./SubArtItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const SubGroupItem = ({ groups }) => {
  const name = groups.name;
  const id = groups.id;
  const thumbnail = groups.thumbnail;

  return (
    <li className="SubArtItem" style={{ zIndex: 50 }}>
      <div className="image">
        <img src={thumbnail} />
        {name}
      </div>
    </li>
  );
};
export default SubGroupItem;
