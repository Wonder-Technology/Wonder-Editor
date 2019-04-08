open TreeAssetType;

open NodeAssetType;

let buildNode = (~nodeId, ~name, ~attribute) =>
  ScriptAttributeNode(nodeId, {name, attribute});

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  ScriptAttributeNode(nodeId, nodeData);

let buildNodeData = (~name, ~attribute) => {name, attribute};

let getNodeData = node =>
  switch (node) {
  | ScriptAttributeNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be scriptEventFunction node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let getNodeName = node => getNodeData(node).name;

let getNodeNameByData = (nodeData: scriptAttributeNodeData) => nodeData.name;

let isScriptAttributeNode = node =>
  switch (node) {
  | ScriptAttributeNode(_, _) => true
  | _ => false
  };