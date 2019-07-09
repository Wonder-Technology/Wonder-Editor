open TreeAssetType;

open NodeAssetType;

let getNodeName =
    ({textureComponent}: NodeAssetType.cubemapNodeData, getCubemapNameFunc) =>
  getCubemapNameFunc(~texture=textureComponent);

let buildNodeData =
    (
      ~textureComponent,
      ~pxImageDataIndex,
      ~nxImageDataIndex,
      ~pyImageDataIndex,
      ~nyImageDataIndex,
      ~pzImageDataIndex,
      ~nzImageDataIndex,
    ) => {
  textureComponent,
  pxImageDataIndex,
  nxImageDataIndex,
  pyImageDataIndex,
  nyImageDataIndex,
  pzImageDataIndex,
  nzImageDataIndex,
};

let buildNode =
    (
      ~nodeId,
      ~textureComponent,
      ~pxImageDataIndex,
      ~nxImageDataIndex,
      ~pyImageDataIndex,
      ~nyImageDataIndex,
      ~pzImageDataIndex,
      ~nzImageDataIndex,
    ) =>
  CubemapNode(
    nodeId,
    buildNodeData(
      ~textureComponent,
      ~pxImageDataIndex,
      ~nxImageDataIndex,
      ~pyImageDataIndex,
      ~nyImageDataIndex,
      ~pzImageDataIndex,
      ~nzImageDataIndex,
    ),
  );

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  CubemapNode(nodeId, nodeData);

let isCubemapNode = node =>
  switch (node) {
  | CubemapNode(_, _) => true
  | _ => false
  };

let getNodeData = node =>
  switch (node) {
  | CubemapNode(nodeId, nodeData) => nodeData
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
  let {textureComponent}: NodeAssetType.cubemapNodeData = getNodeData(node);

  textureComponent;
};

let getPXImageDataIndex = node => {
  let {pxImageDataIndex}: NodeAssetType.cubemapNodeData = getNodeData(node);

  pxImageDataIndex;
};

let getNXImageDataIndex = node => {
  let {nxImageDataIndex}: NodeAssetType.cubemapNodeData = getNodeData(node);

  nxImageDataIndex;
};

let getPYImageDataIndex = node => {
  let {pyImageDataIndex}: NodeAssetType.cubemapNodeData = getNodeData(node);

  pyImageDataIndex;
};

let getNYImageDataIndex = node => {
  let {nyImageDataIndex}: NodeAssetType.cubemapNodeData = getNodeData(node);

  nyImageDataIndex;
};

let getPZImageDataIndex = node => {
  let {pzImageDataIndex}: NodeAssetType.cubemapNodeData = getNodeData(node);

  pzImageDataIndex;
};

let getNZImageDataIndex = node => {
  let {nzImageDataIndex}: NodeAssetType.cubemapNodeData = getNodeData(node);

  nzImageDataIndex;
};