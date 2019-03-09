open Color;

open ColorType;

let component = ReasonReact.statelessComponent("MainEditorBasicMaterial");

module Method = {
  let getColor = (materialComponent, ()) =>
    BasicMaterialEngineService.getColor(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (materialComponent, value) =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> BasicMaterialEngineService.setColor(_, materialComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let closeColorPick = BasicMaterialCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;
};

let render = ((uiState, dispatchFunc), materialComponent, _self) =>
  <article className="wonder-basic-material">
    <PickColorComponent
      label="Color"
      title="color"
      getColorFunc={Method.getColor(materialComponent)}
      changeColorFunc={Method.changeColor(materialComponent)}
      closeColorPickFunc={
        Method.closeColorPick((uiState, dispatchFunc), materialComponent)
      }
    />
  </article>;

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