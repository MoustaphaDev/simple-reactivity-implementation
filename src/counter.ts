import { createEffect, createSignal } from './primitives';

export function setupCounter(element: HTMLButtonElement) {
  const [count, setCount] = createSignal(0);

  element.addEventListener('click', () => setCount(count() + 1));

  createEffect(() => {
    element.innerHTML = `count is ${count()}`;
  });
}
