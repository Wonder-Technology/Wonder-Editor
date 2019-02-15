let getColor = material => MainEditorPointLight.Method.getColor(material, ());

let changeColor = (light, color) =>
  MainEditorPointLight.Method.changeColor(light, color);

let closeColorPicker =
    (
      ~light,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorPointLight.Method.closeColorPick(
    (uiState, dispatchFunc),
    light,
    color,
  );

let changeIntensity = (light, value) =>
  MainEditorPointLightUtils.changeIntensity(light, value);

let blurIntensity =
    (
      ~light,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurIntensityEvent(
    (uiState, dispatchFunc),
    light,
    value,
  );

let changeIntensityAndBlur =
    (
      ~light,
      ~sourceValue,
      ~targetValue,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeIntensity(light, targetValue);
  blurIntensity(~uiState, ~dispatchFunc, ~light, ~value=sourceValue, ());
};

let changeConstant = (light, value) =>
  MainEditorPointLightUtils.changeConstant(light, value);

let blurConstant =
    (
      ~light,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurConstantEvent(
    (uiState, dispatchFunc),
    light,
    value,
  );

/* let changeConstantAndBlur =
       (
         ~light,
         ~sourceValue,
         ~targetValue,
         ~uiState=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeConstant(light, targetValue);
     blurConstant(~uiState, ~dispatchFunc, ~light, ~value=sourceValue, ());
   }; */

let changeLinear = (light, value) =>
  MainEditorPointLightUtils.changeLinear(light, value);

let blurLinear =
    (
      ~light,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurLinearEvent(
    (uiState, dispatchFunc),
    light,
    value,
  );

/* let changeLinearAndBlur =
       (
         ~light,
         ~sourceValue,
         ~targetValue,
         ~uiState=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeLinear(light, targetValue);
     blurLinear(~uiState, ~dispatchFunc, ~light, ~value=sourceValue, ());
   }; */

let changeQuadratic = (light, value) =>
  MainEditorPointLightUtils.changeQuadratic(light, value);

let blurQuadratic =
    (
      ~light,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurQuadraticEvent(
    (uiState, dispatchFunc),
    light,
    value,
  );

/* let changeQuadraticAndBlur =
       (
         ~light,
         ~sourceValue,
         ~targetValue,
         ~uiState=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeQuadratic(light, targetValue);
     blurQuadratic(~uiState, ~dispatchFunc, ~light, ~value=sourceValue, ());
   }; */

let changeRange = (light, value) =>
  MainEditorPointLightUtils.changeRange(light, value);

let blurRange =
    (
      ~light,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurRangeEvent(
    (uiState, dispatchFunc),
    light,
    value,
  );

/* let changeRangeAndBlur =
       (
         ~light,
         ~sourceValue,
         ~targetValue,
         ~uiState=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeRange(light, targetValue);
     blurRange(~uiState, ~dispatchFunc, ~light, ~value=sourceValue, ());
   }; */

let createPointLight = (editorState, engineState) => {
  let (editorState, (engineState, obj)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, light) = PointLightEngineService.create(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("Point Light", obj);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addPointLight(obj, light);

  (editorState, engineState, obj);
};