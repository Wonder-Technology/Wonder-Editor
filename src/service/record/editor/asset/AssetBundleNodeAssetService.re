open TreeAssetType;

open NodeAssetType;

let getNodeName = ({name}: assetBundleNodeData) => name;

let getTypeStr = ({type_}: assetBundleNodeData) =>
  switch (type_) {
  | RAB => "RAB"
  | SAB => "SAB"
  | WAB => "WAB"
  };

let buildNodeData = (~name, ~assetBundle, ~type_) => {
  name,
  assetBundle,
  type_,
};

let buildNode = (~nodeId, ~name, ~assetBundle, ~type_) =>
  AssetBundleNode(nodeId, buildNodeData(~name, ~assetBundle, ~type_));

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  AssetBundleNode(nodeId, nodeData);

let rename = (~name, ~nodeData): assetBundleNodeData => {...nodeData, name};