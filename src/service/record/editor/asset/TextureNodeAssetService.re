open TreeAssetType;

open NodeAssetType;

let getNodeName = ({textureComponent}: textureNodeData, getTextureNameFunc) =>
  getTextureNameFunc(~texture=textureComponent);

let buildNodeData = (~textureComponent, ~imageDataIndex) => {
  textureComponent,
  imageDataIndex,
};

let buildNode = (~nodeId, ~textureComponent, ~imageDataIndex) =>
  TextureNode(nodeId, buildNodeData(~textureComponent, ~imageDataIndex));

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  TextureNode(nodeId, nodeData);

let isTextureNode = node =>
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
  let {textureComponent} = getNodeData(node);

  textureComponent;
};

let getImageDataIndex = node => {
  let {imageDataIndex}: textureNodeData = getNodeData(node);

  imageDataIndex;
};