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

  let onDrop = BasicMaterialDragTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeTexture = ((store, dispatchFunc), (), materialComponent) =>
    switch (
      BasicMaterialEngineService.getBasicMaterialMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ()
    | Some(_mapId) =>
      BasicMaterialRemoveTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (store, dispatchFunc),
        (),
        materialComponent,
      )
    };
};

let render = ((store, dispatchFunc), materialComponent, _self) =>
  <article className="wonder-basic-material">
    <PickColorComponent
      label="Color"
      getColorFunc=(Method.getColor(materialComponent))
      changeColorFunc=(Method.changeColor(materialComponent))
      closeColorPickFunc=(
        Method.closeColorPick((store, dispatchFunc), materialComponent)
      )
    />
    <MainEditorMaterialMap
      store
      dispatchFunc
      materialComponent
      label="Map"
      getMapFunc=BasicMaterialEngineService.getBasicMaterialMap
      removeTextureFunc=Method.removeTexture
      onDropFunc=Method.onDrop
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), materialComponent, self),
};