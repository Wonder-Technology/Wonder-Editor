module Method: {
  let buildCurrentGameObjectComponent:
    (
      AppStore.appState,
      'a,
      Js.Array.t(WonderEditor.GameObjectComponentParseType.gameObjectCompoent)
    ) =>
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

/* let make:
   (
     ~store: AppStore.appState,
     ~dispatch: 'a,
     ~allComponent: Js.Array.t(WonderEditor.GameObjectComponentParseType.gameObjectCompoent),
     'children
   ) =>
   ReasonReact.componentSpec
   (ReasonReact.stateless,  ReasonReact.stateless,
     ReasonReact.noRetainedProps,  ReasonReact.noRetainedProps,
     ReasonReact.actionless) */
let make:
  (
    ~store: WonderEditor.AppStore.appState,
    ~dispatch: 'a,
    ~allComponents: Js.Array.t(WonderEditor.GameObjectComponentParseType.gameObjectCompoent),
    'b
  ) =>
  ReasonReact.componentSpec(
    ReasonReact.stateless,
    ReasonReact.stateless,
    ReasonReact.noRetainedProps,
    ReasonReact.noRetainedProps,
    ReasonReact.actionless
  );