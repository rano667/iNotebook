import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    if(word==="danger") word = "error";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <div className="sticky-top" style={{ height: "40px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
