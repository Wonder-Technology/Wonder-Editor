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
};

let component = ReasonReact.statelessComponent("MainEditorLightMaterial");

let render = ((store, dispatchFunc), materialComponent, slef) =>
  <article className="wonder-light-material">
    <MainEditorMaterialColor
      store
      dispatchFunc
      materialComponent
      label="color"
      getColorFunc=Method.getColor
      changeColorFunc=Method.changeColor
      closeColorPickFunc=Method.closeColorPick
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), materialComponent, self),
};