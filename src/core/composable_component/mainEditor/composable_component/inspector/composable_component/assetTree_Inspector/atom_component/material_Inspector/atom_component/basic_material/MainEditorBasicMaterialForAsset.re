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

  let closeBasicMaterialColorPick = BasicMaterialCloseColorPickForAssetEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;
};

let component =
  ReasonReact.statelessComponent("MainEditorBasicMaterialForAsset");

let render = (reduxTuple, (materialComponent, currentNodeId), _self) =>
  InspectorMaterialComponentUtils.buildBasicMaterialComponent(
    materialComponent,
    (
      Method.changeColor,
      Method.closeBasicMaterialColorPick(
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