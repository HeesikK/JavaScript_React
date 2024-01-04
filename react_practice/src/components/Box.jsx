import { useEffect, useState } from "react";

const Box = ({ changeBoxSize }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    console.log("style 변경!");
    setStyle(changeBoxSize());
  }, [changeBoxSize]);

  return <div style={style}></div>;
};
export default Box;
