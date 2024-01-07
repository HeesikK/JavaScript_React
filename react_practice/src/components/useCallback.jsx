import { useCallback, useState } from "react";
import Box from "./Box";

const UseCallback = () => {
  const [sizeCss, setSizeCss] = useState(100);
  const [forceRender, setForceRender] = useState(false);

  const changeBoxSize = useCallback(() => {
    return { backgroundColor: "red", width: `${sizeCss}px`, height: `${sizeCss}px` };
  }, [sizeCss]);

  // const changeBoxSize = () => {
  //   return { backgroundColor: "red", width: `${sizeCss}px`, height: `${sizeCss}px` };
  // };

  return (
    <>
      <input type="number" value={sizeCss} onChange={(e) => setSizeCss(e.target.value)} />
      <button onClick={() => setForceRender(!forceRender)}>setState</button>
      <Box changeBoxSize={changeBoxSize} />
    </>
  );
};

export default UseCallback;
