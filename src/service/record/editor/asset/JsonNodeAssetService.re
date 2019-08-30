open TreeAssetType;

open NodeAssetType;

let getNewName = () => "New Json";

let buildNodeData = (~name, ~jsonStr) => {name, jsonStr};

let buildNode = (~nodeId, ~name, ~jsonStr) =>
  JsonNode(nodeId, buildNodeData(~name, ~jsonStr));

let buildNodeByNodeData = (~nodeId, ~nodeData) => JsonNode(nodeId, nodeData);

let getNodeData = node =>
  switch (node) {
  | JsonNode(nodeId, nodeData) => nodeData
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
  | JsonNode(_, _) => true
  | _ => false
  };

let rename = (~name, ~nodeData): jsonNodeData => {...nodeData, name};

let getNodeNameByData = ({name}: jsonNodeData) => name;