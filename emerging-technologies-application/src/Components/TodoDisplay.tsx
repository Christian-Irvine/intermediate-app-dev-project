import type { Component } from 'solid-js';

import { Todo } from './TodoList';

interface TodoProps {
  name: string;
  description: string;
  isComplete: boolean;
  index: number;
}

const TodoDisplay: Component<TodoProps> = (props) => {

  console.log(props.name);
  
  return (
    <article class="bg-orange-100 aspect-square rounded-3xl p-10 border-orange-200 border-solid border-4 shadow-2xl relative">
      <h2 class="font-bold text-2xl text-center pb-5">{props.name === '' || !props.name ? 'Untitled' : props.name}</h2>
      <p>{props.description === '' || !props.description ? 'No Description.' : props.description}</p>
      <p>{props.isComplete.toString()}</p>
      <button class="absolute -top-5 -right-5 w-15">
        <div class="bg-orange-100 rounded-full aspect-square border-4 border-orange-200 justify-center flex items-center font-bold text-2xl">✕</div>
      </button>
    </article>
  );
};

export default TodoDisplay;
