open AssetNodeType;

open ColorType;

open Color;

type state = {
  colorHex: string,
  isShowColorPick: bool,
};

type action =
  | ToggleShowColorPick;

let component = ReasonReact.reducerComponent("MainEditorMaterialColor");

let reducer =
    (
      (store, dispatchFunc),
      (materialComponent, closeColorPickFunc, getColorFunc),
      action,
      state,
    ) =>
  switch (action) {
  | ToggleShowColorPick =>
    state.isShowColorPick ?
      {
        closeColorPickFunc(
          (store, dispatchFunc),
          materialComponent,
          state.colorHex,
        );

        ReasonReact.Update({
          ...state,
          isShowColorPick: false,
          colorHex: getColorFunc(materialComponent),
        });
      } :
      ReasonReact.Update({...state, isShowColorPick: true})
  };

let render =
    (
      (store, dispatchFunc),
      (materialComponent, label),
      changeColorFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-material-color">
    <div className="">
      <span className=""> (DomHelper.textEl(label)) </span>
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
                (value, e) => changeColorFunc(materialComponent, value)
              )
            />
          </div> :
          ReasonReact.nullElement
      )
    </div>
  </article>;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~materialComponent,
      ~label,
      ~getColorFunc,
      ~changeColorFunc,
      ~closeColorPickFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowColorPick: false,
    colorHex: getColorFunc(materialComponent),
  },
  reducer:
    reducer(
      (store, dispatchFunc),
      (materialComponent, closeColorPickFunc, getColorFunc),
    ),
  render: self =>
    render(
      (store, dispatchFunc),
      (materialComponent, label),
      changeColorFunc,
      self,
    ),
};