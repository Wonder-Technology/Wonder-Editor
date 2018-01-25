module Method: {
  let buildCurrentGameObjectComponent:
    (
      AppStore.appState,
      WonderEditor.ReduxThunk.thunk('a) => 'b,
      Js.Array.t(WonderEditor.GameObjectComponentParseType.gameObjectCompoent)
    ) =>
    array(ReasonReact.reactElement);
  let _buildComponentUIComponent:
    (
      (string, Wonderjs.TransformType.transform),
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => 'b),
      Js.Array.t(ReasonReact.reactElement)
    ) =>
    array(ReasonReact.reactElement);
};

type retainedProps;

let render:
  (
    AppStore.appState,
    WonderEditor.ReduxThunk.thunk('a) => 'b,
    Js.Array.t(WonderEditor.GameObjectComponentParseType.gameObjectCompoent),
    'b
  ) =>
  ReasonReact.reactElement;

let make:
  (
    ~store: WonderEditor.AppStore.appState,
    ~dispatch: WonderEditor.ReduxThunk.thunk('a) => unit,
    ~allShowComponentsConfig: Js.Array.t(
                                WonderEditor.GameObjectComponentParseType.gameObjectCompoent
                              ),
    'b
  ) =>
  ReasonReact.componentSpec(
    ReasonReact.stateless,
    ReasonReact.stateless,
    retainedProps,
    retainedProps,
    ReasonReact.actionless
  );