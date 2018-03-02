module Method: {
  let buildCurrentGameObjectComponent:
    (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => 'b) => array(ReasonReact.reactElement);
  let _buildComponentUIComponent:
    (
      (string, Wonderjs.TransformType.transform),
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => 'b)
    ) =>
    ReasonReact.reactElement;
};

let render:
  (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => 'b, 'b) => ReasonReact.reactElement;

let make:
  (
    ~store: WonderEditor.AppStore.appState,
    ~dispatch: WonderEditor.ReduxThunk.thunk('a) => unit,
    'b
  ) =>
  ReasonReact.component(ReasonReact.stateless, ReasonReact.noRetainedProps, ReasonReact.actionless);