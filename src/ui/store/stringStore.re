type stringAction =
  | A
  | B;

type stringState = {
  text: string,
  age: int
};

let stringReducer = (state: stringState, action: stringAction) : stringState =>
  switch action {
  | A => {...state, text: state.text ++ "a"}
  | B => {...state, text: state.text ++ "b"}
  };