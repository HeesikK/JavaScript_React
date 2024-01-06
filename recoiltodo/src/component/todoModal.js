import styled from "styled-components";
import closeIcon from "../img/x.png";
import { useSetRecoilState } from "recoil";
import { todoAtom } from "../store/todoAtom";

const TodoModal = ({ setIsOpenModal }) => {
  const setTodoList = useSetRecoilState(todoAtom);
  const onAddTodo = (e) => {
    e.preventDefault();
    const { content } = e.target;
    setTodoList((prev) => [...prev, { id: Math.floor(Math.random() * 10000), content: content.value }]);
    setIsOpenModal(false);
  };

  return (
    <Wrapper>
      <Form onSubmit={onAddTodo}>
        <CloseIcon src={closeIcon} onClick={() => setIsOpenModal(false)} />
        <Title>TodoList</Title>
        <Input type="text" placeholder="할 일을 입력하세요." name="content" />
        <Button>추가</Button>
      </Form>
    </Wrapper>
  );
};

export default TodoModal;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10000000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 450px;
  height: 450px;
  border: 1px solid black;
  position: relative;
  background-color: white;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  width: 308px;
  height: 50px;
  background-color: #b6f0e4;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 25px;
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
`;
