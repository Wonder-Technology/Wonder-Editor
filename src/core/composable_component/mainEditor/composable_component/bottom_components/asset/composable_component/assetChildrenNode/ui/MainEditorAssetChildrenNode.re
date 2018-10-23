open AssetNodeType;

open AssetTreeNodeType;

open CurrentNodeDataType;

module Method = {
  let _isSelected = (currentNodeData, nodeId) =>
    switch (currentNodeData) {
    | None => false
    | Some({currentNodeId}) => AssetUtils.isIdEqual(nodeId, currentNodeId)
    };

  let _handleImageNodeData = (assetTreeNodeChildrenArr, editorState) =>
    assetTreeNodeChildrenArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. editorState, {nodeId, type_}) =>
           switch (type_) {
           | Texture =>
             let {image} =
               editorState
               |> AssetTextureNodeMapEditorService.getTextureNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

             editorState
             |> AssetImageNodeMapEditorService.getImageNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(image)
             |> (
               ({base64, uint8Array, mimeType} as result) =>
                 switch (base64) {
                 | Some(_) => editorState
                 | None =>
                   /* TODO test */
                   switch (uint8Array) {
                   | None =>
                     WonderLog.Log.fatal(
                       WonderLog.Log.buildFatalMessage(
                         ~title="_handleImageNodeData",
                         ~description={j|image->uint8Array should exist|j},
                         ~reason="",
                         ~solution={j||j},
                         ~params={j||j},
                       ),
                     )
                   | Some(uint8Array) =>
                     AssetImageNodeMapEditorService.setResult(
                       image,
                       {
                         ...result,
                         base64:
                           Some(
                             BufferUtils.convertUint8ArrayToBase64(
                               uint8Array,
                               mimeType,
                             ),
                           ),
                       },
                       editorState,
                     )
                   }
                 }
             );
           | _ => editorState
           },
         editorState,
       );

  let showSpecificTreeNodeChildren =
      (
        assetTreeNodeChildrenArr,
        (store, dispatchFunc),
        (dragImg, debounceTime, currentNodeData),
        (editorState, engineState),
      ) =>
    assetTreeNodeChildrenArr
    |> Js.Array.map(({nodeId, type_}) =>
         switch (type_) {
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
             fileType=type_
             name
             isSelected=(_isSelected(currentNodeData, nodeId))
             widget=(AssetUtils.getWidget())
             debounceTime
             onDrop=(
               AssetTreeUtils.dragNodeToFolderFunc((store, dispatchFunc), ())
             )
             isWidget=AssetUtils.isWidget
             handleRelationError=AssetUtils.isTreeNodeRelationError
           />;
         | Texture =>
           let {textureComponent, image} =
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
               |> AssetImageNodeMapEditorService.getImageNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(image)
               |> (({base64, mimeType}) => base64 |> OptionService.unsafeGet)
             )
             fileId=nodeId
             fileType=type_
             fileName=(
               BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                 textureComponent,
               )
               |> StateLogicService.getEngineStateToGetData
             )
             widget=(AssetUtils.getWidget())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         | Material =>
           let baseName =
             AssetMaterialNodeMapLogicService.getMaterialBaseName(
               nodeId,
               engineState,
               editorState
               |> AssetMaterialNodeMapEditorService.getMaterialNodeMap,
             );

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/mat.png"
             fileId=nodeId
             fileType=type_
             fileName=baseName
             widget=(AssetUtils.getWidget())
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
             fileType=type_
             fileName=name
             widget=(AssetUtils.getWidget())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         }
       );

  let buildCurrentTreeNodeChildrenComponent =
      ((store, dispatchFunc), dragImg, debounceTime) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let assetTreeNodeChildrenArr =
      editorState
      |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
      |> AssetUtils.getSpecificTreeNodeById(
           editorState |> AssetUtils.getTargetTreeNodeId,
         )
      |> OptionService.unsafeGet
      |> (currentParentNode => currentParentNode.children);

    let editorState =
      _handleImageNodeData(assetTreeNodeChildrenArr, editorState);

    showSpecificTreeNodeChildren(
      assetTreeNodeChildrenArr,
      (store, dispatchFunc),
      (
        dragImg,
        debounceTime,
        editorState |> AssetCurrentNodeDataEditorService.getCurrentNodeData,
      ),
      (editorState, engineState),
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