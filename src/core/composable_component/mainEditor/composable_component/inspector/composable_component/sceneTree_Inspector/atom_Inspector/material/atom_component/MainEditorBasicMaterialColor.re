open AssetNodeType;

open ColorType;

open Color;

type state = {
  colorHex: string,
  isShowColorPick: bool,
};

type action =
  | ToggleShowColorPick;

module Method = {
  let changeColor = (materialComponent, value) =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> BasicMaterialEngineService.setColor
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|materialComponent|], type_: Material},
       |]);
  let closeColorPick = MaterialSetColorEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;
};

let component = ReasonReact.reducerComponent("MainEditorBasicMaterialColor");

let reducer = ((store, dispatchFunc), materialComponent, action, state) =>
  switch (action) {
  | ToggleShowColorPick =>
    state.isShowColorPick ?
      {
        Method.closeColorPick(
          (store, dispatchFunc),
          materialComponent,
          state.colorHex,
        );

        ReasonReact.Update({
          ...state,
          isShowColorPick: false,
          colorHex:
            BasicMaterialEngineService.getColor(materialComponent)
            |> StateLogicService.getEngineStateToGetData
            |> getHexString,
        });
      } :
      ReasonReact.Update({...state, isShowColorPick: true})
  };

let render =
    (
      (store, dispatchFunc),
      materialComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-material-color">
    <div className="">
      <span className=""> (DomHelper.textEl("color : ")) </span>
      <span className=""> (DomHelper.textEl(state.colorHex)) </span>
      <button className="" onClick=(_e => send(ToggleShowColorPick))>
        (DomHelper.textEl("pick color"))
      </button>
      (
        state.isShowColorPick ?
          <div className="color-pick-item">
            <ReactColor.Sketch
              color=state.colorHex
              onChange=(
                (value, e) => Method.changeColor(materialComponent, value)
              )
            />
          </div> :
          ReasonReact.nullElement
      )
    </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  initialState: () => {
    isShowColorPick: false,
    colorHex:
      BasicMaterialEngineService.getColor(materialComponent)
      |> StateLogicService.getEngineStateToGetData
      |> getHexString,
  },
  reducer: reducer((store, dispatchFunc), materialComponent),
  render: self => render((store, dispatchFunc), materialComponent, self),
};