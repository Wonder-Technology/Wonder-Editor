open MainEditorLightType;

let getIntensityDomIndex = () => 1;

let getConstantDomIndex = () => 2;

let getLinearDomIndex = () => 3;

let getQuadraticDomIndex = () => 4;

let getRangeDomIndex = () => 5;

let _getFromArray = (array, index) => ArrayService.(getNth(index, array));

let trigerChangeLightTypeEvent = (value, domChildren) => {
  let selectDiv = _getFromArray(domChildren, 0);
  let selectArticle = _getFromArray(selectDiv##children, 0);
  let select = _getFromArray(selectArticle##children, 1);
  BaseEventTool.triggerChangeEvent(
    select,
    BaseEventTool.buildFormEvent(value |> string_of_int),
  );
};

let setLightTypeToBeDirectionLight = () => {
  let component = BuildComponentTool.buildLight();

  let lightType = DirectionLight |> convertLightTypeToInt;

  BaseEventTool.triggerComponentEvent(
    component,
    trigerChangeLightTypeEvent(lightType),
  );
};
let setLightTypeToBePointLight = () => {
  let component = BuildComponentTool.buildLight();

  let lightType = PointLight |> convertLightTypeToInt;

  BaseEventTool.triggerComponentEvent(
    component,
    trigerChangeLightTypeEvent(lightType),
  );
};

let _getComponentInputByIndex = (index, domChildren) => {
  let div = _getFromArray(domChildren, index);
  let article = _getFromArray(div##children, 0);
  let inputArticle = _getFromArray(article##children, 0);
  let input =
    WonderCommonlib.ArrayService.unsafeGet(inputArticle##children, 1);

  input;
};

let triggerLightComponentChangeEvent = (index, value, domChildren) => {
  let input = _getComponentInputByIndex(index, domChildren);

  BaseEventTool.triggerChangeEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};

let triggerLightComponentBlurEvent = (index, value, domChildren) => {
  let input = _getComponentInputByIndex(index, domChildren);

  BaseEventTool.triggerBlurEvent(
    input,
    BaseEventTool.buildFormEvent(value |> string_of_float),
  );
};