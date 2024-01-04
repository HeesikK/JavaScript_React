### 📑useMemo

재렌더링 간 계산 결과(값)를 캐시할 수 있는 React Hook

ex) const cachedValue = useMemo(calculateValue, dependencies)

      calculateValue: 캐시하려는 값을 계산하는 함수를 넣어준다
      dependencies: 의존성 배열을 넣어준다.

      동작 과정

      1) useMemo hook이 연산을 수행하면 결과를 메모리에 저장
      2) -> dependencies = [] 저장되어 있는 값을 사용
         -> dependencies = [x,y] x또는 y의 값이 변경 되었을 때 콜백 함수를 다시 호출해 저장되어 있는 값을 업데이트
