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

let render:
  (AppStore.appState, WonderEditor.ReduxThunk.thunk('a) => unit, 'c) => ReasonReact.reactElement;

let make:
  (~store: AppStore.appState, ~dispatch: WonderEditor.ReduxThunk.thunk('a) => unit, 'children) =>
  ReasonReact.component(ReasonReact.stateless, ReasonReact.noRetainedProps, ReasonReact.actionless);