import React from "react";

export default props => {
  return (
    <div>
      {props.position.map((sPos, x, y) => {
        const style = {
          left: `${sPos.left}%`,
          top: `${sPos.top}%`
        };
        // console.log(style);
        return <div className="snake" style={style} key={x} />;
      })}
    </div>
  );
};
