open TreeAssetType;

open NodeAssetType;

let getNodeName =
    ({textureComponent}: NodeAssetType.textureNodeData, getTextureNameFunc) =>
  getTextureNameFunc(~texture=textureComponent);


let buildNodeData =
    (~type_, ~textureContentIndex, ~textureComponent, ~imageDataIndex)
    : textureNodeData => {
  type_,
  textureContentIndex,
  textureComponent,
  imageDataIndex,
};

let buildNode =
    (
      ~nodeId,
      ~textureContentIndex,
      ~type_,
      ~textureComponent,
      ~imageDataIndex,
    ) =>
  TextureNode(
    nodeId,
    buildNodeData(
      ~type_,
      ~textureContentIndex,
      ~textureComponent,
      ~imageDataIndex,
    ),
  );

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  TextureNode(nodeId, nodeData);

let isNode = node =>
  switch (node) {
  | TextureNode(_, _) => true
  | _ => false
  };

let getNodeData = node =>
  switch (node) {
  | TextureNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be texture node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let getTextureComponent = node => {
  let {textureComponent}: NodeAssetType.textureNodeData = getNodeData(node);

  textureComponent;
};

let getImageDataIndex = node => {
  let {imageDataIndex}: NodeAssetType.textureNodeData = getNodeData(node);

  imageDataIndex;
};

let getType = node => {
  let {type_}: NodeAssetType.textureNodeData = getNodeData(node);

  type_;
};

let getTextureContentIndex = node => {
  let {textureContentIndex}: NodeAssetType.textureNodeData =
    getNodeData(node);

  textureContentIndex;
};

let unsafeGetTextureContentIndex = node =>
  getTextureContentIndex(node) |> OptionService.unsafeGet;

let isBasicSourceType = node => getType(node) === BasicSource;

let isIMGUICustomImageType = node => getType(node) === IMGUICustomImage;