Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  assetTreeRoot: option(AssetTreeNodeType.assetTreeNodeType),
  currentNodeId: option(int),
  currentNodeParentId: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(AssetNodeType.nodeResultType),
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = ((store, dispatchFunc), _self) => {
  let dragImg = DomHelper.createElement("img");
  <article key="asset" className="wonder-asset-component">
    <div className="asset-tree">
      <MainEditorAssetHeader store dispatchFunc />
      <MainEditorAssetTree store dispatchFunc dragImg />
    </div>
    <MainEditorAssetChildrenNode store dispatchFunc dragImg />
  </article>;
};
let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    assetTreeRoot:
      AssetTreeRootEditorService.getAssetTreeRoot
      |> StateLogicService.getEditorState,
    currentNodeId:
      AssetCurrentNodeIdEditorService.getCurrentNodeId
      |> StateLogicService.getEditorState,
    currentNodeParentId:
      AssetCurrentNodeParentIdEditorService.getCurrentNodeParentId
      |> StateLogicService.getEditorState,
    nodeMap:
      AssetNodeMapEditorService.unsafeGetNodeMap
      |> StateLogicService.getEditorState,
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), self),
};