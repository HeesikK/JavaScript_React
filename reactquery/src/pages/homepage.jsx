import { useIsFetching, useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { QUERY_KEY } from "../consts/queryKey";
import { getMovieData, getTodoData } from "../apis";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    data: todoData,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
  } = useQuery([QUERY_KEY.products], () => getTodoData(), {
    staleTime: 1000 * 60 * 3,
    staleTime: 1000 * 60 * 5,
  });
  // useQuery의 세 번째 인자로 enabled 옵션을 사용하면 비동기 함수인 useQuery를 동기적으로 사용할 수 있다.
  const { data: movieData } = useQuery([QUERY_KEY.movie], () => getMovieData(), { enabled: !todoData });

  todoData && console.log("todoData는?", todoData);
  movieData && console.log("movieData는?", movieData);

  // useIsFetching hook을 사용하면 background에서의 fetching 체크가 가능하다
  // const isFetching = useIsFetching();

  // 에러
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // 로딩중
  if (isLoading) {
    console.log("Loading");
    return <div>Loading</div>;
  }

  // 성공
  if (isSuccess) {
    console.log("Success");
  }

  /*
  staleTime의 defaultValue 값은 0이다.
  staleTime을 따로 설정하지 않고 detail 페이지로 navigate 후 다시 홈페이지로 navigate 하면 
  console에 isFetching 값이 출력되는 것을 확인할 수 있다 -> components가 초기화 되면서 data refetch
  하지만 staleTime을 설정하게 되면 아무리 홈페이지를 navigate 하더라도 staleTime동안에 데이터는 refetch 되지 않는다.
  */
  if (isFetching) {
    console.log("Fetching");
  }

  const goToDetail = () => {
    navigate("/detail");
  };

  return (
    <>
      홈페이지<button onClick={goToDetail}>이동</button>
      {/* <div>{isFetching ? <div>fetching</div> : null}</div> */}
    </>
  );
};

export default HomePage;
