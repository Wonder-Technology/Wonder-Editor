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
      <MainEditorLightBaseComponent
        label="Intensity"
        getComponentValueFunc=(
          PointLightEngineService.getPointLightIntensity(lightComponent)
        )
        changeComponentValueFunc=(
          MainEditorPointLightUtils.changeIntensity(lightComponent)
        )
        blurValueFunc=(
          MainEditorPointLightUtils.blurIntensityEvent(
            (store, dispatchFunc),
            lightComponent,
          )
        )
      />
    </div>
    <div className="light-constant">
      <MainEditorLightBaseComponent
        label="Constant"
        getComponentValueFunc=(
          PointLightEngineService.getPointLightConstant(lightComponent)
        )
        changeComponentValueFunc=(
          MainEditorPointLightUtils.changeConstant(lightComponent)
        )
        blurValueFunc=(
          MainEditorPointLightUtils.blurConstantEvent(
            (store, dispatchFunc),
            lightComponent,
          )
        )
      />
    </div>
    <div className="light-linear">
      <MainEditorLightBaseComponent
        label="Linear"
        getComponentValueFunc=(
          PointLightEngineService.getPointLightLinear(lightComponent)
        )
        changeComponentValueFunc=(
          MainEditorPointLightUtils.changeLinear(lightComponent)
        )
        blurValueFunc=(
          MainEditorPointLightUtils.blurLinearEvent(
            (store, dispatchFunc),
            lightComponent,
          )
        )
      />
    </div>
    <div className="light-quadratic">
      <MainEditorLightBaseComponent
        label="Quadratic"
        getComponentValueFunc=(
          PointLightEngineService.getPointLightQuadratic(lightComponent)
        )
        changeComponentValueFunc=(
          MainEditorPointLightUtils.changeQuadratic(lightComponent)
        )
        blurValueFunc=(
          MainEditorPointLightUtils.blurQuadraticEvent(
            (store, dispatchFunc),
            lightComponent,
          )
        )
      />
    </div>
    <div className="light-range">
      <MainEditorLightBaseComponent
        label="Range"
        getComponentValueFunc=(
          PointLightEngineService.getPointLightRange(lightComponent)
        )
        changeComponentValueFunc=(
          MainEditorPointLightUtils.changeRange(lightComponent)
        )
        blurValueFunc=(
          MainEditorPointLightUtils.blurRangeEvent(
            (store, dispatchFunc),
            lightComponent,
          )
        )
      />
    </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), lightComponent, self),
};