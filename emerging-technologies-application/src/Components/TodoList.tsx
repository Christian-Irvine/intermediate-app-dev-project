import { type Component, createSignal, For } from 'solid-js';

import TodoDisplay from './TodoDisplay';

interface Todo {
  name: string;
  description: string;
  isComplete: boolean;
}

const TodoList: Component = () => {
  const defaultTodos: Array<Todo> = [{
    name: "Clean the toilet",
    description: "Use soap to clean the toilet (its not that deep)",
    isComplete: true,
  },
  {
    name: "Clean the toilet again",
    description: "",
    isComplete: false,
  }] 

  const [todos, setTodos] = createSignal<Array<Todo>>(defaultTodos);

  console.log(todos());

  return (
    <>
    <section className="h-screen bg-amber-100">
      <header className="p-10 shadow-xl sticky bg-orange-300">
        <h1 className="text-7xl text-center font-bold">Todo Time</h1>
      </header>
      <section className="grid grid-cols-2 gap-20 mx-35 mt-15">
        <For each={todos()}>
          {(todo) =>
            <TodoDisplay/>
          }
        </For>
      </section>
    </section>
    </>
  );
};

export default TodoList;
