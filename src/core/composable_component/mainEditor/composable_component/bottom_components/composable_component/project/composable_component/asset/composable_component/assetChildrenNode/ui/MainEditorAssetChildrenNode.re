open NodeAssetType;

open ImageDataType;

module Method = {
  let _isSelected = (currentNode, nodeId) =>
    currentNode
    |> OptionService.andThenWithDefault(
         currentNode =>
           NodeAssetService.isIdEqual(
             nodeId,
             NodeAssetService.getNodeId(~node=currentNode),
           ),
         false,
       );

  let _build = (imageDataIndex, editorState) => {
    let {base64, uint8Array, blobObjectURL, mimeType} as data =
      ImageDataMapAssetEditorService.unsafeGetData(
        imageDataIndex,
        editorState,
      );

    /* switch (blobObjectURL) {
       | Some(_) => editorState |> Result.SameDataResult.success
       | None =>
         switch (base64) {
         | Some(_) => editorState |> Result.SameDataResult.success
         | None =>
           switch (uint8Array) {
           | None =>
             ("image->uint8Array should exist", editorState)
             |> Result.SameDataResult.fail
           | Some(uint8Array) =>
             ImageDataMapAssetEditorService.setResult(
               image,
               {
                 ...result,
                 blobObjectURL:
                   Some(
                     Blob.newBlobFromArrayBuffer(uint8Array, mimeType)
                     |> Blob.createObjectURL,
                   ),
               },
               editorState,
             )
             |> Result.SameDataResult.success
           }
         }
       }; */

    blobObjectURL
    |> OptionService.either(
         (editorState, _) => editorState |> Result.SameDataResult.success,
         editorState =>
           base64
           |> OptionService.either(
                (editorState, _) =>
                  editorState |> Result.SameDataResult.success,
                editorState =>
                  uint8Array
                  |> OptionService.either(
                       (editorState, _) =>
                         ImageDataMapAssetEditorService.setData(
                           imageDataIndex,
                           {
                             ...data,
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
                         |> Result.SameDataResult.success,
                       editorState =>
                         ("image->uint8Array should exist", editorState)
                         |> Result.SameDataResult.fail,
                       editorState,
                     ),
                editorState,
              ),
         editorState,
       );
  };

  let _buildImageDataObjectURLIfNoBase64 = editorState =>
    OperateTreeAssetEditorService.findAllTextureNodes(editorState)
    |> OptionService.andThenWithDefault(
         textureNodes =>
           textureNodes
           |> List.map(textureNode =>
                TextureNodeAssetService.getNodeData(textureNode).
                  imageDataIndex
              )
           |> List.fold_left(
                (editorState, imageDataIndex) =>
                  editorState
                  |> Result.SameDataResult.either(_build(imageDataIndex)),
                editorState |> Result.SameDataResult.success,
              ),
         editorState |> Result.SameDataResult.success,
       );

  let _sortByName = (assetTreeChildrenNodeArr, engineState) =>
    assetTreeChildrenNodeArr
    |> Js.Array.sortInPlaceWith((node1, node2) =>
         Js.String.localeCompare(
           NodeNameAssetLogicService.getNodeName(node2, engineState)
           |> Js.String.charAt(0),
           NodeNameAssetLogicService.getNodeName(node1, engineState)
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let sortAssetTreeChildrenNode = (assetTreeChildrenNodeArr, engineState) => {
    let folderAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(node => node |> FolderNodeAssetService.isFolderNode);

    let wdbAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(node => node |> WDBNodeAssetService.isWDBNode);

    let materialAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(node =>
           node |> MaterialNodeAssetService.isMaterialNode
         );

    let textureAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(node => node |> TextureNodeAssetService.isTextureNode);

    ArrayService.fastConcatArrays([|
      _sortByName(folderAssetTreeChildrenNodeArr, engineState),
      _sortByName(wdbAssetTreeChildrenNodeArr, engineState),
      _sortByName(materialAssetTreeChildrenNodeArr, engineState),
      _sortByName(textureAssetTreeChildrenNodeArr, engineState),
    |]);
  };

  let _getImgSrc = (imageDataIndex, editorState) =>
    editorState
    |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
    |> (
      ({blobObjectURL, base64, mimeType}: ImageDataType.imageData) =>
        switch (blobObjectURL, base64) {
        | (Some(blobObjectURL), Some(_))
        | (Some(blobObjectURL), None) =>
          blobObjectURL |> Obj.magic |> Result.SameDataResult.success
        | (None, Some(base64)) => base64 |> Result.SameDataResult.success
        | (None, None) =>
          (
            "texture->source should has base64 or blobObjectURL data, but acutally not has",
            ImageUtils.getNullImageSrc(),
          )
          |> Result.SameDataResult.fail
        }
    );

  let showSpecificTreeNodeChildren =
      (
        (store, dispatchFunc),
        (dragImg, debounceTime, currentNode),
        engineState,
        editorState,
      ) => {
    let widget = AssetUtils.getWidget();

    let result =
      editorState
      |> TreeAssetEditorService.getSelectedFolderNodeInAssetTree
      |> FolderNodeAssetService.getChildrenNodes
      |> sortAssetTreeChildrenNode(_, engineState)
      |> ArrayService.traverseSameDataResultAndCollectByApply(node => {
           let nodeId = NodeAssetService.getNodeId(~node);
           let key = StringService.intToString(nodeId);
           let isSelected = _isSelected(currentNode, nodeId);

           NodeAssetService.handleNode(
             ~node,
             ~textureNodeFunc=
               (nodeId, {textureComponent, imageDataIndex}) => {
                 let effectAllowd = "move";
                 let fileName =
                   NodeNameAssetLogicService.getTextureNodeName(
                     ~texture=textureComponent,
                     ~engineState,
                   );

                 _getImgSrc(imageDataIndex, editorState)
                 |> Result.SameDataResult.either(imgSrc =>
                      <FileBox
                        key
                        store
                        dispatchFunc
                        dragImg
                        effectAllowd
                        imgSrc
                        nodeId
                        fileName
                        widget
                        isSelected
                      />
                      |> Result.SameDataResult.success
                    );
               },
             ~materialNodeFunc=
               (nodeId, {materialComponent, type_}) => {
                 let fileName =
                   NodeNameAssetLogicService.getMaterialNodeName(
                     ~material=materialComponent,
                     ~type_,
                     ~engineState,
                   );

                 <FileBox
                   key
                   store
                   dispatchFunc
                   dragImg
                   effectAllowd="move"
                   imgSrc="./public/img/mat.png"
                   nodeId
                   fileName
                   widget
                   isSelected
                 />
                 |> Result.SameDataResult.success;
               },
             ~wdbNodeFunc=
               (nodeId, nodeData) => {
                 let fileName = WDBNodeAssetService.getNodeName(nodeData);

                 <FileBox
                   key
                   store
                   dispatchFunc
                   effectAllowd="copyMove"
                   dragImg
                   imgSrc="./public/img/wdb.png"
                   nodeId
                   fileName
                   widget
                   isSelected
                 />
                 |> Result.SameDataResult.success;
               },
             ~folderNodeFunc=
               (nodeId, nodeData, children) => {
                 let name = FolderNodeAssetService.getNodeName(nodeData);

                 <FolderBox
                   key
                   store
                   dispatchFunc
                   dragImg
                   effectAllowd="move"
                   imgSrc="./public/img/assetPackage.png"
                   folderId=nodeId
                   name
                   isSelected
                   widget
                   debounceTime
                   onDrop=(
                     AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
                       (store, dispatchFunc),
                       (),
                     )
                   )
                   isWidget=AssetUtils.isWidget
                   checkNodeRelation=OperateTreeAssetLogicService.checkNodeRelation
                 />
                 |> Result.SameDataResult.success;
               },
           );
         });

    engineState |> StateEngineService.setState |> ignore;
    editorState |> StateEditorService.setState |> ignore;

    result;
  };

  let _handleError =
      (result: Result.SameDataResult.t(array(ReasonReact.reactElement))) =>
    Result.SameDataResult.handleError(
      result => result,
      (msg, result) => {
        let editorState = StateEditorService.getState();

        ConsoleUtils.error(msg, editorState);

        result;
      },
      result,
    );

  let buildCurrentTreeNodeChildrenComponent =
      ((store, dispatchFunc), dragImg, debounceTime) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    editorState
    |> _buildImageDataObjectURLIfNoBase64
    |> Result.SameDataResult.either(
         showSpecificTreeNodeChildren(
           (store, dispatchFunc),
           (
             dragImg,
             debounceTime,
             editorState |> CurrentNodeAssetEditorService.getCurrentNode,
           ),
           engineState,
         ),
       )
    |> _handleError;
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