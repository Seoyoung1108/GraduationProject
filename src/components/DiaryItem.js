import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BulletinItem.scss";

const DiaryItem = ({ diaries, index }) => {
  const diaryId = diaries.id;
  const title = diaries.title;
  const date = diaries.startDate;
  const { exhibitId } = useParams();
  const { exhibitName } = useParams();

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/arts/${exhibitName}/${exhibitId}/diary/${diaryId}`}
    >
      <div className="BulletinItem" style={{ zIndex: 50 }}>
        <div className="info1">{index + 1}</div>
        <div className="info2">{title}</div>
        <div className="info3">{date.substring(0, 10)}</div>
      </div>
    </Link>
  );
};

export default DiaryItem;
