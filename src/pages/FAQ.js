import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FAQItem from "../components/FAQItem";
import "./Bulletin.scss";
import { Faqs } from "../TestCases";

const FAQ = () => {
  //const [diaries, setDiaries] = useState(null);

  //let filteredDiaries = [];
  //for (let i = 0; i < TestDiaries.length; i++) {
  //  filteredDiaries.push(TestDiaries[i]);
  //}
  //setDiaries(filteredDiaries);
  const faqs = Faqs;

  return (
    <div className="Diary">
      <div className="Bulletin">
        <div className="Title">
          <div className="Letter">
            <h1>FAQ</h1>
          </div>
        </div>
        <div className="Line"></div>
        <div className="Content">
          {faqs.map((faqs) => (
            <FAQItem faqs={faqs} key={faqs.id} />
          ))}
        </div>
        <div className="Line"></div>
      </div>
    </div>
  );
};

export default FAQ;
