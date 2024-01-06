import styled from "styled-components";
import modifyIcon from "../img/modify.png";
import deleteIcon from "../img/delete.png";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { todoAtom } from "../store/todoAtom";

const OneTodo = ({ todo }) => {
  const [todoList, setTodoList] = useRecoilState(todoAtom);
  const [isModify, setIsModify] = useState(false);
  const todoContentInput = useRef(null);

  const onDeleteTodo = (el) => {
    const delete_list = todoList.filter((item) => item.id !== el);
    setTodoList(delete_list);
  };

  const onModifyTodo = (el) => {
    if (!isModify) return setIsModify(true);
    if (window.confirm("정말 수정하시겠습니까?")) {
      const updatedTodoList = todoList.map((item) => {
        if (item.id === el) {
          return { ...item, content: todoContentInput.current.value };
        }
        return item;
      });
      setTodoList(updatedTodoList);
      setIsModify(false);
    }
  };

  /*
    Cannot assign to read only property 'content' of object '#<Object>'
    TypeError: Cannot assign to read only property 'content' of object '#<Object>'

    
    이런 오류는 객체의 속성이 읽기 전용일 때 해당 속성에 값을 할당하려고 할 때 발생한다. 
    일반적으로 React 상태를 업데이트하는 경우, 불변성을 유지해야 한다.
    이때 새로운 배열을 생성하고 해당 배열로 상태를 업데이트해야 합니다.

    이 코드에서는 map 함수를 사용하여 todoList의 각 항목을 새로운 객체로 복제하고, 
    수정이 필요한 항목을 찾아 해당 항목의 content를 업데이트한다. 
    이렇게 하면 불변성을 유지하면서도 React 상태를 업데이트할 수 있음.
  */

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
