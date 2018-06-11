let updateWithSideEffects = (state, func) => {
  func(state);
  ReasonReact.Update(state);
};

let sideEffects = func => {
  func();
  ReasonReact.NoUpdate;
};