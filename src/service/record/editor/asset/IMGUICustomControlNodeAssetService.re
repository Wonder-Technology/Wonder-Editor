open TreeAssetType;

open NodeAssetType;

let buildNodeData = (~name, ~customControlFunc) => {name, customControlFunc};

let buildNode = (~nodeId, ~name, ~customControlFunc) =>
  IMGUICustomControlNode(nodeId, buildNodeData(~name, ~customControlFunc));

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  IMGUICustomControlNode(nodeId, nodeData);

let getNodeData = node =>
  switch (node) {
  | IMGUICustomControlNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be imgui custom control node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let isNode = node =>
  switch (node) {
  | IMGUICustomControlNode(_, _) => true
  | _ => false
  };

let getNodeName = node => getNodeData(node).name;

let getNodeNameByData = ({name}: NodeAssetType.imguiCustomControlNodeData) => name;

let getCustomControlFunc =
    ({customControlFunc}: NodeAssetType.imguiCustomControlNodeData) => customControlFunc;