open AssetNodeType;

open AssetTreeNodeType;

open CurrentNodeDataType;

module Method = {
  let _isSelected = (currentNodeData, nodeId) =>
    switch (currentNodeData) {
    | None => false
    | Some({currentNodeId}) => AssetUtils.isIdEqual(nodeId, currentNodeId)
    };

  let showSpecificTreeNodeChildren =
      (
        (store, dispatchFunc),
        (dragImg, debounceTime, currentNodeData),
        editorState,
        assetTreeNodeChildrenArr,
      ) =>
    assetTreeNodeChildrenArr
    |> Js.Array.map(({id as nodeId, type_ as assetType }) =>
         switch (assetType) {
         | Folder =>
           let {name}: folderResultType =
             editorState
             |> AssetFolderNodeMapEditorService.getFolderNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FolderBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/assetPackage.png"
             folderId=nodeId
             fileType=assetType
             name
             isSelected=(_isSelected(currentNodeData, nodeId))
             widge=(AssetUtils.getWidge())
             debounceTime
             onDrop=(
               AssetTreeUtils.dragNodeToFolderFunc((store, dispatchFunc), ())
             )
             isWidge=AssetUtils.isWidge
             handleRelationError=AssetTreeEditorService.isTreeNodeRelationError
           />;
         | Texture =>
           let {textureIndex, imageId} =
             editorState
             |> AssetTextureNodeMapEditorService.getTextureNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc=(
               editorState
               |> AssetImageBase64MapEditorService.getImageBase64Map
               |> WonderCommonlib.SparseMapService.unsafeGet(imageId)
               |> (({base64}) => base64)
             )
             fileId=nodeId
             fileType=assetType
             fileName=(
               BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                 textureIndex,
               )
               |> StateLogicService.getEngineStateToGetData
             )
             widge=(AssetUtils.getWidge())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         | Json =>
           let {name}: jsonResultType =
             editorState
             |> AssetJsonNodeMapEditorService.getJsonNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/12.jpg"
             fileId=nodeId
             fileType=assetType
             fileName=name
             widge=(AssetUtils.getWidge())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         | Material =>
           let {type_ , materialComponent}: materialResultType =
             editorState
             |> AssetMaterialNodeMapEditorService.getMaterialNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/mat.png"
             fileId=nodeId
             fileType=assetType
             fileName=(
               MainEditorMaterialUtils.getMaterialNameByMaterialType(
                 type_,
                 materialComponent,
               )
               |> StateLogicService.getEngineStateToGetData
             )
             widge=(AssetUtils.getWidge())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         | WDB =>
           let {name}: wdbResultType =
             editorState
             |> AssetWDBNodeMapEditorService.getWDBNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/wdb.png"
             fileId=nodeId
             fileType=assetType
             fileName=name
             widge=(AssetUtils.getWidge())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         }
       );

  let buildCurrentTreeNodeChildrenComponent =
      ((store, dispatchFunc), dragImg, debounceTime) => {
    let editorState = StateEditorService.getState();

    editorState
    |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
    |> AssetUtils.getSpecificTreeNodeById(
         editorState |> AssetUtils.getTargetTreeNodeId,
       )
    |> OptionService.unsafeGet
    |> (currentParentNode => currentParentNode.children)
    |> showSpecificTreeNodeChildren(
         (store, dispatchFunc),
         (
           dragImg,
           debounceTime,
           editorState |> AssetCurrentNodeDataEditorService.getCurrentNodeData,
         ),
         editorState,
       );
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = ((store, dispatchFunc), dragImg, debounceTime, _self) =>
  <article key="assetChildrenNode" className="wonder-asset-assetChildren">
    (
      ReasonReact.array(
        Method.buildCurrentTreeNodeChildrenComponent(
          (store, dispatchFunc),
          dragImg,
          debounceTime,
        ),
      )
    )
  </article>;

let make = (~store, ~dispatchFunc, ~dragImg, ~debounceTime, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, debounceTime, self),
};