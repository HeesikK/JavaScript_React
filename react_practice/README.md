# 📑 Memoization
메모이제이션(memoization)은 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다. 
# 📑 useMemo
useMemo hook은 리액트에서 컴포넌트 성능 최적화에 사용되는 hook으로, 재렌더링 간 계산 결과(값)을 캐시할 수 있는 React hook 이다.</br>
공식 문서에 따르면 useMemo의 사용법은 다음과 같다.
      
      const cachedValue = useMemo(calculateValue, dependencies)
      
      calculateValue: 캐시하려는 값을 계산하는 함수를 넣어준다
      dependencies: 의존성 배열을 넣어준다.

      동작 과정

      1) useMemo hook이 연산을 수행하면 결과를 메모리에 저장
      2) -> dependencies = [] 저장되어 있는 값을 사용
         -> dependencies = [x,y] x또는 y의 값이 변경 되었을 때 콜백 함수를 다시 호출해 저장되어 있는 값을 업데이트

그러면 useMemo를 알아보기 위해 간단한 컴포넌트를 하나 만들어보자

```javascript
const UseMemo = () => {
  const [age, setAge] = useState(25);
  const [authenticate, setAuthenticate] = useState(true);

  const person = authenticate ? "남자" : "여자";

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
        성별: {person}
        <button onClick={() => setAuthenticate((prev) => !prev)}>gender</button>
      </div>
    </>
  );
};

export default UseMemo;
```
위 컴포넌트는 person 값이 변경되면 console에 "mount"를 출력하는 간단한 동작을 하고 있다. 이때 person값은 authenticate 상태에 의존적이므로 gender 버튼을 클릭하여 set 함수에 의해 상태가 변경되면 console에 "mount"를 출력하게 된다.</br> 이 때 코드를 아래와 같이 바꾸면 결과가 어떻게 될까?
``` javascript
const UseMemo = () => {
  const [age, setAge] = useState(25);
  const [authenticate, setAuthenticate] = useState(true);

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
```
첫 번째 코드와 조금 다르게 authenticate 상태는 person 객체의 gender 값을 변경해주었다. 이 컴포넌트를 실행하면 결과가 어떻게 나올까?
실행을 해보면 person 객체에 영향을 주지 않는 age 값이 변경되어도 console에 mount가 출력되는것을 확인할 수 있다.
우리는 useEffect 의존성 배열에 person 값을 넣어주었는데 왜 이런 결과가 나온걸까? 위 로직의 순서는 다음과 같다.

      1) setAge 혹은 setAuthenticate에 의해 상태 변경
      2) UseMemo 컴포넌트 내에 있는 모든 변수 및 함수 초기화
      3) person에 할당된 객체 또한 초기화되어 주소 값이 다른 새로운 객체가 할당
      4) person에 할당된 객체의 주소 값이 변경되었으므로 console에 "mount"를 출력

첫 번째 코드에서는 person에 원시값이 할당되었지만 바뀐 코드에서는 객체가 할당되었다. 원시값과 다르게 객체는 변수안에 메모리 상의 주소값이 들어가기 때문에
초기화 이전 person 객체와 초기화 이후 person 객체는 주소값이 다르기 때문에 서로 다른 객체이다. 따라서 age 값이 변경되면 객체가 초기화되고 주소값이 다른 새로운
객체가 할당되기 때문에 console 에 값이 계속 출력되는 것을 확인할 수 있다. 그럼 이런 문제를 해결하려면 어떻게 해야될까?
```javascript
const UseMemo = () => {
  const [age, setAge] = useState(25);
  const [authenticate, setAuthenticate] = useState(true);

  const person = useMemo(() => {
    return { gender: authenticate ? "남자" : "여자" };
  }, [authenticate]);

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
```
person이 return 하는 값을 useMemo로 캐싱함으로써 의존성 배열에 있는 authenticate값이 변경될때만 값을 초기화하고, age 값이 변경되었을때는 이전에 캐싱되어 있던 값을 사용하므로 위 컴포넌트를 실행하면 authenticate값이 변경될때만 console에 값이 출력되는것을 확인할 수 있다.
# 📑 useCallback
useCallback hook은 리액트에서 컴포넌트 성능 최적화에 사용되는 hook으로, useMemo와 비슷하지만 값이 아닌 함수를 캐싱한다는 것에 차이가 있다.
```javascript
// components/useCallback.jsx
const UseCallback = () => {
  const [sizeCss, setSizeCss] = useState(100);
  const [forceRender, setForceRender] = useState(false);

  const changeBoxSize = () => {
    return { backgroundColor: "red", width: `${sizeCss}px`, height: `${sizeCss}px` };
  };

  return (
    <>
      <input type="number" value={sizeCss} onChange={(e) => setSizeCss(e.target.value)} />
      <button onClick={() => setForceRender(!forceRender)}>setState</button>
      <Box changeBoxSize={changeBoxSize} />
    </>
  );
};

export default UseCallback;

// components/Box.jsx
const Box = ({ changeBoxSize }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    console.log("style 변경!");
    setStyle(changeBoxSize());
  }, [changeBoxSize]);

  return <div style={style}></div>;
};
export default Box;
```
위 로직은 UseCallback 컴포넌트에 input값을 변경하면 Box 컴포넌트에 props 전달된 changeBoxSize 함수를 통해 Box의 크기를 조정할 수 있는 로직이다.
Box 컴포넌트의 useEffect 훅을 통해서 changeBoxSize의 값이 변경되면 console에 "style 변경!"을 출력함으로써 css가 변경된 것을 사용자가 알 수 있다.
하지만 위 컴포넌트를 실행해보면 forceRender 값이 변경되어도 console에 "style 변경!"이 출력되는 것을 알 수 있다.
왜 이런 결과가 나온걸까? 
```javascript
  const changeBoxSize = () => {
    return { backgroundColor: "red", width: `${sizeCss}px`, height: `${sizeCss}px` };
  };
```
forceRender값이 변경되면 UseCallback 컴포넌트 내에 있는 모든 변수 및 함수가 초기화 된다. 이때 changeBoxSize 함수 또한 초기화되고 함수 또한 자바스크립트에서 객체 타입이므로 초기화 이전과 다른값(주소값)을 가지게 된다. 따라서 sizeCss 값이 아닌 다른 어떤 상태가 변경되어도 changeBoxSize에 할당된 함수 객체는 메모리 주소가 다른 객체이므로 useEffect 훅에 의해서 console이 출력되는 것을 알 수 있다. 그러면 이런 문제를 해결하려면 어떻게 하면 될까?
```javascript
const UseCallback = () => {
  const [sizeCss, setSizeCss] = useState(100);
  const [forceRender, setForceRender] = useState(false);

  const changeBoxSize = useCallback(() => {
    return { backgroundColor: "red", width: `${sizeCss}px`, height: `${sizeCss}px` };
  }, [sizeCss]);

  return (
    <>
      <input type="number" value={sizeCss} onChange={(e) => setSizeCss(e.target.value)} />
      <button onClick={() => setForceRender(!forceRender)}>setState</button>
      <Box changeBoxSize={changeBoxSize} />
    </>
  );
};

export default UseCallback;
```
위 코드와 같이 
```javascript
() => {
    return { backgroundColor: "red", width: `${sizeCss}px`, height: `${sizeCss}px` };
  }
```
함수를 useCallback로 감싸주고 의존성 배열에 sizeCss를 추가하면 된다. 이렇게 코드를 작성하면 의존성 배열에 있는 값이 변경될때만 changeBoxSize가 초기화되고 이 외에 상태값이 변경되면 초기화되지 않고 이전에 캐싱하고 있던 값을 재사용하게 된다.
