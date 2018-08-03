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
    |> PointLightEngineService.setPointLightColor
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: PointLight},
       |]);

  let closeColorPick = PointLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;
};

let render = ((store, dispatchFunc), lightComponent, _self) =>
  <article className="wonder-point-light">
    <PickColorComponent
      label="color : "
      getColorFunc=(Method.getColor(lightComponent))
      changeColorFunc=(Method.changeColor(lightComponent))
      closeColorPickFunc=(
        Method.closeColorPick((store, dispatchFunc), lightComponent)
      )
    />
    <div className="light-intensity">
      <MainEditorPointLightIntensity store dispatchFunc lightComponent />
    </div>
    <div className="light-constant">
      <MainEditorPointLightConstant store dispatchFunc lightComponent />
    </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), lightComponent, self),
};