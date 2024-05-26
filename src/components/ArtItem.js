import React, { useState } from "react";
import "./ArtItem.scss";
import { Link } from "react-router-dom";
//import axios from "axios";

const ArtItem = ({ arts }) => {
  const name = arts.title;
  const exhibitId = arts.id;
  const thumbnail = arts.thumbnail;

  return (
    <Link to={`/arts/${name}/${exhibitId}`} style={{ textDecoration: "none" }}>
      <li className="ArtItem" style={{ zIndex: 50 }}>
        <div className="image">
          <img src={thumbnail} />
        </div>
        <div className="name">{name}</div>
      </li>
    </Link>
  );
};

export default ArtItem;
