open ColorType;

open Color;

type state = {
  colorHex: string,
  isShowColorPick: bool,
};

type action =
  | ShowColorPick
  | HideColorPick;

let component = ReasonReact.reducerComponent("PickColorComponent");

let reducer = ((closeColorPickFunc, getColorFunc), action, state) =>
  switch (action) {
  | ShowColorPick => ReasonReact.Update({...state, isShowColorPick: true})
  | HideColorPick =>
    closeColorPickFunc(state.colorHex);

    ReasonReact.Update({
      ...state,
      isShowColorPick: false,
      colorHex: getColorFunc(),
    });
  };

let render =
    (label, changeColorFunc, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-color-pick">
    <div className="">
      <span className=""> (DomHelper.textEl(label)) </span>
      <span className=""> (DomHelper.textEl(state.colorHex)) </span>
      <button className="" onClick=(_e => send(ShowColorPick))>
        (DomHelper.textEl("pick color"))
      </button>
      (
        state.isShowColorPick ?
          <div className="color-pick-content">
            <div className="color-pick-item">
              <ReactColor.Sketch
                color=state.colorHex
                onChange=((value, e) => changeColorFunc(value))
              />
            </div>
            <div
              className="color-pick-bg"
              onClick=(_e => send(HideColorPick))
            />
          </div> :
          ReasonReact.nullElement
      )
    </div>
  </article>;

let make =
    (~label, ~getColorFunc, ~changeColorFunc, ~closeColorPickFunc, _children) => {
  ...component,
  initialState: () => {isShowColorPick: false, colorHex: getColorFunc()},
  reducer: reducer((closeColorPickFunc, getColorFunc)),
  render: self => render(label, changeColorFunc, self),
};