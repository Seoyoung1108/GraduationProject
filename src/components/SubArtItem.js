import React, { useState } from "react";
import "./SubArtItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const SubArtItem = ({ arts }) => {
  const thumbnail = arts.thumbnail;
  const name = arts.title;

  return (
    <li className="SubArtItem" style={{ zIndex: 50 }}>
      <div className="image">
        <img src={thumbnail} />
      </div>
      <div className="name">{name}</div>
    </li>
  );
};

export default SubArtItem;
