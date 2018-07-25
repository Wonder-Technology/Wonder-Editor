open Color;

open ColorType;

module Method = {
  let getColor = materialComponent =>
    LightMaterialEngineService.getLightMaterialDiffuseColor(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (materialComponent, value) =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> LightMaterialEngineService.setLightMaterialDiffuseColor
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|materialComponent|], type_: DiffType.LightMaterial},
       |]);

  let closeColorPick = LightMaterialCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let onDrop = LightMaterialDragTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeTexture = ((store, dispatchFunc), (), materialComponent) =>
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ()
    | Some(_mapId) =>
      LightMaterialRemoveTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (store, dispatchFunc),
        (),
        materialComponent,
      )
    };
};

let component = ReasonReact.statelessComponent("MainEditorLightMaterial");

let render = ((store, dispatchFunc), materialComponent, _self) =>
  <article className="wonder-light-material">
    <PickColorComponent
      store
      dispatchFunc
      gameObjectComponent=materialComponent
      label="diffcuse color : "
      getColorFunc=Method.getColor
      changeColorFunc=Method.changeColor
      closeColorPickFunc=Method.closeColorPick
    />
    <MainEditorMaterialMap
      store
      dispatchFunc
      materialComponent
      label="diffuse map : "
      getMapFunc=LightMaterialEngineService.getLightMaterialDiffuseMap
      removeTextureFunc=Method.removeTexture
      onDropFunc=Method.onDrop
    />
    <MainEditorMaterialShininess store dispatchFunc materialComponent />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), materialComponent, self),
};