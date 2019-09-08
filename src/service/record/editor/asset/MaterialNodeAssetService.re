open TreeAssetType;

open NodeAssetType;

let getNodeName =
    ({materialComponent, type_}: materialNodeData, getMaterialNameFunc) =>
  getMaterialNameFunc(~material=materialComponent, ~type_);

let buildNodeData = (~type_, ~materialComponent, ~snapshotImageDataIndex) => {
  type_,
  materialComponent,
  snapshotImageDataIndex,
};

let buildNode = (~nodeId, ~type_, ~materialComponent, ~snapshotImageDataIndex) =>
  MaterialNode(
    nodeId,
    buildNodeData(~type_, ~materialComponent, ~snapshotImageDataIndex),
  );

let buildNodeByNodeData = (~nodeId, ~nodeData) =>
  MaterialNode(nodeId, nodeData);

let isNode = node =>
  switch (node) {
  | MaterialNode(_, _) => true
  | _ => false
  };

let getNodeData = node =>
  switch (node) {
  | MaterialNode(nodeId, nodeData) => nodeData
  | _ =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should be material node|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let getMaterialComponent = node => getNodeData(node).materialComponent;

let getMaterialType = node => getNodeData(node).type_;

let getSnapshotImageDataIndex = node =>
  getNodeData(node).snapshotImageDataIndex;