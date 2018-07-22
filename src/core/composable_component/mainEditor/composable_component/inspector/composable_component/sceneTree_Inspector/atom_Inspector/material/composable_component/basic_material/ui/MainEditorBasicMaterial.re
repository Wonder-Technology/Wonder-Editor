open Color;

open ColorType;

let component = ReasonReact.statelessComponent("MainEditorBasicMaterial");

module Method = {
  let getColor = materialComponent =>
    BasicMaterialEngineService.getColor(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (materialComponent, value) =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> BasicMaterialEngineService.setColor
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|materialComponent|], type_: DiffType.BasicMaterial},
       |]);

  let closeColorPick = BasicMaterialCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let onDrop = BasicMaterialDragTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeTexture = ((store, dispatchFunc), (), materialComponent) =>
    switch (
      BasicMaterialEngineService.getMap(materialComponent)
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
    <MainEditorMaterialColor
      store
      dispatchFunc
      materialComponent
      label="color : "
      getColorFunc=Method.getColor
      changeColorFunc=Method.changeColor
      closeColorPickFunc=Method.closeColorPick
    />
    <MainEditorMaterialMap
      store
      dispatchFunc
      materialComponent
      label="map : "
      getMapFunc=BasicMaterialEngineService.getMap
      removeTextureFunc=Method.removeTexture
      onDropFunc=Method.onDrop
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), materialComponent, self),
};