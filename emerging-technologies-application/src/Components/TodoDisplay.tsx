import type { Component } from 'solid-js';

const TodoDisplay: Component = () => {
  return (
    <article className="bg-orange-100 ratio aspect-square rounded-3xl p-10 border-orange-200 border-solid border-4 shadow-2xl">
      <p>name</p>
      <p>description</p>
      <p>isComplete</p>
    </article>
  );
};

export default TodoDisplay;
