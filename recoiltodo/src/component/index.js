import { useState } from "react";
import TodoModal from "./todoModal";
import styled from "styled-components";
import OneTodo from "./oneTodo";
import { useRecoilValue } from "recoil";
import { todoAtom } from "../store/todoAtom";

const TodoList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const todoList = useRecoilValue(todoAtom);

  const onOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <Wrapper>
        <ListBar>
          todos
          <Button onClick={onOpenModal}>추가</Button>
        </ListBar>
        {todoList.map((todo) => (
          <OneTodo todo={todo} />
        ))}
      </Wrapper>
      {isOpenModal && <TodoModal setIsOpenModal={setIsOpenModal} />}
    </>
  );
};
export default TodoList;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
`;

const ListBar = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  width: 500px;
`;

const Button = styled.button`
  width: 50px;
  border-radius: 8px;
  border: none;
  background-color: #b6f0e4;
  cursor: pointer;
`;
