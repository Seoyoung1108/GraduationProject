import React, { useState } from "react";
import "./SubArtItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const SubArtItem = ({ arts }) => {
  const thumbnail = arts.thumbnail;

  return (
    <li className="SubArtItem" style={{ zIndex: 50 }}>
      <div className="image">
        <img src={thumbnail} />
      </div>
    </li>
  );
};

export default SubArtItem;
