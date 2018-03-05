module Method: {
  let onDrop:
    (
      (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => 'b),
      unit,
      (Wonderjs.GameObjectType.gameObject, Wonderjs.GameObjectType.gameObject)
    ) =>
    unit;
  let buildTreeArrayData:
    (int => unit, ((int, int)) => unit, array(MainEditorSceneTreeType.treeNode)) =>
    array(ReasonReact.reactElement);
};

type retainedProps;

let render:
  (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => unit, 'c) => ReasonReact.reactElement;

let make:
  (
    ~store: WonderEditor.AppStore.appState,
    ~dispatch: WonderEditor.ReduxThunk.thunk('a) => 'b,
    'c
  ) =>
  ReasonReact.componentSpec(
    ReasonReact.stateless,
    ReasonReact.stateless,
    retainedProps,
    retainedProps,
    ReasonReact.actionless
  );