open Color;

open ColorType;

module Method = {
  let changeColor = (materialComponent, value) => {
    let colorArray =
      value |> convertColorObjToColorPickType |> getEngineColorRgbArr;

    StateEngineService.unsafeGetState()
    |> BasicMaterialEngineService.setColor(colorArray, materialComponent)
    |> StateLogicService.refreshEngineState;

    StateInspectorEngineService.unsafeGetState()
    |> InspectorEngineMaterialChangeValueUtils.changeMaterialValue(
         colorArray,
         (
           GameObjectComponentEngineService.getBasicMaterialComponent,
           BasicMaterialEngineService.setColor,
         ),
         StateEditorService.getState(),
       )
    |> StateLogicService.refreshInspectorEngineState;
  };
};

let component =
  ReasonReact.statelessComponent("MainEditorBasicMaterialForAsset");

let render = (reduxTuple, materialComponent, _self) =>
  InspectorMaterialComponentUtils.buildBasicMaterialComponent(
    reduxTuple,
    materialComponent,
    Method.changeColor,
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