open AssetNodeType;

open Color;

type state = {
  colorHex: string,
  isShowColorPick: bool,
};

type action =
  | ToggleShowColorPick;

module Method = {
  let changeColor = ((store, dispatchFunc), materialComponent, value) =>
    MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByStackLastReturnStore(
      (store, dispatchFunc),
      materialComponent,
      value
      |> Color.convertColorObjToColorPickType
      |> Color.getEngineColorRgbArr,
    );
};

let component = ReasonReact.reducerComponent("MainEditorBasicMaterialColor");

let reducer = (materialComponent, action, state) =>
  switch (action) {
  | ToggleShowColorPick =>
    state.isShowColorPick ?
      ReasonReact.Update({
        ...state,
        isShowColorPick: false,
        colorHex:
          BasicMaterialEngineService.getColor(materialComponent)
          |> StateLogicService.getEngineStateToGetData
          |> Color.getHexString,
      }) :
      ReasonReact.Update({...state, isShowColorPick: true})
  };

let render =
    (
      (store, dispatchFunc),
      materialComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  WonderLog.Log.print(state) |> ignore;
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
                (value, e) =>
                  Method.changeColor(
                    (store, dispatchFunc),
                    materialComponent,
                    value,
                  )
              )
            />
          </div> :
          ReasonReact.nullElement
      )
    </div>
  </article>;
};

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  initialState: () => {
    isShowColorPick: false,
    colorHex:
      BasicMaterialEngineService.getColor(materialComponent)
      |> StateLogicService.getEngineStateToGetData
      |> Color.getHexString,
  },
  reducer: reducer(materialComponent),
  render: self => render((store, dispatchFunc), materialComponent, self),
};