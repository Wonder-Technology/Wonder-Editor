open MainEditorLightType;

let changeLightType =
    (
      ~sourceLightType,
      ~targetLightType,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLight.Method.changeLight(
    (store, dispatchFunc),
    (),
    (sourceLightType, targetLightType),
  );

let setLightTypeToBeDirectionLight = () =>
  changeLightType(
    ~sourceLightType=PointLight,
    ~targetLightType=DirectionLight,
    (),
  );

let setLightTypeToBePointLight = () =>
  changeLightType(
    ~sourceLightType=DirectionLight,
    ~targetLightType=PointLight,
    (),
  );