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
    |> DirectionLightEngineService.setDirectionLightColor
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DirectionLight},
       |]);

  let closeColorPick = DirectionLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;
};

let render = ((store, dispatchFunc), lightComponent, _self) =>
  <article className="wonder-direction-light">
    <PickColorComponent
      label="color : "
      getColorFunc=(Method.getColor(lightComponent))
      changeColorFunc=(Method.changeColor(lightComponent))
      closeColorPickFunc=(
        Method.closeColorPick((store, dispatchFunc), lightComponent)
      )
    />
    <div className="light-intensity">
      <MainEditorDirectionLightIntensity store dispatchFunc lightComponent />
    </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), lightComponent, self),
};