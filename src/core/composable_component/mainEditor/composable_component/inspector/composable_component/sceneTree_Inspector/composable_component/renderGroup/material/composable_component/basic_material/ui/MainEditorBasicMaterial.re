open Color;

open ColorType;

let component = ReasonReact.statelessComponent("MainEditorBasicMaterial");

module Method = {
  let getColor = (materialComponent, ()) =>
    BasicMaterialEngineService.getColor(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (isShowInspectorCanvas, materialComponent, value) => {
    let colorArray =
      value |> convertColorObjToColorPickType |> getEngineColorRgbArr;

    StateEngineService.unsafeGetState()
    |> BasicMaterialEngineService.setColor(colorArray, materialComponent)
    |> StateLogicService.refreshEngineState;

    isShowInspectorCanvas ?
      StateInspectorEngineService.unsafeGetState()
      |> InspectorEngineMaterialChangeValueUtils.changeMaterialValue(
           colorArray,
           (
             GameObjectComponentEngineService.getBasicMaterialComponent,
             BasicMaterialEngineService.setColor,
           ),
         ) :
      ();
  };

  let closeColorPick = BasicMaterialCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;
};

let render =
    (
      (uiState, dispatchFunc),
      materialComponent,
      isShowInspectorCanvas,
      _self,
    ) =>
  <article className="wonder-basic-material">
    <PickColorComponent
      label="Color"
      title="color"
      getColorFunc={Method.getColor(materialComponent)}
      changeColorFunc={
        Method.changeColor(isShowInspectorCanvas, materialComponent)
      }
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
      ~isShowInspectorCanvas,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      materialComponent,
      isShowInspectorCanvas,
      self,
    ),
};