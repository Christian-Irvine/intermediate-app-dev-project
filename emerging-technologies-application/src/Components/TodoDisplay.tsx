import type { Component } from 'solid-js';

import { Todo } from './TodoList';

interface TodoProps {
  name: string;
  description: string;
  isComplete: boolean;
  index: number;
  handleTodoRemove: Function;
  handleTodoModify: Function;
}

const TodoDisplay: Component<TodoProps> = (props) => {
  const handleFormModify = (values: any, type: string) => {
    if (!values.currentTarget.value) return;

    const newTodo: Todo = {
      name: props.name,
      description: props.description,
      isComplete: props.isComplete,
    }

    newTodo[type] = values.currentTarget.value;

    console.log(newTodo);

    props.handleTodoModify(newTodo, props.index);
  }

  return (
    <article class="bg-orange-100 aspect-square rounded-3xl p-10 border-orange-200 border-solid border-4 shadow-2xl relative">
      <form onSubmit={(e)=>e.preventDefault()} class="flex flex-col">
        <input 
          onChange={(values) => handleFormModify(values, 'name')} 
          type="text"
          maxlength="32"
          value={props.name === '' || !props.name ? 'Untitled' : props.name} 
          class="font-bold text-2xl text-center pb-5"
        />
        <textarea 
          onChange={(values) => handleFormModify(values, 'description')} 
          maxlength="512" 
          rows="8"
          value={props.description === '' || !props.description ? 'No Description.' : props.description} 
          class="text-l resize-none pb-5"
        />
        
      </form>
      <button onClick={() => props.handleTodoRemove(props.index)} class="absolute -top-5 -right-5 w-15">
        <div class="bg-orange-100 rounded-full aspect-square border-4 border-orange-200 justify-center flex items-center font-bold text-2xl">✕</div>
      </button>
    </article>
  );
}; // <p>{props.isComplete.toString()}</p>

export default TodoDisplay;
