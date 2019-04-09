open NodeAssetType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (Wonderjs.MaterialType.material, int);
  type dataTuple = string;
  type return = unit;

  let setUndoValueToCopiedEngineStateForPromise =
      ((uiState, dispatchFunc), (materialComponent, currentNodeId), value) =>
    CanvasType.convertCanvasToJsObj(
      DomHelper.getElementById("inspector-canvas"),
    )##toDataURL()
    |> WonderBsMost.Most.just
    |> WonderBsMost.Most.flatMap(inspectorCanvasBase64 =>
         Js.Promise.make((~resolve, ~reject) =>
           Image.onload(
             inspectorCanvasBase64,
             loadedImg => {
               let editorState = StateEditorService.getState();

               let imgContext =
                 editorState
                 |> ImgContextImgCanvasEditorService.unsafeGetImgContext
                 |> CanvasType.convertContextToJsObj;

               ImgCanvasUtils.clipInspectorCanvasToCreateSnapshot(
                 imgContext,
                 loadedImg,
               );

               let imgCanvasBase64 =
                 CanvasType.convertCanvasToJsObj(
                   DomHelper.getElementById("img-canvas"),
                 )##toDataURL();

               resolve(. (imgCanvasBase64, editorState));
             },
           )
         )
         |> WonderBsMost.Most.fromPromise
       )
    |> WonderBsMost.Most.tap(((imgCanvasBase64, editorState)) => {
         let {imageDataIndex} =
           editorState
           |> OperateTreeAssetEditorService.unsafeFindNodeById(currentNodeId)
           |> MaterialNodeAssetService.getNodeData;

         editorState
         |> ImageDataMapAssetEditorService.setData(
              imageDataIndex,
              editorState
              |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
              |> (imageData => {...imageData, base64: imgCanvasBase64}),
            )
         |> StateEditorService.setState
         |> ignore;
       })
    |> WonderBsMost.Most.drain
    |> Js.Promise.then_(() => {
         let engineState =
           StateEngineService.unsafeGetState()
           |> StateEngineService.deepCopyForRestore
           |> LightMaterialEngineService.setLightMaterialDiffuseColor(
                value |> Color.convert16HexToRGBArr,
                materialComponent,
              );

         dispatchFunc(
           AppStore.UpdateAction(Update([|UpdateStore.Project|])),
         )
         |> ignore;

         Js.Promise.resolve(engineState);
       });
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);