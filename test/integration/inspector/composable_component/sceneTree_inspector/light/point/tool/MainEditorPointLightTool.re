let getColor = material => MainEditorPointLight.Method.getColor(material, ());

let changeColor = (light, color) =>
  MainEditorPointLight.Method.changeColor(light, color);

let closeColorPicker =
    (
      ~light,
      ~color,
      ~dispatchFunc=_ => (),
      ~store=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorPointLight.Method.closeColorPick(
    (store, dispatchFunc),
    light,
    color,
  );

let changeIntensity = (light, value) =>
  MainEditorPointLightUtils.changeIntensity(light, value);

let blurIntensity =
    (
      ~light,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurIntensityEvent(
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

let changeConstant = (light, value) =>
  MainEditorPointLightUtils.changeConstant(light, value);

let blurConstant =
    (
      ~light,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurConstantEvent(
    (store, dispatchFunc),
    light,
    value,
  );

/* let changeConstantAndBlur =
       (
         ~light,
         ~value,
         ~store=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeConstant(light, value);
     blurConstant(~store, ~dispatchFunc, ~light, ~value, ());
   }; */

let changeLinear = (light, value) =>
  MainEditorPointLightUtils.changeLinear(light, value);

let blurLinear =
    (
      ~light,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurLinearEvent(
    (store, dispatchFunc),
    light,
    value,
  );

/* let changeLinearAndBlur =
       (
         ~light,
         ~value,
         ~store=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeLinear(light, value);
     blurLinear(~store, ~dispatchFunc, ~light, ~value, ());
   }; */

let changeQuadratic = (light, value) =>
  MainEditorPointLightUtils.changeQuadratic(light, value);

let blurQuadratic =
    (
      ~light,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurQuadraticEvent(
    (store, dispatchFunc),
    light,
    value,
  );

/* let changeQuadraticAndBlur =
       (
         ~light,
         ~value,
         ~store=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeQuadratic(light, value);
     blurQuadratic(~store, ~dispatchFunc, ~light, ~value, ());
   }; */

let changeRange = (light, value) =>
  MainEditorPointLightUtils.changeRange(light, value);

let blurRange =
    (
      ~light,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorPointLightUtils.blurRangeEvent(
    (store, dispatchFunc),
    light,
    value,
  );

/* let changeRangeAndBlur =
       (
         ~light,
         ~value,
         ~store=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(),
         (),
       ) => {
     changeRange(light, value);
     blurRange(~store, ~dispatchFunc, ~light, ~value, ());
   }; */