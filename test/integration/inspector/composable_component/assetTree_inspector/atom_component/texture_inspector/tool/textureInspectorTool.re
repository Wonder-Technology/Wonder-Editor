open AssetNodeType;

let getWrapSDomIndex = () => 3;
let getWrapTDomIndex = () => 4;

let getMagFilterDomIndex = () => 5;

let getMinFilterDomIndex = () => 6;

let getWrapRepeatType = () =>
  Wonderjs.SourceTextureType.REPEAT |> TextureTypeUtils.convertWrapToInt;

let getWrapMirroredRepeatType = () =>
  Wonderjs.SourceTextureType.MIRRORED_REPEAT
  |> TextureTypeUtils.convertWrapToInt;

let getFilterLinearMipmapLinearType = () =>
  Wonderjs.SourceTextureType.LINEAR_MIPMAP_LINEAR
  |> TextureTypeUtils.convertFilterToInt;

let getFilterNearestMipmapLinearType = () =>
  Wonderjs.SourceTextureType.NEAREST_MIPMAP_LINEAR
  |> TextureTypeUtils.convertFilterToInt;

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

let _getFromArray = (array, index) => ArrayService.(getNth(index, array));
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
  WonderLog.Log.logJson(value);
  BaseEventTool.triggerChangeEvent(
    select,
    BaseEventTool.buildFormEvent(value),
  );
};

let triggerInspectorRenameEvent = newName => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    triggerChangeRenameEvent(newName),
  );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    triggerBlurRenameEvent(newName),
  );
};
let triggerInspectorChangeWrapEvent = (wrapIndex, type_) => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    triggerChangeWrapEvent(wrapIndex, type_ |> string_of_int),
  );
};

let triggerInspectorChangeFilterEvent = (index, type_) => {
  let inspectorComponent =
    BuildComponentTool.buildInspectorComponent(
      TestTool.buildEmptyAppState(),
      InspectorTool.buildFakeAllShowComponentConfig(),
    );
  BaseEventTool.triggerComponentEvent(
    inspectorComponent,
    triggerChangeFilterEvent(index, type_ |> string_of_int),
  );
};