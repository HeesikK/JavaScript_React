react query란?

서버의 상태 가져오기, 데이터 패칭, 캐싱(서버의 상태를 자동으로 캐싱), 동기화 및 업데이트를 쉽게 만들어주는 라이브러리

캐싱(caching)
캐싱이란 특정 데이터의 복사본을 저장하여 이후 동일한 데이터의 재접근 속도를 높이는 것
-> react-query는 캐싱을 통하여 동일한 데이터에 대한 반복적인 비동기 호출을 방지 -> 이는 불필요한 api 호출을 줄여 서버의 부하를 줄일 수 있다.

- react query가 언제 데이터를 refetch할까?

  1. 브라우저에 포커스가 들어온 경우
  2. 새로운 컴포넌트에 mount가 발생한 경우
  3. 네트워크 재연결이 필요한 경우

- staleTime & cacheTime

  staleTime (유효 기간)

  - 데이터가 fresh에서 stale 상태로 변경되는데 걸리는 시간 -> 데이터가 stale 상태로 변경되면 refetch를 통해 최신화

  - fresh 상태일 때 쿼리 인스턴스가 새롭게 mount 되어도 fetch가 일어나지 않는다.
    데이터가 한 번 fetch 되고 staleTime이 지나지 않았다면(데이터는 fresh 한 상태) 이때 unmount 후 다시 mount 되어도 fetch는 일어나지 않는다.
    => 즉 데이터가 fresh 상태이면 위의 3가지 경우가 발생해도 refetch를 하지 않는다.

  - staleTime의 default value는 0이므로 fetch 직후 바로 stale 상태가 된다
    => staleTime을 따로 설정해주지 않으면 위의 3가지 경우 무조건 refetch가 일어난다.

    staleTime이 0이면?
    데이터가 stale 상태 -> 쿼리를 실행하여 업데이트(refetch) -> staleTime 이 0이므로 데이터는 다시 stale 상태 -> 다시 refetch
    \*\* 캐싱 데이터와 무관하게 계속 fetching을 수행한다. 따라서 staleTime를 지정하지 않고 사용하면 react query의 캐싱 기능을 활용할 수 없음

  cacheTime (저장 기간)

  - 데이터가 inactive(비활성)한 상태일때 캐싱된 상태로 남아있는 시간 -> cacheTime이 지나면 저장된 데이터가 삭제(가비지 콜랙터에 의해 수집되어 메모리에서 해제된다)

  - 특정 컴포넌트가 unmount(페이지 전환 등으로 화면에서 사라질 때) 해당 컴포넌트에서 사용된 데이터는 inactive(비활성) 상태로 바뀌고, cacheTime동안 유지된다.

  - cacheTime이 지나기 전에 쿼리 인스턴스가 다시 mount되면, 데이터를 fetch하는 동안 cache데이터를 보여준다.
    => cache데이터를 fetch하는동안 임시로 보여줌

  - cacheTime은 staleTime와 상관없이, 무조건 inactive된 시점을 기준으로 데이터 삭제를 결정한다.

  - cacheTime의 default value는 5분이다.

  staleTime이 0분이고 cacheTime이 5분이면 해당 쿼리를 사용하는 컴포넌트가 mount 되었을때 매번 다시 api를 요청
