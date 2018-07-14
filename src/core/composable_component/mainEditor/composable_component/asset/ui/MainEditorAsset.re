open AssetNodeType;

Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  assetTreeRoot: option(AssetTreeNodeType.assetTreeNodeType),
  currentNodeData: option(CurrentNodeDataType.currentNodeDataType),
  currentNodeParentId: option(int),
  currentTextureNodeName: option(string),
  folderNodeMap:
    WonderCommonlib.SparseMapService.t(AssetNodeType.folderResultType),
  textureNodeMap:
    WonderCommonlib.SparseMapService.t(AssetNodeType.textureResultType),
  jsonNodeMap:
    WonderCommonlib.SparseMapService.t(AssetNodeType.jsonResultType),
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
    let assetState = StateAssetService.getState();
    let currentNodeData =
      StateAssetService.getState()
      |> CurrentNodeDataAssetService.getCurrentNodeData;
    {
      assetTreeRoot:
        AssetTreeRootAssetService.getAssetTreeRoot
        |> StateLogicService.getAssetState,
      currentNodeData:
        CurrentNodeDataAssetService.getCurrentNodeData
        |> StateLogicService.getAssetState,
      currentNodeParentId:
        CurrentNodeParentIdAssetService.getCurrentNodeParentId
        |> StateLogicService.getAssetState,
      currentTextureNodeName:
        switch (currentNodeData) {
        | None => None
        | Some(({currentNodeId}: CurrentNodeDataType.currentNodeDataType)) =>
          switch (
            assetState
            |> TextureNodeMapAssetService.getTextureNodeMap
            |> WonderCommonlib.SparseMapService.get(currentNodeId)
          ) {
          | None => None
          | Some({textureIndex}) =>
            BasicSourceTextureEngineService.getBasicSourceTextureName(
              textureIndex,
            )
            |> StateLogicService.getEngineStateToGetData
          }
        },
      folderNodeMap:
        FolderNodeMapAssetService.getFolderNodeMap
        |> StateLogicService.getAssetState,
      textureNodeMap:
        TextureNodeMapAssetService.getTextureNodeMap
        |> StateLogicService.getAssetState,
      jsonNodeMap:
        JsonNodeMapAssetService.getJsonNodeMap
        |> StateLogicService.getAssetState,
    };
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), self),
};