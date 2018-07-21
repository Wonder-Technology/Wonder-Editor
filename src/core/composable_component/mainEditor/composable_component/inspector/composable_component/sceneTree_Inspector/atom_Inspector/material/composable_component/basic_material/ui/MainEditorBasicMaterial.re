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
};

let render = ((store, dispatchFunc), materialComponent, slef) =>
  <article className="wonder-basic-material">
    /* <MainEditorBasicMaterialColor store dispatchFunc materialComponent /> */

      <MainEditorMaterialColor
        store
        dispatchFunc
        materialComponent
        label="color"
        getColorFunc=Method.getColor
        changeColorFunc=Method.changeColor
        closeColorPickFunc=Method.closeColorPick
      />
      <MainEditorBasicMaterialMap store dispatchFunc materialComponent />
    </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), materialComponent, self),
};