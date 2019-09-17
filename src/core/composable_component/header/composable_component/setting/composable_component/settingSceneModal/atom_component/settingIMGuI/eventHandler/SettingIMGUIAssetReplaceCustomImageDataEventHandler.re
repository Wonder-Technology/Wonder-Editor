open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (WonderImgui.ExtendType.customImageId, TreeAssetType.tree);
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), (oldId, node)) => {
    let imageData =
      BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
        TextureNodeAssetService.getImageDataIndex(node),
      )
      |> StateLogicService.getEditorState;

    StateEngineService.unsafeGetState()
    |> AssetIMGUIEngineService.removeSettedAssetCustomImageData(oldId)
    |> AssetIMGUIEngineService.addSettedAssetCustomImageData((
         imageData |> ImageDataAssetService.getArrayBuffer,
         IMGUICustomImageTypeTextureNodeAssetEditorService.getIdByNode(node)
         |> StateLogicService.getEditorState
         |> OptionService.unsafeGet,
         imageData |> ImageDataAssetService.getMimeType,
       ))
    |> StateLogicService.renderWhenStop
    |> StateEngineService.setState
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);