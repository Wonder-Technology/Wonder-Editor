open TreeAssetType;

open NodeAssetType;

let buildNode = (~nodeId, ~name, ~eventFunctionData) =>
  ScriptEventFunctionNode(nodeId, {name, eventFunctionData});

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  ScriptEventFunctionNode(nodeId, nodeData);

let buildNodeData = (~name, ~eventFunctionData) => {name, eventFunctionData};

let getNodeData = node =>
  switch (node) {
  | ScriptEventFunctionNode(nodeId, nodeData) => nodeData
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

let getNodeNameByData = (nodeData: scriptEventFunctionNodeData) =>
  nodeData.name;

let isScriptEventFunctionNode = node =>
  switch (node) {
  | ScriptEventFunctionNode(_, _) => true
  | _ => false
  };

let getEventFunctionData = node => getNodeData(node).eventFunctionData;