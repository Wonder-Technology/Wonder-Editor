module Method : {
  let handleDragOver:(ReactEventRe.Mouse.t) => 'a;
  let handleDrop:('a,('a,int) => 'b,ReactEventRe.Mouse.t) => 'b;
  let renderSceneGraph:((int) => unit,(int,int) => unit,array(MainEditorSceneTreeType.treeNode)) => Js.Array.t(ReasonReact.reactElement)
};
type state;
type action;
let make: (
      ~onSelect:(int) => unit,
      ~onDropFinish:(int,int) => unit,
      ~sceneGraphData: array(MainEditorSceneTreeType.treeNode),
      'a
) => ReasonReact.component(
  state,
  ReasonReact.noRetainedProps,
  action
);