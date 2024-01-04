import { useState, useMemo, useEffect } from "react";

const UseMemo = () => {
  const [age, setAge] = useState(25);
  const [authenticate, setAuthenticate] = useState(true);

  // const person = useMemo(() => {
  //   return { gender: authenticate ? "남자" : "여자" };
  // }, [authenticate]);

  // const person = authenticate ? "남자" : "여자";
  const person = { gender: authenticate ? "남자" : "여자" };

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

/*
1) button을 클릭 시 state가 바뀌면서 num1과 num2값이 1씩 증가
2) state가 바뀌면서 리렌더링
3) num3는 num1 값을 사용하여 연산
4) num3은 num2 값을 사용하지 않지만 num2 state가 변화해도 연산을 다시함(불필요한 연산)
5) useMemo hook을 사용하여 num3 값을 캐싱 -> 의존성 배열에 num1값을 추가해서 num1 값이 변경되었을때 캐싱된 값을 업데이트
6) num2 state가 변화해도 num1의 state가 변화하지 않았으므로 연산을 하지 않음 -> num1의 상태가 변화했을때만 재연산을 할 수 있도록 최적화
*/
