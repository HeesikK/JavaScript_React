import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../consts/queryKey";

const DetailPage = () => {
  // useQueryClient를 호출하면 위에서 생성자 함수, QueryClient를 통해 만들어진 객체의 정보를 얻을 수 있다.
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 내부 키값에 대해서 동일한 키를 가진 캐싱값이 존재할 경우, fetching을 진행하지 않고 이 캐싱값을 그대로 다시 사용한다.
  const todoData = queryClient.getQueryData(QUERY_KEY.products);
  const movieData = queryClient.getQueryData(QUERY_KEY.movie);

  console.log(queryClient);
  console.log("캐싱된 데이터는?", todoData, movieData);

  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      {todoData?.map((el) => (
        <>
          <div>{el.id}</div>
          <div>{el.content}</div>
        </>
      ))}
      DetailPage<button onClick={goToHome}>이동</button>
    </>
  );
};

export default DetailPage;
