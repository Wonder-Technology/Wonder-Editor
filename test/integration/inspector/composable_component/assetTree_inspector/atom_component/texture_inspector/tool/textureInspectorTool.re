open AssetNodeType;
let getTextureIndexFromCurrentNodeData = () => {
  let assetState = StateAssetService.getState();
  let {textureIndex} =
    assetState
    |> TextureNodeMapAssetService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(
         assetState
         |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData
         |> (({currentNodeId, nodeType}) => currentNodeId),
       );
  textureIndex;
};

let _getFromArray = (array, index) => ArrayService.getNth(index, array);
let _getTriggerRenameInput = domChildren => {
  let article = _getFromArray(domChildren, 0);
  let texArticle = _getFromArray(article##children, 0);
  let div = _getFromArray(texArticle##children, 0);
  let renameDiv = _getFromArray(div##children, 2);
  let renameArticle = _getFromArray(renameDiv##children, 0);
  let input = _getFromArray(renameArticle##children, 1);

  input;
};

let triggerChangeRenameEvent = (value, domChildren) => {
  let input = _getTriggerRenameInput(domChildren);
  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value),
  );
};
let triggerBlurRenameEvent = (value, domChildren) => {
  let input = _getTriggerRenameInput(domChildren);
  BaseEventTool.triggerBlurEvent(input, BaseEventTool.buildFormEvent(value));
};

let triggerChangeWrapEvent = (index, value, domChildren) => {
  let article = _getFromArray(domChildren, 0);
  let textureArticle = _getFromArray(article##children, 0);
  let div = _getFromArray(textureArticle##children, 0);
  let selectDiv = _getFromArray(div##children, index);
  let selectArticle = _getFromArray(selectDiv##children, 0);
  let select = _getFromArray(selectArticle##children, 1);
  BaseEventTool.triggerChangeEvent(
    select,
    BaseEventTool.buildFormEvent(value),
  );
};
let triggerChangeFilterEvent = (index, value, domChildren) => {
  let article = _getFromArray(domChildren, 0);
  let textureArticle = _getFromArray(article##children, 0);
  let div = _getFromArray(textureArticle##children, 0);
  let selectDiv = _getFromArray(div##children, index);
  let selectArticle = _getFromArray(selectDiv##children, 0);
  let select = _getFromArray(selectArticle##children, 1);
  BaseEventTool.triggerChangeEvent(
    select,
    BaseEventTool.buildFormEvent(value),
  );
};



