import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQItem.scss";

const FAQItem = ({ faqs }) => {
  const id = faqs.id;
  const question = faqs.question;
  const answer = faqs.answer;

  return (
    <div className="FAQItem" style={{ zIndex: 50 }}>
      <div className="Question">
        <div className="Icon">Q</div>
        <div className="Contents">{question}</div>
      </div>
      <div className="Answer">
        <div className="Icon">A</div>
        <div className="Contents">{answer}</div>
      </div>
    </div>
  );
};

export default FAQItem;
