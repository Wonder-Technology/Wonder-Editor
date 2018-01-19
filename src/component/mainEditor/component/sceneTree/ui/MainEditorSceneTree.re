open MainEditorSceneTreeType;

Css.importCss("./css/mainEditorSceneTree.css");

module Method = {
  let unsafeGetScene = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.unsafeGetScene;
  let onSelect = MainEditorSceneTreeSelectEventHandler.MakeMainEditorSceneTreeSelectEventHandler.onSelect;
  let getSceneGraphDataFromStore = (store: AppStore.appState) =>
    store.sceneTreeState.sceneGraphData |> Js.Option.getExn;
  let onDropFinish = MainEditorSceneTreeDragEventHandler.MakeMainEditorSceneTreeDragEventHandler.onDrag;
  let getSceneChildrenSceneGraphData = (sceneGraphData) =>
    sceneGraphData |> OperateArrayUtils.getFirst |> ((scene) => scene.children);
  let rec buildTreeArrayData = (onSelect, onDropFinish, sceneGraphData) =>
    sceneGraphData
    |> Array.map(
         ({uid, name, children}) =>
           OperateArrayUtils.hasItem(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name)
               eventHandleTuple=(onSelect, onDropFinish)
               treeChildren=(buildTreeArrayData(onSelect, onDropFinish, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(uid, name)
               eventHandleTuple=(onSelect, onDropFinish)
             />
       );
};

let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let render = (store, dispatch, _self) =>
  <article key="sceneTree" className="sceneTree-component">
    <DragTree
      key=(DomHelper.getRandomKey())
      treeArrayData=(
        Method.getSceneGraphDataFromStore(store)
        |> Method.getSceneChildrenSceneGraphData
        |> Method.buildTreeArrayData(
             Method.onSelect((store, dispatch), ()),
             Method.onDropFinish((store, dispatch), ())
           )
      )
      rootUid=(Method.unsafeGetScene())
      onDropFinish=(Method.onDropFinish((store, dispatch), ()))
    />
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};