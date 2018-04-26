Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  assetTree: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentTreeNode: option(int)
};

module Method = {
  let onSelect = (dispatch, id) => {
    AssetEditorService.setCurrentTreeNode(id) |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let onDrop = (dispatch, (id, target)) => WonderLog.Log.print(("drop", id, target)) |> ignore;
  let addFolder = (dispatch, _event) => {
    let editorState = StateEditorService.getState();
    AssetEditorService.setAsseTree(
      editorState
      |> AssetEditorService.unsafeGetAssetTree
      |> AssetUtils.insertNewTreeNodeToTargetTreeNode(
           AssetUtils.getTargetTreeNodeId(editorState),
           editorState |> AssetUtils.increaseIndex |> AssetUtils.buildAssetTreeNodeByIndex
         )
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let _isCurrentTreeNode = (id) =>
    switch (AssetEditorService.getCurrentTreeNode |> StateLogicService.getEditorState) {
    | None => false
    | Some(treeNode) => treeNode === id ? true : false
    };
  let _isNotRoot = (uid) =>
    ((editorState) => editorState |> AssetUtils.getRootTreeNodeId != uid)
    |> StateLogicService.getEditorState;
  let rec buildAssetTreeArray = (onSelect, onDrop, assetTree) =>
    assetTree
    |> Array.map(
         ({id, name, imgArray, children}: AssetTreeNodeType.assetTreeNodeType) =>
           ArrayService.hasItem(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(id, name, _isCurrentTreeNode(id))
               eventHandleTuple=(onSelect, onDrop)
               sign="asset"
               icon="./public/img/12.jpg"
               dragable=(_isNotRoot(id))
               treeChildren=(buildAssetTreeArray(onSelect, onDrop, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(id, name, _isCurrentTreeNode(id))
               eventHandleTuple=(onSelect, onDrop)
               sign="asset"
               icon="./public/img/12.jpg"
               dragable=(_isNotRoot(id))
             />
       );
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = (store, dispatch, _self) =>
  <article key="asset" className="asset-component">
    <div className="asset-tree">
      <div className="tree-header">
        <button onClick=(Method.addFolder(dispatch))> (DomHelper.textEl("addFolder")) </button>
        <button> (DomHelper.textEl("remove")) </button>
        <button> (DomHelper.textEl("upload file")) </button>
      </div>
      (
        ReasonReact.arrayToElement(
          (
            (editorState) =>
              editorState
              |> AssetEditorService.unsafeGetAssetTree
              |> Method.buildAssetTreeArray(Method.onSelect(dispatch), Method.onDrop(dispatch))
          )
          |> StateLogicService.getEditorState
        )
      )
    </div>
    <div className="asset-content" />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    assetTree: AssetEditorService.getAssetTree |> StateLogicService.getEditorState,
    currentTreeNode: AssetEditorService.getCurrentTreeNode |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, self)
};