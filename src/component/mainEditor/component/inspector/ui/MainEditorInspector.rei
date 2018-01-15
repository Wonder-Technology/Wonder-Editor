module Method: {
  let buildCurrentGameObjectComponent:
    (
      AppStore.appState,
      'a,
      Js.Array.t(WonderEditor.GameObjectComponentParseType.gameObjectCompoent)
    ) =>
    array(ReasonReact.reactElement);
  let _buildComponentUIComponent:
    (string, 'b, AppStore.appState, 'a, Js.Array.t(ReasonReact.reactElement)) =>
    array(ReasonReact.reactElement);
};

let render:
  (
    AppStore.appState,
    'a,
    Js.Array.t(WonderEditor.GameObjectComponentParseType.gameObjectCompoent),
    'b
  ) =>
  ReasonReact.reactElement;

let make:
  (
    ~store: WonderEditor.AppStore.appState,
    ~dispatch: 'a,
    ~allShowComponentsConfig: Js.Array.t(
                                WonderEditor.GameObjectComponentParseType.gameObjectCompoent
                              ),
    'b
  ) =>
  ReasonReact.componentSpec(
    ReasonReact.stateless,
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless
  );