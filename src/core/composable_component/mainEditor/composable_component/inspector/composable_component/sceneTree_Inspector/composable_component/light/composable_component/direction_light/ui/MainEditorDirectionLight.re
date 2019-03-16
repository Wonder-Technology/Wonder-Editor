open Color;

open ColorType;

let component = ReasonReact.statelessComponent("MainEditorDirectionLight");

module Method = {
  let getColor = (lightComponent, ()) =>
    DirectionLightEngineService.getDirectionLightColor(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (lightComponent, value) =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> DirectionLightEngineService.setDirectionLightColor(_, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let closeColorPick = DirectionLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let blurIntensityEvent =
      ((uiState, dispatchFunc), lightComponent, intensity) =>
    DirectionLightEngineService.getDirectionLightIntensity(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, intensity) ?
      () :
      DirectionLightIntensityBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        lightComponent,
        intensity,
      );

  let changeIntensity = (lightComponent, value) =>
    DirectionLightEngineService.setDirectionLightIntensity(
      value,
      lightComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;
};

let render = ((uiState, dispatchFunc), lightComponent, _self) => {
  let languageType =
    LanguageUtils.getLanguageType(WindowType.window##wonderLanguage);

  <article className="wonder-direction-light">
    <PickColorComponent
      label="Color"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-color-describe",
          languageType,
        )
      }
      getColorFunc={Method.getColor(lightComponent)}
      changeColorFunc={Method.changeColor(lightComponent)}
      closeColorPickFunc={
        Method.closeColorPick((uiState, dispatchFunc), lightComponent)
      }
    />
    <MainEditorFloatInputBaseComponent
      label="Intensity"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-intensity-describe",
          languageType,
        )
      }
      getComponentValueFunc={
        DirectionLightEngineService.getDirectionLightIntensity(lightComponent)
      }
      changeComponentValueFunc={Method.changeIntensity(lightComponent)}
      blurValueFunc={
        Method.blurIntensityEvent((uiState, dispatchFunc), lightComponent)
      }
      dragDropFunc={
        Method.blurIntensityEvent((uiState, dispatchFunc), lightComponent)
      }
    />
  </article>;
};

let make =
    (~uiState: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), lightComponent, self),
};