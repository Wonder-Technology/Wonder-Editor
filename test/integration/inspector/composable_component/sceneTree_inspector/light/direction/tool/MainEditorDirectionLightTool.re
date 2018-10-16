let getColor = material =>
  MainEditorDirectionLight.Method.getColor(material, ());

let changeColor = (light, color) =>
  MainEditorDirectionLight.Method.changeColor(light, color);

let closeColorPicker =
    (
      ~light,
      ~color,
      ~dispatchFunc=_ => (),
      ~store=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorDirectionLight.Method.closeColorPick(
    (store, dispatchFunc),
    light,
    color,
  );

let changeIntensity = (light, intensity) =>
  MainEditorDirectionLight.Method.changeIntensity(light, intensity);

let blurIntensity =
    (
      ~light,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorDirectionLight.Method.blurIntensityEvent(
    (store, dispatchFunc),
    light,
    value,
  );

let changeIntensityAndBlur =
    (
      ~light,
      ~sourceValue,
      ~targetValue,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeIntensity(light, targetValue);
  blurIntensity(~store, ~dispatchFunc, ~light, ~value=sourceValue, ());
};