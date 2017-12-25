Css.importCss("./css/dragTree.css");

open SceneTreeType;

type state = {dropOver: bool};

type action =
  | DropOver;

module Method = {
  let getSceneTree = () => {
    name: "root",
    uid: 0,
    children: [|
      {name: "A", uid: 1, children: [||]},
      {name: "B", uid: 2, children: [||]},
      {name: "C", uid: 3, children: [|{name: "D", uid: 4, children: [||]}|]}
    |]
  };
  let dragEnd = () => DropOver;
  let onDropFinish = (targetId, dragedId) => {
    Js.log(dragedId);
    Js.log(targetId)
  };
  let createDragInfo = () => {targetId: (-1), dragedId: (-1)};
  let rec renderSceneGraph = (onSelect, reduce, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           switch (children |> Js.Array.length) {
           | 0 =>
             <TreeNode
               key=(DomHelper.getRandomKey())
               uid
               name
               onDropFinish
               dragEnd=(reduce(dragEnd))
               onSelect
             />
           | _ =>
             let treeChildren = renderSceneGraph(onSelect, reduce, children);
             <TreeNode
               key=(DomHelper.getRandomKey())
               uid
               name
               onDropFinish
               dragEnd=(reduce(dragEnd))
               onSelect
               treeChildren
             />
           }
       );
};

let component = ReasonReact.reducerComponent("DragTree");

let make = (~onSelect: int => unit, _children) => {
  ...component,
  initialState: () => {dropOver: false},
  reducer: (action, state) =>
    switch action {
    | DropOver => ReasonReact.Update({...state, dropOver: ! state.dropOver})
    },
  render: ({state, handle, reduce}) =>
    <article className="wonder-drag-tree">
      (
        ReasonReact.arrayToElement(
          Method.renderSceneGraph(onSelect, reduce, Method.getSceneTree().children)
        )
      )
    </article>
};