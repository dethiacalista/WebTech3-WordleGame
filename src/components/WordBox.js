import React from "react";

const WordBox = ({ letter, status }) => {
  return <div className={`box ${status}`}>{letter}</div>;
};

export default WordBox;
