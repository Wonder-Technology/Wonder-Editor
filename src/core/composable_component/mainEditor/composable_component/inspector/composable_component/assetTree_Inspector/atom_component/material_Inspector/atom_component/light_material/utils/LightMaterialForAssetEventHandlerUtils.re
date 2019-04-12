open Js.Promise;

let createImgCanvasSnapshotAfterUpdateInspector =
    (currentNodeId, dispatchFunc) =>
  make((~resolve, ~reject) =>
    resolve(.
      dispatchFunc(
        AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
      ),
    )
  )
  |> then_(_ => {
       StateEditorService.getState()
       |> ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMap(
            DomHelper.getElementById("inspector-canvas"),
            DomHelper.getElementById("img-canvas"),
            currentNodeId,
          )
       |> StateEditorService.setState;

       dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
       |> ignore;

       Js.Promise.resolve();
     });