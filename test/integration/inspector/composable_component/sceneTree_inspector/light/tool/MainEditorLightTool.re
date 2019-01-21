open MainEditorLightType;

let changeLightType =
    (
      ~sourceLightType,
      ~targetLightType,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLight.Method.changeLight(
    (uiState, dispatchFunc),
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