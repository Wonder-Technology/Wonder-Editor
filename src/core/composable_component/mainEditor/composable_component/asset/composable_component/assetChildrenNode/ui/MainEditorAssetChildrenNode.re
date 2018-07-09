open AssetNodeType;
open AssetTreeNodeType;
open CurrentNodeDataType;

module Method = {
  let _isSelected = (currentNodeData, id) =>
    switch (currentNodeData) {
    | None => false
    | Some({currentNodeId, nodeType}) =>
      AssetUtils.isIdEqual(id, currentNodeId)
    };

  let showSpecificTreeNodeChildren =
      (
        (store, dispatchFunc),
        (dragImg, debounceTime, currentNodeData),
        assetState,
        assetTreeNodeChildrenArr,
      ) =>
    assetTreeNodeChildrenArr
    |> Js.Array.map(({id, type_}) =>
         switch (type_) {
         | Folder =>
           let {name}: folderResultType =
             assetState
             |> FolderNodeMapAssetService.unsafeGetFolderNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(id);

           <FolderBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/11.jpg"
             folderId=id
             fileType=type_
             name
             isSelected=(_isSelected(currentNodeData, id))
             flag=(AssetTreeUtils.getFlag())
             debounceTime
             onDrop=(AssetTreeUtils.onDrop(dispatchFunc))
             handleFlag=AssetTreeUtils.handleFlag
             handleRelationError=AssetUtils.isTreeNodeRelationError
           />;
         | Texture =>
           let {textureId} =
             assetState
             |> TextureNodeMapAssetService.unsafeGetTextureNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(id);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc=(
               assetState
               |> ImageBase64MapAssetService.unsafeGetImageBase64Map
               |> WonderCommonlib.SparseMapService.unsafeGet(textureId)
             )
             fileId=id
             fileType=type_
             fileName=(
               BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                 textureId,
               )
               |> StateLogicService.getEngineStateToGetData
             )
             flag=(AssetTreeUtils.getFlag())
             isSelected=(_isSelected(currentNodeData, id))
           />;
         | Json =>
           let {name, jsonResult} =
             assetState
             |> JsonNodeMapAssetService.unsafeGetJsonNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(id);

           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             dragImg
             imgSrc="./public/img/12.jpg"
             fileId=id
             fileType=type_
             fileName=name
             flag=(AssetTreeUtils.getFlag())
             isSelected=(_isSelected(currentNodeData, id))
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