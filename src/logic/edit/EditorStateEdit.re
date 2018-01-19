open Immutable;

let past: ref(Immutable.Stack.t(EditorStateDataTypeEdit.editorState)) = ref(Stack.empty());

let future: ref(Immutable.Stack.t(EditorStateDataTypeEdit.editorState)) = ref(Stack.empty());

let goBack = (currentState) =>
  switch (Stack.first(past^)) {
  | Some(lastState) =>
    future := Stack.addFirst(currentState, future^);
    past := Stack.removeFirstOrRaise(past^);
    lastState
  | None => currentState
  };

let goForward = (currentState) =>
  switch (Stack.first(future^)) {
  | Some(nextState) =>
    past := Stack.addFirst(currentState, past^);
    future := Stack.removeFirstOrRaise(future^);
    nextState
  | None => currentState
  };

let storeEditorState = (currentState) => {
  past := Stack.addFirst(currentState, past^);
  future := Stack.empty()
};