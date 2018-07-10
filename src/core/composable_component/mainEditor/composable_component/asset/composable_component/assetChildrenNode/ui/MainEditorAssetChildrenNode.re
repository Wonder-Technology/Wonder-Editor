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
        assetState,
        assetTreeNodeChildrenArr,
      ) =>
    assetTreeNodeChildrenArr
    |> Js.Array.map(({id as nodeId, type_}) =>
         switch (type_) {
         | Folder =>
           let {name}: folderResultType =
             assetState
             |> FolderNodeMapAssetService.getFolderNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FolderBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/11.jpg"
             folderId=nodeId
             fileType=type_
             name
             isSelected=(_isSelected(currentNodeData, nodeId))
             flag=(AssetUtils.getFlag())
             debounceTime
             onDrop=(AssetTreeUtils.onDrop(dispatchFunc))
             isFlag=AssetUtils.isFlag
             handleRelationError=AssetUtils.isTreeNodeRelationError
           />;
         | Texture =>
           let {textureIndex} =
             assetState
             |> TextureNodeMapAssetService.getTextureNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc=(
               assetState
               |> ImageBase64MapAssetService.getImageBase64Map
               |> WonderCommonlib.SparseMapService.unsafeGet(textureIndex)
             )
             fileId=nodeId
             fileType=type_
             fileName=(
               BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                 textureIndex,
               )
               |> StateLogicService.getEngineStateToGetData
             )
             flag=(AssetUtils.getFlag())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         | Json =>
           let {name}: jsonResultType =
             assetState
             |> JsonNodeMapAssetService.getJsonNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/12.jpg"
             fileId=nodeId
             fileType=type_
             fileName=name
             flag=(AssetUtils.getFlag())
             isSelected=(_isSelected(currentNodeData, nodeId))
           />;
         | _ =>
           WonderLog.Log.fatal(
             WonderLog.Log.buildFatalMessage(
               ~title="showSpecificTreeNodeChildren",
               ~description={j|unknown type_: $type_|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
           )
         }
       );

  let buildContent = ((store, dispatchFunc), dragImg, debounceTime) => {
    let assetState = StateAssetService.getState();

    assetState
    |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
    |> AssetUtils.getSpecificTreeNodeById(
         assetState |> AssetUtils.getTargetTreeNodeId,
       )
    |> OptionService.unsafeGet
    |> (currentParentNode => currentParentNode.children)
    |> showSpecificTreeNodeChildren(
         (store, dispatchFunc),
         (
           dragImg,
           debounceTime,
           assetState |> CurrentNodeDataAssetService.getCurrentNodeData,
         ),
         assetState,
       );
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = ((store, dispatchFunc), dragImg, debounceTime, _self) =>
  <article key="assetChildrenNode" className="wonder-asset-assetChildren">
    (
      ReasonReact.arrayToElement(
        Method.buildContent((store, dispatchFunc), dragImg, debounceTime),
      )
    )
  </article>;

let make = (~store, ~dispatchFunc, ~dragImg, ~debounceTime, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, debounceTime, self),
};