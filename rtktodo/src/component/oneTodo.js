import styled from "styled-components";
import modifyIcon from "../img/modify.png";
import deleteIcon from "../img/delete.png";
import { useRef, useState } from "react";

const OneTodo = ({ todo, todoList, setTodoList }) => {
  const [isModify, setIsModify] = useState(false);
  const todoContentInput = useRef(null);

  const onDeleteTodo = (el) => {
    const delete_list = todoList.filter((item) => item.id !== el);
    setTodoList(delete_list);
  };

  const onModifyTodo = (el) => {
    if (!isModify) return setIsModify(true);
    if (window.confirm("정말 수정하시겠습니까?")) {
      setTodoList((todoList) => {
        const update_todo = todoList.find((item) => item.id === el);
        update_todo.content = todoContentInput.current.value;
        return todoList;
      });
      setIsModify(false);
    }
  };

  return (
    <Wrapper>
      <ContentBox>{isModify ? <ModifyInput defaultValue={todo.content} ref={todoContentInput} /> : todo.content}</ContentBox>
      <div>
        <ModifyIcon src={modifyIcon} onClick={() => onModifyTodo(todo.id)} />
        <DeleteIcon src={deleteIcon} onClick={() => onDeleteTodo(todo.id)} />
      </div>
    </Wrapper>
  );
};

export default OneTodo;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  box-sizing: border-box;
`;

const ContentBox = styled.div`
  font-size: 18px;
  padding: 30px 0 30px 0;
`;

const ModifyIcon = styled.img`
  width: 25px;
  margin: 10px;
  cursor: pointer;
`;

const DeleteIcon = styled.img`
  width: 25px;
  margin: 10px 0 10px 10px;
  cursor: pointer;
`;

const ModifyInput = styled.input`
  padding: 10px;
  border-radius: 4px;
`;
