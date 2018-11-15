open AssetNodeType;

open AssetTreeNodeType;

open CurrentNodeDataType;

module Method = {
  let _isSelected = (currentNodeData, nodeId) =>
    switch (currentNodeData) {
    | None => false
    | Some({currentNodeId}) =>
      TreeAssetEditorService.isIdEqual(nodeId, currentNodeId)
    };

  let _buildImageNodeObjectURLIfNoBase64 =
      (assetTreeChildrenNodeArr, editorState) =>
    assetTreeChildrenNodeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. editorState, {nodeId, type_}) =>
           switch (type_) {
           | Texture =>
             let {image} =
               editorState
               |> TextureNodeMapAssetEditorService.getTextureNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

             editorState
             |> ImageNodeMapAssetEditorService.getImageNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(image)
             |> (
               ({base64, uint8Array, blobObjectURL, mimeType} as result) =>
                 switch (blobObjectURL) {
                 | Some(_) => editorState
                 | None =>
                   switch (base64) {
                   | Some(_) => editorState
                   | None =>
                     switch (uint8Array) {
                     | None =>
                       ConsoleUtils.error(
                         "_buildImageNodeObjectURLIfNoBase64:image->uint8Array should exist",
                         editorState,
                       );

                       editorState;
                     | Some(uint8Array) =>
                       ImageNodeMapAssetEditorService.setResult(
                         image,
                         {
                           ...result,
                           blobObjectURL:
                             Some(
                               Blob.newBlobFromArrayBuffer(
                                 uint8Array,
                                 mimeType,
                               )
                               |> Blob.createObjectURL,
                             ),
                         },
                         editorState,
                       )
                     }
                   }
                 }
             );
           | _ => editorState
           },
         editorState,
       );

  let _getNodeNameByType = ({nodeId, type_}, (editorState, engineState)) =>
    switch (type_) {
    | Folder =>
      let {name}: folderResultType =
        editorState
        |> FolderNodeMapAssetEditorService.getFolderNodeMap
        |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

      name;
    | WDB =>
      let {name}: wdbResultType =
        editorState
        |> WDBNodeMapAssetEditorService.getWDBNodeMap
        |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

      name;
    | Material =>
      let baseName =
        MaterialNodeMapAssetLogicService.getMaterialBaseName(
          nodeId,
          engineState,
          editorState |> MaterialNodeMapAssetEditorService.getMaterialNodeMap,
        );

      baseName;
    | Texture =>
      let {textureComponent} =
        editorState
        |> TextureNodeMapAssetEditorService.getTextureNodeMap
        |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

      BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
        textureComponent,
        engineState,
      );
    };

  let _sortByName = (assetTreeChildrenNodeArr, (editorState, engineState)) =>
    assetTreeChildrenNodeArr
    |> Js.Array.sortInPlaceWith((node1, node2) =>
         Js.String.localeCompare(
           _getNodeNameByType(node2, (editorState, engineState))
           |> Js.String.charAt(0),
           _getNodeNameByType(node1, (editorState, engineState))
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let sortAssetTreeChildrenNode =
      (assetTreeChildrenNodeArr, (editorState, engineState)) => {
    let folderAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(({type_}) => type_ === Folder);

    let wdbAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr |> Js.Array.filter(({type_}) => type_ === WDB);

    let materialAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(({type_}) => type_ === Material);

    let textureAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(({type_}) => type_ === Texture);

    ArrayService.fastConcat(
      _sortByName(
        folderAssetTreeChildrenNodeArr,
        (editorState, engineState),
      ),
      _sortByName(wdbAssetTreeChildrenNodeArr, (editorState, engineState)),
    )
    |> ArrayService.fastConcat(
         _,
         _sortByName(
           materialAssetTreeChildrenNodeArr,
           (editorState, engineState),
         ),
       )
    |> ArrayService.fastConcat(
         _,
         _sortByName(
           textureAssetTreeChildrenNodeArr,
           (editorState, engineState),
         ),
       );
  };

  let showSpecificTreeNodeChildren =
      (
        assetTreeChildrenNodeArr,
        (store, dispatchFunc),
        (dragImg, debounceTime, currentNodeData),
        (editorState, engineState),
      ) => {
    let result =
      assetTreeChildrenNodeArr
      |> sortAssetTreeChildrenNode(_, (editorState, engineState))
      |> Js.Array.map(({nodeId, type_}) =>
           switch (type_) {
           | Folder =>
             let {name}: folderResultType =
               editorState
               |> FolderNodeMapAssetEditorService.getFolderNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

             <FolderBox
               key=(DomHelper.getRandomKey())
               store
               dispatchFunc
               dragImg
               effectAllowd="move"
               imgSrc="./public/img/assetPackage.png"
               folderId=nodeId
               fileType=type_
               name
               isSelected=(_isSelected(currentNodeData, nodeId))
               widget=(AssetUtils.getWidget())
               debounceTime
               onDrop=(
                 AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
                   (store, dispatchFunc),
                   (),
                 )
               )
               isWidget=AssetUtils.isWidget
               handleRelationError=AssetTreeUtils.isTreeNodeRelationError
             />;
           | Texture =>
             let {textureComponent, image} =
               editorState
               |> TextureNodeMapAssetEditorService.getTextureNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

             <FileBox
               key=(DomHelper.getRandomKey())
               store
               dispatchFunc
               dragImg
               effectAllowd="move"
               imgSrc=(
                 editorState
                 |> ImageNodeMapAssetEditorService.getImageNodeMap
                 |> WonderCommonlib.SparseMapService.unsafeGet(image)
                 |> (
                   ({blobObjectURL, base64, mimeType}) =>
                     switch (blobObjectURL) {
                     | Some(blobObjectURL) => blobObjectURL
                     | None =>
                       switch (base64) {
                       | Some(base64) => base64
                       | None =>
                         ConsoleUtils.error(
                           "texture->source should has base64 or blobObjectURL data, but acutally not has",
                           editorState,
                         );

                         ImageUtils.getNullImageSrc();
                       }
                     }
                 )
               )
               fileId=nodeId
               fileType=type_
               fileName=(
                 BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                   textureComponent,
                   engineState,
                 )
               )
               widget=(AssetUtils.getWidget())
               isSelected=(_isSelected(currentNodeData, nodeId))
             />;
           | Material =>
             let baseName =
               MaterialNodeMapAssetLogicService.getMaterialBaseName(
                 nodeId,
                 engineState,
                 editorState
                 |> MaterialNodeMapAssetEditorService.getMaterialNodeMap,
               );

             <FileBox
               key=(DomHelper.getRandomKey())
               store
               dispatchFunc
               dragImg
               effectAllowd="move"
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
               |> WDBNodeMapAssetEditorService.getWDBNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

             <FileBox
               key=(DomHelper.getRandomKey())
               store
               dispatchFunc
               effectAllowd="copyMove"
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

    engineState |> StateEngineService.setState |> ignore;
    editorState |> StateEditorService.setState |> ignore;

    result;
  };

  let buildCurrentTreeNodeChildrenComponent =
      ((store, dispatchFunc), dragImg, debounceTime) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let assetTreeChildrenNodeArr =
      editorState
      |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
      |> TreeAssetEditorService.getSpecificTreeNodeById(
           editorState |> AssetTreeUtils.getTargetTreeNodeId,
         )
      |> OptionService.unsafeGet
      |> (currentParentNode => currentParentNode.children);

    let editorState =
      _buildImageNodeObjectURLIfNoBase64(
        assetTreeChildrenNodeArr,
        editorState,
      );

    let result =
      showSpecificTreeNodeChildren(
        assetTreeChildrenNodeArr,
        (store, dispatchFunc),
        (
          dragImg,
          debounceTime,
          editorState |> CurrentNodeDataAssetEditorService.getCurrentNodeData,
        ),
        (editorState, engineState),
      );

    result;
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