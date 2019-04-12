open TreeAssetType;

/* let buildNodeData = (nodeId, nodeData) => (nodeId, nodeData); */

/* let getSpecificNodeData = ((_, specificNodeData)) => specificNodeData; */

let isEqual = (value1, value2) => value1 === value2;

let isIdEqual = isEqual;

/* let _getNodeJudgeData =
     (
       node,
       (
         getImageDataJudgeDataFunc,
         getTextureNodeJudgeDataFunc,
         getMaterialNodeJudgeDataFunc,
         getWDBNodeJudgeDataFunc,
         getFolderNodeJudgeDataFunc,
       ),
     ) =>
   switch (node) {
   | ImageData(_) => node |> getImageDataData |> getImageDataJudgeDataFunc
   | TextureNode(_) => node |> getTextureNodeData |> getTextureNodeJudgeDataFunc
   | MaterialNode(_) =>
     node |> getMaterialNodeData |> getMaterialNodeJudgeDataFunc
   | WDBNode(_) => node |> getNodeData |> getWDBNodeJudgeDataFunc
   | FolderNode(_) => node |> getNodeData |> getFolderNodeJudgeDataFunc
   }; */

/* let isNodeEqual =
     ((isEqualFunc, getNodeJudgeDataFuncTuple), sourceNode, targetNode) =>
   isEqualFunc(
     _getNodeJudgeData(sourceNode, getNodeJudgeDataFuncTuple),
     _getNodeJudgeData(targetNode, getNodeJudgeDataFuncTuple),
   ); */

let isNodeEqual =
    ((isEqualFunc, getNodeJudgeDataFunc), sourceNode, targetNode) =>
  isEqualFunc(
    /* _getNodeJudgeData(sourceNode, getNodeJudgeDataFunc),
       _getNodeJudgeData(targetNode, getNodeJudgeDataFunc), */
    getNodeJudgeDataFunc(~node=sourceNode),
    getNodeJudgeDataFunc(~node=targetNode),
  );

/* let _getNodeIdFromNodeData = ((nodeId, _)) => nodeId; */

let getNodeId = (~node) =>
  switch (node) {
  | ScriptEventFunctionNode(nodeId, _) => nodeId
  | ScriptAttributeNode(nodeId, _) => nodeId
  | TextureNode(nodeId, _) => nodeId
  | MaterialNode(nodeId, _) => nodeId
  | WDBNode(nodeId, _) => nodeId
  | FolderNode(nodeId, _, _) => nodeId
  };

let isNodeEqualById = (~sourceNode, ~targetNode) =>
  isNodeEqual((isIdEqual, getNodeId), sourceNode, targetNode);

let handleNode =
    (
      ~node,
      ~textureNodeFunc,
      ~materialNodeFunc,
      ~scriptEventFunctionNodeFunc,
      ~scriptAttributeNodeFunc,
      ~wdbNodeFunc,
      ~folderNodeFunc,
    ) =>
  switch (node) {
  | ScriptEventFunctionNode(nodeId, scriptEventFunctionNodeData) =>
    scriptEventFunctionNodeFunc(nodeId, scriptEventFunctionNodeData)
  | ScriptAttributeNode(nodeId, scriptAttributeNodeData) =>
    scriptAttributeNodeFunc(nodeId, scriptAttributeNodeData)
  | TextureNode(nodeId, textureNodeData) =>
    textureNodeFunc(nodeId, textureNodeData)
  | MaterialNode(nodeId, materialNodeData) =>
    materialNodeFunc(nodeId, materialNodeData)
  | WDBNode(nodeId, wdbNodeData) => wdbNodeFunc(nodeId, wdbNodeData)
  | FolderNode(nodeId, folderNodeData, children) =>
    folderNodeFunc(nodeId, folderNodeData, children)
  };