import logo from "./logo.svg";
import "./App.css";
import TodoList from "./component";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </>
  );
}

export default App;
