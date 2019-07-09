let getFolderNodeName = node =>
  FolderNodeAssetService.getNodeName(
    FolderNodeAssetService.getNodeData(node),
  );

let getWDBNodeName = node =>
  WDBNodeAssetService.getNodeName(WDBNodeAssetService.getNodeData(node));

let getTextureNodeName = (~texture, ~engineState) =>
  OperateTextureLogicService.getName(~texture, ~engineState);

let getCubemapNodeName = (~texture, ~engineState) =>
  OperateCubemapLogicService.getName(~texture, ~engineState);

let getMaterialNodeName = (~material, ~type_, ~engineState) =>
  OperateMaterialLogicService.getName(~material, ~type_, ~engineState);

let getNodeName = (node, engineState) =>
  NodeNameAssetService.getNodeName(
    ~node,
    ~getTextureNameFunc=getTextureNodeName(~engineState),
    ~getCubemapNameFunc=getCubemapNodeName(~engineState),
    ~getMaterialNameFunc=getMaterialNodeName(~engineState),
  );

let isNodeEqualByName = (~sourceNode, ~targetNode, ~engineState) =>
  NodeNameAssetService.isNodeEqualByName(
    ~sourceNode,
    ~targetNode,
    ~getTextureNameFunc=getTextureNodeName(~engineState),
    ~getCubemapNameFunc=getCubemapNodeName(~engineState),
    ~getMaterialNameFunc=getMaterialNodeName(~engineState),
  );

let isTargetNameNode = (~node, ~name, ~engineState) =>
  NodeNameAssetService.isTargetNameNode(
    ~node,
    ~name,
    ~getTextureNameFunc=getTextureNodeName(~engineState),
    ~getCubemapNameFunc=getCubemapNodeName(~engineState),
    ~getMaterialNameFunc=getMaterialNodeName(~engineState),
  );

let updateNodeName = (node, name, engineState) =>
  NodeAssetService.handleNode(
    ~node,
    ~textureNodeFunc=
      (nodeId, {textureComponent}: NodeAssetType.textureNodeData) => (
        OperateTextureLogicService.setName(
          ~texture=textureComponent,
          ~name,
          ~engineState,
        ),
        node,
      ),
    ~cubemapNodeFunc=
      (nodeId, {textureComponent}: NodeAssetType.cubemapNodeData) => (
        OperateCubemapLogicService.setName(
          ~texture=textureComponent,
          ~name,
          ~engineState,
        ),
        node,
      ),
    ~materialNodeFunc=
      (nodeId, {materialComponent, type_}: NodeAssetType.materialNodeData) => (
        OperateMaterialLogicService.setName(
          ~material=materialComponent,
          ~type_,
          ~name,
          ~engineState,
        ),
        node,
      ),
    ~scriptEventFunctionNodeFunc=
      (
        nodeId,
        ({name}: NodeAssetType.scriptEventFunctionNodeData) as nodeData,
      ) => (
        engineState,
        ScriptEventFunctionNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=
            ScriptEventFunctionNodeNameAssetService.rename(~name, ~nodeData),
        ),
      ),
    ~scriptAttributeNodeFunc=
      (nodeId, ({name}: NodeAssetType.scriptAttributeNodeData) as nodeData) => (
        engineState,
        ScriptAttributeNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=
            ScriptAttributeNodeNameAssetService.rename(~name, ~nodeData),
        ),
      ),
    ~wdbNodeFunc=
      (nodeId, nodeData) => (
        engineState,
        WDBNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=WDBNodeAssetService.rename(~name, ~nodeData),
        ),
      ),
    ~assetBundleNodeFunc=
      (nodeId, nodeData) => (
        engineState,
        AssetBundleNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=AssetBundleNodeAssetService.rename(~name, ~nodeData),
        ),
      ),
    ~folderNodeFunc=
      (nodeId, nodeData, children) => (
        engineState,
        FolderNodeAssetService.buildNodeByNodeData(
          ~nodeId,
          ~nodeData=FolderNodeAssetService.rename(~name, ~nodeData),
          ~children,
        ),
      ),
  );