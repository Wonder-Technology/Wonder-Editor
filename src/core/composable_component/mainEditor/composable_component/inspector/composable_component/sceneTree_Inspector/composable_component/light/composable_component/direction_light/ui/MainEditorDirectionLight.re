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

  let blurIntensityEvent = ((store, dispatchFunc), lightComponent, intensity) =>
    DirectionLightEngineService.getDirectionLightIntensity(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, intensity) ?
      () :
      DirectionLightIntensityBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        intensity,
      );

  let changeIntensity = (lightComponent, value) =>
    DirectionLightEngineService.setDirectionLightIntensity(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;
};

let render = ((store, dispatchFunc), lightComponent, _self) =>
  <article className="wonder-direction-light">
    <PickColorComponent
      label="color"
      getColorFunc=(Method.getColor(lightComponent))
      changeColorFunc=(Method.changeColor(lightComponent))
      closeColorPickFunc=(
        Method.closeColorPick((store, dispatchFunc), lightComponent)
      )
    />
    <div className="light-intensity">
        <MainEditorFloatInputBaseComponent
          label="Intensity"
          getComponentValueFunc=(
            DirectionLightEngineService.getDirectionLightIntensity(
              lightComponent,
            )
          )
          changeComponentValueFunc=(Method.changeIntensity(lightComponent))
          blurValueFunc=(
            Method.blurIntensityEvent((store, dispatchFunc), lightComponent)
          )
        />
      </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), lightComponent, self),
};