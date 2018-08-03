open MainEditorLightType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (lightType, lightType);

  let handleSelfLogic =
      ((store, dispatchFunc), (), (sourceLightType, targetLightType)) =>
    MainEditorLightUtils.replaceLightByType(sourceLightType, targetLightType);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);