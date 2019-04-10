open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = Wonderjs.MaterialType.material;
  type return = Js.Promise.t(unit);

  let handleSelfLogic =
      ((uiState, dispatchFunc), currentNodeId, materialComponent) => {
    StateEngineService.unsafeGetState()
    |> OperateTextureLogicService.handleLightMaterialComponentFromHasDiffuseMapToNoMap(
         materialComponent,
       )
    |> StateEngineService.setState
    |> ignore;

    LightMaterialForAssetEventHandlerUtils.createImgCanvasSnapshotAfterUpdateInspector(
      currentNodeId,
      dispatchFunc,
    );
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);