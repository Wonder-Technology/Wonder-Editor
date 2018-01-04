open MainEditorSceneTreeType;

Css.importCss("./css/dragTree.css");

external toDomObj : ReactEventRe.Mouse.t => Js.t({..}) = "%identity";

type state = {currentStyle: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave;

module Method = {
  let getScene = () => MainEditorStateView.prepareState() |> MainEditorSceneView.getScene;
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (event) => {
    let e = toDomObj(event);
    e##stopPropagation();
    DragLeave
  };
  let handleDragOver = (event) => {
    let e = toDomObj(event);
    e##preventDefault()
  };
  let handleDrop = (uid, onDropFinish, event) => {
    let e = toDomObj(event);
    let dragedId = e##dataTransfer##getData("dragedId");
    onDropFinish(uid, dragedId)
  };
  let rec renderSceneGraph = (onSelect, onDropFinish, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           switch (children |> Js.Array.length) {
           | 0 => <TreeNode key=(DomHelper.getRandomKey()) uid name onDropFinish onSelect />
           | _ =>
             let treeChildren = renderSceneGraph(onSelect, onDropFinish, children);
             <TreeNode
               key=(DomHelper.getRandomKey())
               uid
               name
               onDropFinish
               onSelect
               treeChildren
             />
           }
       );
};

let component = ReasonReact.reducerComponent("DragTree");

let make =
    (
      ~onSelect: int => unit,
      ~onDropFinish: (int, int) => unit,
      ~sceneGraphData: array(MainEditorSceneTreeType.treeNode),
      _children
    ) => {
  ...component,
  initialState: () => {currentStyle: ReactDOMRe.Style.make(~backgroundColor="#c0c0c0", ())},
  reducer: (action, state) =>
    switch action {
    | DragEnter =>
      let style =
        ReactUtils.addStyleProp("backgroundColor", "rgba(1,1,1,0.7)", state.currentStyle);
      ReasonReact.Update({...state, currentStyle: style})
    | DragLeave =>
      ReasonReact.Update({
        ...state,
        currentStyle:
          ReactDOMRe.Style.unsafeAddProp(state.currentStyle, "backgroundColor", "#c0c0c0")
      })
    },
  render: ({state,  reduce}) => {
    <article className="wonder-drag-tree">
      (ReasonReact.arrayToElement(Method.renderSceneGraph(onSelect, onDropFinish, sceneGraphData)))
      <div
        style=state.currentStyle
        className="wonder-disable-drag"
        onDragEnter=(reduce(Method.handleDragEnter))
        onDragLeave=(reduce(Method.handleDragLeave))
        onDragOver=Method.handleDragOver
        onDrop=(Method.handleDrop(Method.getScene(), onDropFinish))
      />
    </article>
  }
};