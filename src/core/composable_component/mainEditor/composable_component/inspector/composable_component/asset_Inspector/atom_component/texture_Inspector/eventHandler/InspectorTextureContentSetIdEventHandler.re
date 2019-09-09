module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (
    NodeAssetType.nodeId,
    NodeAssetType.textureContentIndex,
    WonderImgui.ExtendType.customImageId,
  );
  type return = unit;

  let _updateEngineDataByCustomImageId =
      (nodeId, oldCustomImageId, newCustomImageId, editorState, engineState) =>
    AssetIMGUIEngineService.hasSettedAssetCustomImageData(
      oldCustomImageId,
      engineState,
    ) ?
      {
        let imageData =
          BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(
            TextureNodeAssetEditorService.getImageDataIndex(
              nodeId,
              editorState,
            ),
            editorState,
          );

        AssetIMGUIEngineService.removeSettedAssetCustomImageData(
          oldCustomImageId,
          engineState,
        )
        |> AssetIMGUIEngineService.addSettedAssetCustomImageData((
             imageData
             |> ImageDataAssetService.getUint8Array(_, () =>
                  WonderLog.Log.fatal(
                    WonderLog.Log.buildFatalMessage(
                      ~title="_updateEngineDataByCustomImageId",
                      ~description=
                        {j|image should has uint8Array or base64 data|j},
                      ~reason="",
                      ~solution={j||j},
                      ~params={j||j},
                    ),
                  )
                )
             |> Js.Typed_array.Uint8Array.buffer,
             newCustomImageId,
             ImageDataAssetService.getMimeType(imageData),
           ))
        |> StateLogicService.renderEngineStateAndReturnEngineState;
      } :
      engineState;

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (),
        (nodeId, textureContentIndex, newCustomImageId),
      ) => {
    let (editorState, engineState) = StateLogicService.getState();

    let (editorState, engineState) =
      IMGUICustomImageTypeTextureNodeAssetEditorService.hasId(
        newCustomImageId,
        editorState,
      ) ?
        {
          ConsoleUtils.warn(
            LanguageUtils.getMessageLanguageDataByType(
              "texture-inspector-customImageId-exist",
              LanguageEditorService.unsafeGetType(editorState),
            ),
            editorState,
          )
          |> ignore;

          (editorState, engineState);
        } :
        {
          let engineState =
            _updateEngineDataByCustomImageId(
              nodeId,
              editorState
              |> IMGUICustomImageTextureContentMapAssetEditorService.unsafeGetId(
                   textureContentIndex,
                 ),
              newCustomImageId,
              editorState,
              engineState,
            );

          let editorState =
            editorState
            |> IMGUICustomImageTextureContentMapAssetEditorService.setId(
                 textureContentIndex,
                 newCustomImageId,
               );

          (editorState, engineState);
        };

    (editorState, engineState) |> StateLogicService.setState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);