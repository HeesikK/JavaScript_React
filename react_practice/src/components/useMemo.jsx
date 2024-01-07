import { useState, useMemo, useEffect } from "react";

const UseMemo = () => {
  const [age, setAge] = useState(25);
  const [authenticate, setAuthenticate] = useState(true);

  const person = useMemo(() => {
    return { gender: authenticate ? "남자" : "여자" };
  }, [authenticate]);

  // const person = authenticate ? "남자" : "여자";
  // const person = { gender: authenticate ? "남자" : "여자" };

  useEffect(() => {
    console.log("mount");
  }, [person]);

  return (
    <>
      <div>이름: Levi</div>
      <div>
        나이: <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        성별: {person.gender}
        <button onClick={() => setAuthenticate((prev) => !prev)}>gender</button>
      </div>
    </>
  );
};

export default UseMemo;
