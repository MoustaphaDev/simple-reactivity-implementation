type VoidFn = () => any;

const context: VoidFn[] = [];

export function createSignal(value: any) {
  const subscribers = new Set<VoidFn>();

  let localValue = value;
  const accessor = () => {
    const currentEffect = getCurrentCtxEffect?.();
    currentEffect && subscribers.add(currentEffect);
    return localValue;
  };

  const setter = (newValue: any) => {
    localValue = newValue;
    for (let subscriber of subscribers) {
      subscriber();
    }
  };

  return [accessor, setter];
}

export function createEffect(fn: VoidFn) {
  const execute = () => {
    context.push(execute);
    try {
      fn();
    } finally {
      context.pop();
    }
  };
  execute();
}

function getCurrentCtxEffect() {
  return context.at(-1);
}
