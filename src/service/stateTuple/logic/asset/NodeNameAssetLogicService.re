let getFolderNodeName = node =>
  FolderNodeAssetService.getNodeName(
    FolderNodeAssetService.getNodeData(node),
  );

let getWDBNodeName = node =>
  WDBNodeAssetService.getNodeName(WDBNodeAssetService.getNodeData(node));

let getTextureNodeName = (~texture, ~engineState) =>
  OperateTextureLogicService.getName(~texture, ~engineState);

let getMaterialNodeName = (~material, ~type_, ~engineState) =>
  OperateMaterialLogicService.getName(~material, ~type_, ~engineState);

let getNodeName = (node, engineState) =>
  NodeNameAssetService.getNodeName(
    ~node,
    ~getTextureNameFunc=getTextureNodeName(~engineState),
    ~getMaterialNameFunc=getMaterialNodeName(~engineState),
  );

let isNodeEqualByName = (~sourceNode, ~targetNode, ~engineState) =>
  NodeNameAssetService.isNodeEqualByName(
    ~sourceNode,
    ~targetNode,
    ~getTextureNameFunc=getTextureNodeName(~engineState),
    ~getMaterialNameFunc=getMaterialNodeName(~engineState),
  );

let isTargetNameNode = (~node, ~name, ~engineState) =>
  NodeNameAssetService.isTargetNameNode(
    ~node,
    ~name,
    ~getTextureNameFunc=getTextureNodeName(~engineState),
    ~getMaterialNameFunc=getMaterialNodeName(~engineState),
  );