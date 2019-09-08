open TreeAssetType;

open NodeAssetType;

let buildNode = (~nodeId, ~name, ~wdbGameObject, ~imageDataIndex) =>
  WDBNode(nodeId, {name, wdbGameObject, imageDataIndex});

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

let isNode = node =>
  switch (node) {
  | WDBNode(_, _) => true
  | _ => false
  };

let rename = (~name, ~nodeData): wdbNodeData => {...nodeData, name};

let getNodeNameByData = ({name}: wdbNodeData) => name;

let getWDBGameObject = node => getNodeData(node).wdbGameObject;