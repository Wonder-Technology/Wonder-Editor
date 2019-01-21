open MainEditorLightType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (lightType, lightType);
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), (), (sourceLightType, targetLightType)) =>
    MainEditorLightUtils.replaceLightByType(sourceLightType, targetLightType);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);