import { type Component, createSignal, Index } from 'solid-js';

import TodoDisplay from './TodoDisplay';

export interface Todo {
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
    name: "",
    description: "",
    isComplete: false,
  },
  {
    name: "Timesheet",
    description: "Fill in your timesheet",
    isComplete: false,
  },
  {
    name: "Finish your intermediate App Dev",
    description: "You know whatcha gotta do.",
    isComplete: false,
  }
  ];

  const [todos, setTodos] = createSignal<Array<Todo>>(defaultTodos);  

  const handleTodoRemove: Function = (index: number) => {
    console.log(index);

    const newTodos: Array<Todo> = [...todos()];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <>
    <section class="h-screen bg-amber-100">
      <header class="p-10 shadow-xl sticky bg-orange-300">
        <h1 class="text-7xl text-center font-bold">Todo Time</h1>
      </header>
      <section class="grid grid-cols-3 gap-20 px-35 mt-15 bg-amber-100">
        <Index each={todos()}>
          {(todo, i) =>
            <TodoDisplay name={todo().name} description={todo().description} isComplete={todo().isComplete} index={i} handleTodoRemove={handleTodoRemove}/>
          }
        </Index>
      </section>
    </section>
    </>
  );
};

export default TodoList;
