let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    MaterialNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let updateMaterialNodeData =
    (nodeId, targetMaterial, targetMaterialType, editorState) => {
  let node =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState);

  setNodeData(
    nodeId,
    {
      ...MaterialNodeAssetService.getNodeData(node),
      materialComponent: targetMaterial,
      type_: targetMaterialType,
    },
    editorState,
  );
};

let addMaterialNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let findAllMaterialNodes = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predMaterialNodeFunc=node => true,
    (),
  );

let getMaterialComponentsByType = (materialType, editorState) =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predMaterialNodeFunc=
      node => {
        let {type_}: NodeAssetType.materialNodeData =
          MaterialNodeAssetService.getNodeData(node);

        type_ === materialType;
      },
    (),
  )
  |> Js.Array.map(node => {
       let {materialComponent}: NodeAssetType.materialNodeData =
         MaterialNodeAssetService.getNodeData(node);

       materialComponent;
     });