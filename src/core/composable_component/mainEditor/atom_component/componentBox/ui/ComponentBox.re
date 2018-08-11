type state = {
  isShowComponent: bool,
  triangleDirection: string,
};

type action =
  | ShowComponent;

module Method = {
  let removeComponent = AddableComponentRemoveComponentEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("ComponentBox");

let reducer = action =>
  switch (action) {
  | ShowComponent => (
      state =>
        state.isShowComponent ?
          ReasonReact.Update({
            ...state,
            isShowComponent: false,
            triangleDirection: "triangle-right",
          }) :
          ReasonReact.Update({
            ...state,
            isShowComponent: true,
            triangleDirection: "triangle-bottom",
          })
    )
  };

let render =
    (
      reduxTuple,
      (header, isDisposable),
      (gameObject, gameObjectUIComponent, type_),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="componentBox-component">
    <div className="header">
      <div className="header-triangle" onClick=(_e => send(ShowComponent))>
        <span className=state.triangleDirection />
      </div>
      <div className="header-title"> (DomHelper.textEl(header)) </div>
      (
        /* TODO rename to isDisposable */
        isDisposable ?
          <span
            className="header-close"
            onClick=(
              _e => Method.removeComponent(reduxTuple, gameObject, type_)
            )>
            (DomHelper.textEl("x"))
          </span> :
          ReasonReact.nullElement
      )
    </div>
  /* TODO add inspectorState to AppStore:
    to store isShowComponent sparsemap data */
    (state.isShowComponent ? gameObjectUIComponent : ReasonReact.nullElement)
  </article>;

let make =
    (
      ~reduxTuple,
      ~header,
      ~isDisposable,
      ~gameObject,
      ~gameObjectUIComponent,
      ~type_,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowComponent: true,
    triangleDirection: "triangle-bottom",
  },
  reducer,
  render: self =>
    render(
      reduxTuple,
      (header, isDisposable),
      (gameObject, gameObjectUIComponent, type_),
      self,
    ),
};