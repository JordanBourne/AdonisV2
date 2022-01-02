export const AddTodos = 'Progress/AddTodos';
export const AddTodosActionFn = (identifier: string, count: number) => ({ type: AddTodos, count, identifier });

export const CompleteTodos = 'Progress/CompleteTodos';
export const CompleteTodosActionFn = (identifier: string, count: number) => ({ type: CompleteTodos, count, identifier });

export const MarkComplete = 'Progress/MarkComplete';
export const ResetProgress = 'Progress/ResetProgress';
export const MarkCompleteActionFn = (identifier: string) => ({ type: MarkComplete, identifier });