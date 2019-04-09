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

    StateInspectorEngineService.unsafeGetState()
    |> InspectorEngineMaterialChangeValueUtils.changeMaterialValue(
         colorArray,
         (
           GameObjectComponentEngineService.getLightMaterialComponent,
           LightMaterialEngineService.setLightMaterialDiffuseColor,
         ),
         StateEditorService.getState(),
       )
    |> StateLogicService.refreshInspectorEngineState;
  };

  let changeShininess = (materialComponent, value) => {
    StateEngineService.unsafeGetState()
    |> LightMaterialEngineService.setLightMaterialShininess(
         value,
         materialComponent,
       )
    |> StateLogicService.refreshEngineState;

    StateInspectorEngineService.unsafeGetState()
    |> InspectorEngineMaterialChangeValueUtils.changeMaterialValue(
         value,
         (
           GameObjectComponentEngineService.getLightMaterialComponent,
           LightMaterialEngineService.setLightMaterialShininess,
         ),
         StateEditorService.getState(),
       )
    |> StateLogicService.refreshInspectorEngineState;
  };

  let closeLightMaterialColorPick = LightMaterialCloseColorPickForAssetEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineStateForPromise;

  let blurShininessEvent =
      (
        (uiState, dispatchFunc),
        (materialComponent, currentNodeId),
        shininessValue,
      ) =>
    LightMaterialEngineService.getLightMaterialShininess(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, shininessValue) ?
      () :
      LightMaterialShininessBlurForAssetEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        (materialComponent, currentNodeId),
        shininessValue,
      );
};

let component =
  ReasonReact.statelessComponent("MainEditorLightMaterialForAsset");

let render = (reduxTuple, (materialComponent, currentNodeId), _self) =>
  InspectorMaterialComponentUtils.buildLightMaterialComponent(
    reduxTuple,
    materialComponent,
    (
      Method.changeColor,
      Method.changeShininess,
      Method.closeLightMaterialColorPick(
        reduxTuple,
        (materialComponent, currentNodeId),
      ),
      Method.blurShininessEvent(
        reduxTuple,
        (materialComponent, currentNodeId),
      ),
    ),
  );

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~materialComponent,
      ~currentNodeId,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (materialComponent, currentNodeId),
      self,
    ),
};