import { type Component, createSignal, Index } from 'solid-js';
import { Show } from "solid-js"

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

  const [filter, setFilter] = createSignal<string>('');
  const [todos, setTodos] = createSignal<Array<Todo>>(defaultTodos);  

  const handleTodoRemove: Function = (index: number) => {
    console.log(index);

    const newTodos: Array<Todo> = [...todos()];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const handleTodoModify: Function = (newData: Todo, index: number) => {

    console.log(newData);

    const newTodos: Array<Todo> = [...todos()];
    newTodos[index] = newData;
    setTodos(newTodos);
  }

  const handleTodoAdd: Function = () => {
    const newTodos: Array<Todo> = [...todos()];
    newTodos.push({
      name: "",
      description: "",
      isComplete: filter() === 'complete',
    });
    setTodos(newTodos);
  }

  const handleFilterChange: Function = (filterValue) => {
    setFilter(filterValue);
  }

  const checkFilter: Function = (isComplete: boolean) => {
    if (filter() === '') {
      return true;
    }
    else if (filter() === 'complete') {
      return isComplete;
    }
    else {
      return !isComplete;
    }
  }

  return (
    <>
    <section class="h-screen bg-amber-100">
      <header class="p-10 shadow-xl sticky bg-orange-300">
        <h1 class="text-7xl text-center font-bold">Todo Time</h1>
      </header>
        <select name="filter" id="filter" value={filter()} onChange={(value) => handleFilterChange(value.currentTarget.value)} class="mx-35 mt-10 p-3 bg-orange-100 rounded-2xl border-4 border-orange-200">
          <option value="">No Filter</option>
          <option value="complete">Completed</option>
          <option value="not-complete">Not Completed</option>
        </select>
      <section class="grid grid-cols-3 gap-20 px-35 mt-15 bg-amber-100">
        <Index each={todos()}>
          {(todo, i) =>
            <Show when={checkFilter(todo().isComplete)}>
              <TodoDisplay name={todo().name} description={todo().description} isComplete={todo().isComplete} index={i} handleTodoRemove={handleTodoRemove} handleTodoModify={handleTodoModify}/>
            </Show>
          }
        </Index>
        <button onClick={() => handleTodoAdd()} class="bg-orange-100 rounded-full aspect-square border-4 border-orange-200 m-40 flex justify-center items-center font-bold align-middle text-9xl shadow-2xl">+
        </button>
      </section>
    </section>
    </>
  );
};

export default TodoList;
