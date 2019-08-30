open TreeAssetType;

open NodeAssetType;

let buildNodeData = (~name, ~buttonSkinData, ~allCustomStyleData) => {
  name,
  singleSkinData: {
    buttonSkinData,
    allCustomStyleData,
  },
};

let buildNode = (~nodeId, ~name, ~buttonSkinData, ~allCustomStyleData) =>
  IMGUISkinNode(
    nodeId,
    buildNodeData(~name, ~buttonSkinData, ~allCustomStyleData),
  );

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  IMGUISkinNode(nodeId, nodeData);

let getNodeData = node =>
  switch (node) {
  | IMGUISkinNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be wdb node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let isNode = node =>
  switch (node) {
  | IMGUISkinNode(_, _) => true
  | _ => false
  };

let rename = (~name, ~nodeData): imguiSkinNodeData => {...nodeData, name};

let getNodeName = node => getNodeData(node).name;

let getNodeNameByData = ({name}: NodeAssetType.imguiSkinNodeData) => name;