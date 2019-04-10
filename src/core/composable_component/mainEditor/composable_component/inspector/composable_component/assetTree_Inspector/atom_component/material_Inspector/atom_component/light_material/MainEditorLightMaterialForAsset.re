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

  let closeColorPick = LightMaterialCloseColorPickForAssetEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

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

  let dragToSetLightMaterialTexture = LightMaterialDragTextureForAssetEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeTexture =
      ((uiState, dispatchFunc), currentNodeId, materialComponent) =>
    (
      switch (
        LightMaterialEngineService.getLightMaterialDiffuseMap(
          materialComponent,
        )
        |> StateLogicService.getEngineStateToGetData
      ) {
      | None => Js.Promise.make((~resolve, ~reject) => resolve(. ignore()))
      | Some(_mapId) =>
        LightMaterialRemoveTextureForAssetEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
          (uiState, dispatchFunc),
          currentNodeId,
          materialComponent,
        )
      }
    )
    |> ignore;
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
      Method.closeColorPick(
        reduxTuple,
        (materialComponent, currentNodeId),
      ),
      Method.blurShininessEvent(
        reduxTuple,
        (materialComponent, currentNodeId),
      ),
      Method.dragToSetLightMaterialTexture(
        reduxTuple,
        (materialComponent, currentNodeId),
      ),
      Method.removeTexture(reduxTuple, currentNodeId),
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