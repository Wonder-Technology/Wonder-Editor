Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  assetTreeRoot: option(AssetTreeNodeType.assetTreeNodeType),
  currentAssetTreeNode: option(int),
  currentAssetChildrenNodeParent: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(AssetNodeType.nodeResultType)
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = (store, dispatch, _self) =>
  <article key="asset" className="asset-component">
    <div className="asset-tree">
      <MainEditorAssetHeader store dispatch />
      <MainEditorAssetTree store dispatch />
    </div>
    <MainEditorAssetChildrenNode store dispatch />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) => {
  WonderLog.Log.print(oldSelf.retainedProps.nodeMap) |> ignore;
  WonderLog.Log.print(newSelf.retainedProps.nodeMap) |> ignore;
  oldSelf.retainedProps != newSelf.retainedProps
};

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    assetTreeRoot: AssetTreeRootEditorService.getAssetTreeRoot |> StateLogicService.getEditorState,
    currentAssetTreeNode:
      AssetCurrentAssetTreeNodeEditorService.getCurrentAssetTreeNode
      |> StateLogicService.getEditorState,
    currentAssetChildrenNodeParent:
      AssetCurrentAssetChildrenNodeParentEditorService.getCurrentAssetChildrenNodeParent
      |> StateLogicService.getEditorState,
    nodeMap: AssetNodeMapEditorService.unsafeGetNodeMap |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, self)
};