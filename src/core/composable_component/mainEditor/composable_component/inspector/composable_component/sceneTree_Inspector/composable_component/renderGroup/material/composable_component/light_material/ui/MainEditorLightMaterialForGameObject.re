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

  let closeColorPick = LightMaterialCloseColorPickForGameObjectEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

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

  let dragToSetLightMaterialTexture = LightMaterialDragTextureForGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeTexture = ((uiState, dispatchFunc), (), materialComponent) =>
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ()
    | Some(_mapId) =>
      LightMaterialRemoveTextureForGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (uiState, dispatchFunc),
        (),
        materialComponent,
      )
    };
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
      Method.closeColorPick(reduxTuple, materialComponent),
      Method.blurShininessEvent(reduxTuple, materialComponent),
      Method.dragToSetLightMaterialTexture(reduxTuple, materialComponent),
      Method.removeTexture(reduxTuple, ()),
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