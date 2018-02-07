module Method: {
  let buildCurrentGameObjectComponent:
    (
      AppStore.appState,
      WonderEditor.ReduxThunk.thunk('a) => 'b,
      Js.Array.t(WonderEditor.GameObjectAllComponentParseType.gameObjectComponent)
    ) =>
    array(ReasonReact.reactElement);
  let _buildComponentUIComponent:
    (
      (string, Wonderjs.TransformType.transform),
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => 'b)
    ) =>
    ReasonReact.reactElement;
};

let render:
  (
    AppStore.appState,
    WonderEditor.ReduxThunk.thunk('a) => 'b,
    Js.Array.t(WonderEditor.GameObjectAllComponentParseType.gameObjectComponent),
    'b
  ) =>
  ReasonReact.reactElement;

let make:
  (
    ~store: WonderEditor.AppStore.appState,
    ~dispatch: WonderEditor.ReduxThunk.thunk('a) => unit,
    ~allShowComponentConfig: Js.Array.t(WonderEditor.GameObjectAllComponentParseType.gameObjectComponent),
    'b
  ) =>
  ReasonReact.component(ReasonReact.stateless, ReasonReact.noRetainedProps, ReasonReact.actionless);