import { type Component } from 'solid-js';

import TodoList from './Components/TodoList';

const App: Component = () => {
  // createEffect(() => {
  //   console.log(todos());
  // });

  // const handleButtonClick = () => {
  //   setTodos(franks() + 1);
  // }

  return (
    <TodoList/>
  );
};

export default App;
