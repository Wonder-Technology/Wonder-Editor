open ColorType;

open Color;

type state = {
  colorHex: string,
  isShowColorPick: bool,
};

type action =
  | ToggleShowColorPick;

let component = ReasonReact.reducerComponent("PickColorComponent");

let reducer =
    (
      (store, dispatchFunc),
      (gameObjectComponent, closeColorPickFunc, getColorFunc),
      action,
      state,
    ) =>
  switch (action) {
  | ToggleShowColorPick =>
    state.isShowColorPick ?
      {
        closeColorPickFunc(
          (store, dispatchFunc),
          gameObjectComponent,
          state.colorHex,
        );

        ReasonReact.Update({
          ...state,
          isShowColorPick: false,
          colorHex: getColorFunc(gameObjectComponent),
        });
      } :
      ReasonReact.Update({...state, isShowColorPick: true})
  };

let render =
    (
      (store, dispatchFunc),
      (gameObjectComponent, label),
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
                (value, e) => changeColorFunc(gameObjectComponent, value)
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
      ~gameObjectComponent,
      ~label,
      ~getColorFunc,
      ~changeColorFunc,
      ~closeColorPickFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowColorPick: false,
    colorHex: getColorFunc(gameObjectComponent),
  },
  reducer:
    reducer(
      (store, dispatchFunc),
      (gameObjectComponent, closeColorPickFunc, getColorFunc),
    ),
  render: self =>
    render(
      (store, dispatchFunc),
      (gameObjectComponent, label),
      changeColorFunc,
      self,
    ),
};