import React from "react";

export default props => {
  //console.log(props.position);
  const style = {
    left: `${props.position.left}%`,
    top: `${props.position.top}%`
  };

  //return console.log(style);
  return <div className="snake-food" style={style} />;
};
