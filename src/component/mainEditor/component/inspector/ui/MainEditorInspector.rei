module Method: {
  let buildCurrentGameObjectComponent: (AppStore.appState, 'a) => ReasonReact.reactElement;
};

let render: (AppStore.appState, 'a, 'b) => ReasonReact.reactElement;

let make:
  (~store: AppStore.appState, ~dispatch: 'a, 'children) =>
  ReasonReact.component(ReasonReact.stateless, ReasonReact.noRetainedProps, ReasonReact.actionless);