import { type Component } from 'solid-js';

import TodoDisplay from './Components/TodoList';

const App: Component = () => {
  // createEffect(() => {
  //   console.log(todos());
  // });

  // const handleButtonClick = () => {
  //   setTodos(franks() + 1);
  // }

  return (
    <TodoDisplay/>
  );
};

export default App;
