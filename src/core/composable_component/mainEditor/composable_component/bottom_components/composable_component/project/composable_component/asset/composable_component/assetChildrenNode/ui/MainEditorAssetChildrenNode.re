open NodeAssetType;

open ImageDataType;

module Method = {
  let _isSelected = (currentNodeId, nodeId) =>
    currentNodeId
    |> OptionService.andThenWithDefault(
         currentNodeId => NodeAssetService.isIdEqual(nodeId, currentNodeId),
         false,
       );

  let _build = (imageDataIndex, editorState) => {
    let {base64, uint8Array, blobObjectURL, mimeType} as data =
      ImageDataMapAssetEditorService.unsafeGetData(
        imageDataIndex,
        editorState,
      );

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
    TextureNodeAssetEditorService.findAllTextureNodes(editorState)
    |> Js.Array.map(textureNode =>
         TextureNodeAssetService.getNodeData(textureNode).imageDataIndex
       )
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. editorState, imageDataIndex) =>
           editorState
           |> Result.SameDataResult.either(_build(imageDataIndex)),
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

    let scriptEventFunctionAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(node =>
           node
           |> ScriptEventFunctionNodeAssetService.isScriptEventFunctionNode
         );

    let scriptAttributeAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(node =>
           node |> ScriptAttributeNodeAssetService.isScriptAttributeNode
         );

    let textureAssetTreeChildrenNodeArr =
      assetTreeChildrenNodeArr
      |> Js.Array.filter(node => node |> TextureNodeAssetService.isTextureNode);

    ArrayService.fastConcatArrays([|
      _sortByName(folderAssetTreeChildrenNodeArr, engineState),
      _sortByName(wdbAssetTreeChildrenNodeArr, engineState),
      _sortByName(materialAssetTreeChildrenNodeArr, engineState),
      _sortByName(scriptEventFunctionAssetTreeChildrenNodeArr, engineState),
      _sortByName(scriptAttributeAssetTreeChildrenNodeArr, engineState),
      _sortByName(textureAssetTreeChildrenNodeArr, engineState),
    |]);
  };

  let showSpecificTreeNodeChildren =
      (
        (uiState, dispatchFunc),
        (dragImg, debounceTime, currentNodeId),
        engineState,
        editorState,
      ) => {
    let widget = AssetWidgetService.getWidget();

    let result =
      editorState
      |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree
      |> FolderNodeAssetService.getChildrenNodes
      |> sortAssetTreeChildrenNode(_, engineState)
      |> ArrayService.traverseSameDataResultAndCollectByApply(node => {
           let nodeId = NodeAssetService.getNodeId(~node);
           let key = StringService.intToString(nodeId);
           let isSelected = _isSelected(currentNodeId, nodeId);

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

                 ImageDataMapUtils.getImgSrc(imageDataIndex, editorState)
                 |> Result.SameDataResult.either(imgSrc =>
                      <FileBox
                        key
                        uiState
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
                   uiState
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
             ~scriptEventFunctionNodeFunc=
               (nodeId, {name}) =>
                 <FileBox
                   key
                   uiState
                   dispatchFunc
                   dragImg
                   effectAllowd="move"
                   imgSrc="./public/img/scriptEventFunction.png"
                   nodeId
                   fileName=name
                   widget
                   isSelected
                 />
                 |> Result.SameDataResult.success,
             ~scriptAttributeNodeFunc=
               (nodeId, {name}) =>
                 <FileBox
                   key
                   uiState
                   dispatchFunc
                   dragImg
                   effectAllowd="move"
                   imgSrc="./public/img/scriptAttribute.png"
                   nodeId
                   fileName=name
                   widget
                   isSelected
                 />
                 |> Result.SameDataResult.success,
             ~wdbNodeFunc=
               (nodeId, nodeData) => {
                 let fileName = WDBNodeAssetService.getNodeName(nodeData);

                 <FileBox
                   key
                   uiState
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
                   uiState
                   dispatchFunc
                   dragImg
                   effectAllowd="move"
                   imgSrc="./public/img/assetPackage.png"
                   folderId=nodeId
                   name
                   isSelected
                   widget
                   debounceTime
                   onDrop={
                     AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
                       (uiState, dispatchFunc),
                       (),
                     )
                   }
                   isWidget=AssetWidgetService.isWidget
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

  let buildCurrentTreeNodeChildrenComponent =
      ((uiState, dispatchFunc), dragImg, debounceTime) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    editorState
    |> _buildImageDataObjectURLIfNoBase64
    |> Result.SameDataResult.either(
         showSpecificTreeNodeChildren(
           (uiState, dispatchFunc),
           (
             dragImg,
             debounceTime,
             editorState |> CurrentNodeIdAssetEditorService.getCurrentNodeId,
           ),
           engineState,
         ),
       )
    |> ResultUtils.handleError;
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = ((uiState, dispatchFunc), dragImg, debounceTime, _self) =>
  <article key="assetChildrenNode" className="wonder-asset-assetChildren">
    {
      ReasonReact.array(
        Method.buildCurrentTreeNodeChildrenComponent(
          (uiState, dispatchFunc),
          dragImg,
          debounceTime,
        ),
      )
    }
  </article>;

let make = (~uiState, ~dispatchFunc, ~dragImg, ~debounceTime, _children) => {
  ...component,
  render: self =>
    render((uiState, dispatchFunc), dragImg, debounceTime, self),
};