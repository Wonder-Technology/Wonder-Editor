Css.importCss("./css/componentBox.css");

type state = {
  isShowComponent: bool,
  triangleDirection: string,
};

type action =
  | ShowComponent;

module Method = {
  let showComponentFunc = _event => ShowComponent;
};

let component = ReasonReact.reducerComponent("ComponentBox");

let reducer = action =>
  switch (action) {
  | ShowComponent => (
      state =>
        switch (state.isShowComponent) {
        | false =>
          ReasonReact.Update({
            ...state,
            isShowComponent: true,
            triangleDirection: "triangle-bottom",
          })
        | true =>
          ReasonReact.Update({
            ...state,
            isShowComponent: false,
            triangleDirection: "triangle-right",
          })
        }
    )
  };

let render =
    (
      header,
      closable,
      gameObjectComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="componentBox-component">
    <div className="header">
      <div
        className="header-triangle"
        onClick=(_e => send(Method.showComponentFunc(_e)))>
        <span className=state.triangleDirection />
      </div>
      <div className="header-title"> (DomHelper.textEl(header)) </div>
      (
        closable ?
          <span className="header-close"> (DomHelper.textEl("x")) </span> :
          ReasonReact.nullElement
      )
    </div>
    (state.isShowComponent ? gameObjectComponent : ReasonReact.nullElement)
  </article>;

let make = (~header, ~closable, ~gameObjectComponent, _children) => {
  ...component,
  initialState: () => {
    isShowComponent: true,
    triangleDirection: "triangle-bottom",
  },
  reducer,
  render: self => render(header, closable, gameObjectComponent, self),
};