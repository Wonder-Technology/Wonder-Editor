open TreeAssetType;

open NodeAssetType;

let getNodeName = ({name}: assetBundleNodeData) => name;

let getTypeStr = ({type_}: assetBundleNodeData) =>
  switch (type_) {
  | RAB => "RAB"
  | SAB => "SAB"
  | WAB => "WAB"
  };

let getNodeData = node =>
  switch (node) {
  | AssetBundleNode(_, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be assetBundle node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
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

let isAssetBundleNode = node =>
  switch (node) {
  | AssetBundleNode(_, _) => true
  | _ => false
  };

let getAssetBundle = node => getNodeData(node).assetBundle;