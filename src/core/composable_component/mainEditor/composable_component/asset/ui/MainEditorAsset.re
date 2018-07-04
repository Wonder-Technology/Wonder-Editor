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
    <MainEditorAssetChildrenNode store dispatchFunc dragImg debounceTime=200 />
  </article>;
};
let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    assetTreeRoot:
      AssetTreeRootAssetService.getAssetTreeRoot
      |> StateLogicService.getAssetState,
    currentNodeId:
      CurrentNodeIdAssetService.getCurrentNodeId
      |> StateLogicService.getAssetState,
    currentNodeParentId:
      CurrentNodeParentIdAssetService.getCurrentNodeParentId
      |> StateLogicService.getAssetState,
    nodeMap:
      NodeMapAssetService.unsafeGetNodeMap
      |> StateLogicService.getAssetState,
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), self),
};