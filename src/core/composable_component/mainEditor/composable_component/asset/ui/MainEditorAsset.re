Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  assetTree: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentTreeNode: option(int)
};

module Method = {
  let onSelect = (id) => WonderLog.Log.print(("select", id)) |> ignore;
  let onDrop = ((id, target)) => WonderLog.Log.print(("drop", id, target)) |> ignore;
  let _isCurrentTreeNode = (id) => true;
  let _isNotRoot = (id) => id != 0;
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
      (
        ReasonReact.arrayToElement(
          (
            (editorState) =>
              editorState
              |> AssetEditorService.unsafeGetAssetTree
              |> Method.buildAssetTreeArray(Method.onSelect, Method.onDrop)
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