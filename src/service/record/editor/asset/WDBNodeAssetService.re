open TreeAssetType;

open NodeAssetType;

let buildNode = (~nodeId, ~name, ~wdbGameObject) =>
  WDBNode(nodeId, {name, wdbGameObject});

let buildNodeByNodeData = (~nodeId, ~nodeData) => WDBNode(nodeId, nodeData);

let getNodeData = node =>
  switch (node) {
  | WDBNode(nodeId, nodeData) => nodeData
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

let isWDBNode = node =>
  switch (node) {
  | WDBNode(_, _) => true
  | _ => false
  };

let rename = (~name, ~nodeData) : wdbNodeData => {...nodeData, name};

let getNodeName = ({name}: wdbNodeData) => name;

let getWDBGameObject = node => getNodeData(node).wdbGameObject;