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

  let buildColorPickComponent =
      ((uiState, dispatchFunc), lightComponent, languageType) =>
    <PickColorComponent
      label="Color"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-color-describe",
          languageType,
        )
      }
      getColorFunc={getColor(lightComponent)}
      changeColorFunc={changeColor(lightComponent)}
      closeColorPickFunc={
        closeColorPick((uiState, dispatchFunc), lightComponent)
      }
    />;

  let buildIntensityComponent =
      ((uiState, dispatchFunc), lightComponent, languageType) =>
    <MainEditorFloatInputBaseComponent
      label="Intensity"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-intensity-describe",
          languageType,
        )
      }
      defaultValue={
        PointLightEngineService.getPointLightIntensity(lightComponent)
        |> StateLogicService.getEngineStateToGetData
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

  let buildConstantComponent =
      ((uiState, dispatchFunc), lightComponent, languageType) =>
    <MainEditorFloatInputBaseComponent
      label="Constant"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-constant-describe",
          languageType,
        )
      }
      defaultValue={
        PointLightEngineService.getPointLightConstant(lightComponent)
        |> StateLogicService.getEngineStateToGetData
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

  let buildLinearComponent =
      ((uiState, dispatchFunc), lightComponent, languageType) =>
    <MainEditorFloatInputBaseComponent
      label="Linear"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-linear-describe",
          languageType,
        )
      }
      defaultValue={
        PointLightEngineService.getPointLightLinear(lightComponent)
        |> StateLogicService.getEngineStateToGetData
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

  let buildQuadraticComponent =
      ((uiState, dispatchFunc), lightComponent, languageType) =>
    <MainEditorFloatInputBaseComponent
      label="Quadratic"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-quadratic-describe",
          languageType,
        )
      }
      defaultValue={
        PointLightEngineService.getPointLightQuadratic(lightComponent)
        |> StateLogicService.getEngineStateToGetData
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

  let buildRangeComponent =
      ((uiState, dispatchFunc), lightComponent, languageType) =>
    <MainEditorFloatInputBaseComponent
      label="Range"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-range-describe",
          languageType,
        )
      }
      defaultValue={
        PointLightEngineService.getPointLightRange(lightComponent)
        |> StateLogicService.getEngineStateToGetData
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

let render = ((uiState, dispatchFunc), lightComponent, _self) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="wonder-point-light">
    {
      Method.buildColorPickComponent(
        (uiState, dispatchFunc),
        lightComponent,
        languageType,
      )
    }
    {
      Method.buildIntensityComponent(
        (uiState, dispatchFunc),
        lightComponent,
        languageType,
      )
    }
    {
      Method.buildConstantComponent(
        (uiState, dispatchFunc),
        lightComponent,
        languageType,
      )
    }
    {
      Method.buildLinearComponent(
        (uiState, dispatchFunc),
        lightComponent,
        languageType,
      )
    }
    {
      Method.buildQuadraticComponent(
        (uiState, dispatchFunc),
        lightComponent,
        languageType,
      )
    }
    {
      Method.buildRangeComponent(
        (uiState, dispatchFunc),
        lightComponent,
        languageType,
      )
    }
  </article>;
};

let make =
    (~uiState: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), lightComponent, self),
};