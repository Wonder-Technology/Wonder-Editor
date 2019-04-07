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
};

let component =
  ReasonReact.statelessComponent("MainEditorLightMaterialForAsset");

let render = ((uiState, dispatchFunc), materialComponent, _self) =>
  InspectorMaterialComponentUtils.buildLightMaterialComponent(
    (uiState, dispatchFunc),
    materialComponent,
    (Method.changeColor, Method.changeShininess),
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