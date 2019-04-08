open Color;

open ColorType;

module Method = {
  let changeColor = (materialComponent, value) => {
    let colorArray =
      value |> convertColorObjToColorPickType |> getEngineColorRgbArr;

    StateEngineService.unsafeGetState()
    |> LightMaterialEngineService.setLightMaterialDiffuseColor(
         colorArray,
         materialComponent,
       )
    |> StateLogicService.refreshEngineState;
  };

  let changeShininess = (materialComponent, value) =>
    StateEngineService.unsafeGetState()
    |> LightMaterialEngineService.setLightMaterialShininess(
         value,
         materialComponent,
       )
    |> StateLogicService.refreshEngineState;

  let closeLightMaterialColorPick = LightMaterialCloseColorPickForGameObjectEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let blurShininessEvent =
      ((uiState, dispatchFunc), materialComponent, shininessValue) =>
    LightMaterialEngineService.getLightMaterialShininess(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, shininessValue) ?
      () :
      LightMaterialShininessBlurForGameObjectEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        materialComponent,
        shininessValue,
      );
};

let component =
  ReasonReact.statelessComponent("MainEditorLightMaterialForGameObject");

let render = (reduxTuple, materialComponent, _self) =>
  InspectorMaterialComponentUtils.buildLightMaterialComponent(
    reduxTuple,
    materialComponent,
    (
      Method.changeColor,
      Method.changeShininess,
      Method.closeLightMaterialColorPick(reduxTuple, materialComponent),
      Method.blurShininessEvent(reduxTuple, materialComponent),
    ),
  );

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~materialComponent,
      _children,
    ) => {
  ...component,
  render: self => render((uiState, dispatchFunc), materialComponent, self),
};