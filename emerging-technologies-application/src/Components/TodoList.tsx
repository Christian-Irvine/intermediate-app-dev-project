import { type Component, createSignal } from 'solid-js';

interface Todo {
  name: string;
  description: string;
  isComplete: boolean;
}

const TodoDisplay: Component = () => {
  const [todos, setTodos] = createSignal<Array<Todo>>([]);

  return (
    <p class="text-4xl text-green-700 text-center py-20">Hello sigma</p>
  );
};

export default TodoDisplay;
