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
  <article className="inspector-item">
    <div className="item-header"> (DomHelper.textEl(label)) </div>
    <div className="item-content item-color">
      <div
        className="color-hex"
        style=(ReactDOMRe.Style.make(~background=state.colorHex, ()))
        onClick=(_e => send(ShowColorPick))
      />
      <div className="color-select" onClick=(_e => send(ShowColorPick))>
        <img src="./public/img/color.png" />
      </div>
    </div>
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
        ReasonReact.null
    )
  </article>;

let make =
    (~label, ~getColorFunc, ~changeColorFunc, ~closeColorPickFunc, _children) => {
  ...component,
  initialState: () => {isShowColorPick: false, colorHex: getColorFunc()},
  reducer: reducer((closeColorPickFunc, getColorFunc)),
  render: self => render(label, changeColorFunc, self),
};