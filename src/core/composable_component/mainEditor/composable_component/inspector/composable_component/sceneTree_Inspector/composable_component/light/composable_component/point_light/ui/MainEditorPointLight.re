open Color;

open ColorType;

let component = ReasonReact.statelessComponent("MainEditorPointLight");

module Method = {
  let getColor = (lightComponent, ()) =>
    PointLightEngineService.getPointLightColor(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (lightComponent, value) =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> PointLightEngineService.setPointLightColor(_, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let closeColorPick = PointLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let buildColorPickComponent = ((uiState, dispatchFunc), lightComponent) =>
    <PickColorComponent
      label="Color"
      title="color"
      getColorFunc={getColor(lightComponent)}
      changeColorFunc={changeColor(lightComponent)}
      closeColorPickFunc={
        closeColorPick((uiState, dispatchFunc), lightComponent)
      }
    />;

  let buildIntensityComponent = ((uiState, dispatchFunc), lightComponent) =>
    <MainEditorFloatInputBaseComponent
      label="Intensity"
      getComponentValueFunc={
        PointLightEngineService.getPointLightIntensity(lightComponent)
      }
      changeComponentValueFunc={
        MainEditorPointLightUtils.changeIntensity(lightComponent)
      }
      blurValueFunc={
        MainEditorPointLightUtils.blurIntensityEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
      dragDropFunc={
        MainEditorPointLightUtils.blurIntensityEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
    />;

  let buildConstantComponent = ((uiState, dispatchFunc), lightComponent) =>
    <MainEditorFloatInputBaseComponent
      label="Constant"
      getComponentValueFunc={
        PointLightEngineService.getPointLightConstant(lightComponent)
      }
      changeComponentValueFunc={
        MainEditorPointLightUtils.changeConstant(lightComponent)
      }
      blurValueFunc={
        MainEditorPointLightUtils.blurConstantEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
      dragDropFunc={
        MainEditorPointLightUtils.blurConstantEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
    />;

  let buildLinearComponent = ((uiState, dispatchFunc), lightComponent) =>
    <MainEditorFloatInputBaseComponent
      label="Linear"
      getComponentValueFunc={
        PointLightEngineService.getPointLightLinear(lightComponent)
      }
      changeComponentValueFunc={
        MainEditorPointLightUtils.changeLinear(lightComponent)
      }
      blurValueFunc={
        MainEditorPointLightUtils.blurLinearEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
      dragDropFunc={
        MainEditorPointLightUtils.blurLinearEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
    />;

  let buildQuadraticComponent = ((uiState, dispatchFunc), lightComponent) =>
    <MainEditorFloatInputBaseComponent
      label="Quadratic"
      getComponentValueFunc={
        PointLightEngineService.getPointLightQuadratic(lightComponent)
      }
      changeComponentValueFunc={
        MainEditorPointLightUtils.changeQuadratic(lightComponent)
      }
      blurValueFunc={
        MainEditorPointLightUtils.blurQuadraticEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
      dragDropFunc={
        MainEditorPointLightUtils.blurQuadraticEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
    />;

  let buildRangeComponent = ((uiState, dispatchFunc), lightComponent) =>
    <MainEditorFloatInputBaseComponent
      label="Range"
      getComponentValueFunc={
        PointLightEngineService.getPointLightRange(lightComponent)
      }
      changeComponentValueFunc={
        MainEditorPointLightUtils.changeRange(lightComponent)
      }
      blurValueFunc={
        MainEditorPointLightUtils.blurRangeEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
      dragDropFunc={
        MainEditorPointLightUtils.blurRangeEvent(
          (uiState, dispatchFunc),
          lightComponent,
        )
      }
    />;
};

let render = ((uiState, dispatchFunc), lightComponent, _self) =>
  <article className="wonder-point-light">
    {Method.buildColorPickComponent((uiState, dispatchFunc), lightComponent)}
    {Method.buildIntensityComponent((uiState, dispatchFunc), lightComponent)}
    {Method.buildConstantComponent((uiState, dispatchFunc), lightComponent)}
    {Method.buildLinearComponent((uiState, dispatchFunc), lightComponent)}
    {Method.buildQuadraticComponent((uiState, dispatchFunc), lightComponent)}
    {Method.buildRangeComponent((uiState, dispatchFunc), lightComponent)}
  </article>;

let make =
    (~uiState: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), lightComponent, self),
};