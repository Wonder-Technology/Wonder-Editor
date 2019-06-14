open Color;

open ColorType;

let component =
  ReasonReact.statelessComponent("MainEditorBasicMaterialForGameObject");

module Method = {
  let changeColor = (materialComponent, value) => {
    let colorArray =
      value |> convertColorObjToColorPickType |> getEngineColorRgbArr;

    StateEngineService.unsafeGetState()
    |> BasicMaterialEngineService.setColor(colorArray, materialComponent)
    |> StateLogicService.refreshEngineState;
  };

  let closeColorPick = BasicMaterialCloseColorPickForGameObjectEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;
};

let render = (reduxTuple, materialComponent, _self) =>
  InspectorMaterialComponentUtils.buildBasicMaterialComponent(
    materialComponent,
    (
      Method.changeColor,
      Method.closeColorPick(reduxTuple, materialComponent),
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