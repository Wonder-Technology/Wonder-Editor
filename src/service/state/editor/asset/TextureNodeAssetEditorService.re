let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    TextureNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let unsafeGetNodeData = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> TextureNodeAssetService.getNodeData;

let addTextureNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let doesAnyTextureUseImage = (targetImageDataIndex, editorState) =>
  IterateTreeAssetService.filter(
    ~acc=[],
    ~pushNodeFunc=(node, acc) => [node, ...acc],
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~predTextureNodeFunc=
      node => {
        let {imageDataIndex}: NodeAssetType.textureNodeData =
          TextureNodeAssetService.getNodeData(node);

        imageDataIndex === targetImageDataIndex;
      },
    (),
  )
  |> List.length > 1;

let getDataByTextureComponent = (targetTextureComponent, editorState) =>
  IterateTreeAssetService.findOne(
    ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
    ~predTextureNodeFunc=
      node => {
        let {textureComponent}: NodeAssetType.textureNodeData =
          TextureNodeAssetService.getNodeData(node);

        textureComponent === targetTextureComponent;
      },
    (),
  )
  |> Js.Option.map((. node) => TextureNodeAssetService.getNodeData(node));

let findAllTextureNodes = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predTextureNodeFunc=node => true,
    (),
  );

let getTextureComponents = editorState =>
  editorState
  |> findAllTextureNodes
  |> Js.Array.map(node => {
       let {textureComponent}: NodeAssetType.textureNodeData =
         TextureNodeAssetService.getNodeData(node);

       textureComponent;
     });