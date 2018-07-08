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
             attributeTuple=(
               dragImg,
               "./public/img/11.jpg",
               id,
               type_,
               name,
               _isSelected(currentNodeData, id),
               AssetTreeUtils.getFlag(),
               debounceTime,
             )
             funcTuple=(
               AssetTreeUtils.onDrop(dispatchFunc),
               AssetTreeUtils.handleFlag,
               AssetUtils.isTreeNodeRelationError,
             )
           />;
         | Texture =>
           let {textureId} =
             assetState
             |> TextureNodeMapAssetService.unsafeGetTextureNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(id);

           /* TODO move attributeTuple out to be label */
           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             attributeTuple=(
               dragImg,
               assetState
               |> ImageBase64MapAssetService.unsafeGetImageBase64Map
               |> WonderCommonlib.SparseMapService.unsafeGet(textureId),
               id,
               type_,
               BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                 textureId,
               )
               |> StateLogicService.getEngineStateToGetData,
               AssetTreeUtils.getFlag(),
               _isSelected(currentNodeData, id),
             )
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
             attributeTuple=(
               dragImg,
               "./public/img/12.jpg",
               id,
               type_,
               name,
               AssetTreeUtils.getFlag(),
               _isSelected(currentNodeData, id),
             )
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