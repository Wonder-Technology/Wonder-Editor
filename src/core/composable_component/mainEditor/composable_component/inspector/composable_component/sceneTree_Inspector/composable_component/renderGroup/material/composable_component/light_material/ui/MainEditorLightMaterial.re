open Color;

open ColorType;

module Method = {
  let getColor = (materialComponent, ()) =>
    LightMaterialEngineService.getLightMaterialDiffuseColor(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (materialComponent, value) =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> LightMaterialEngineService.setLightMaterialDiffuseColor(
         _,
         materialComponent,
       )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

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

  let blurShininessEvent =
      ((store, dispatchFunc), materialComponent, shininessValue) =>
    LightMaterialEngineService.getLightMaterialShininess(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, shininessValue) ?
      () :
      LightMaterialShininessBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        materialComponent,
        shininessValue,
      );

  let changeShininess = (materialComponent, value) =>
    LightMaterialEngineService.setLightMaterialShininess(
      value,
      materialComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;
};

let component = ReasonReact.statelessComponent("MainEditorLightMaterial");

let render = ((store, dispatchFunc), materialComponent, _self) =>
  <article className="wonder-light-material">
    <PickColorComponent
      label="Diffcuse color"
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
      label="Diffuse map"
      getMapFunc=LightMaterialEngineService.getLightMaterialDiffuseMap
      removeTextureFunc=Method.removeTexture
      onDropFunc=Method.onDrop
    />
    <MainEditorFloatInputBaseComponent
      label="Shininess"
      getComponentValueFunc=(
        LightMaterialEngineService.getLightMaterialShininess(
          materialComponent,
        )
      )
      changeComponentValueFunc=(Method.changeShininess(materialComponent))
      blurValueFunc=(
        Method.blurShininessEvent((store, dispatchFunc), materialComponent)
      )
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), materialComponent, self),
};