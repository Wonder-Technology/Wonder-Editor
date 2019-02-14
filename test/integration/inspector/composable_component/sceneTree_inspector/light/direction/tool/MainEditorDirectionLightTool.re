let getColor = material =>
  MainEditorDirectionLight.Method.getColor(material, ());

let changeColor = (light, color) =>
  MainEditorDirectionLight.Method.changeColor(light, color);

let closeColorPicker =
    (
      ~light,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorDirectionLight.Method.closeColorPick(
    (uiState, dispatchFunc),
    light,
    color,
  );

let changeIntensity = (light, intensity) =>
  MainEditorDirectionLight.Method.changeIntensity(light, intensity);

let blurIntensity =
    (
      ~light,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorDirectionLight.Method.blurIntensityEvent(
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