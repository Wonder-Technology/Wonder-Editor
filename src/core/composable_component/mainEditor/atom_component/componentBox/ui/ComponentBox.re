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
      reduxTuple,
      (header, isClosable),
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
        isClosable ?
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
    (state.isShowComponent ? gameObjectUIComponent : ReasonReact.nullElement)
  </article>;

let make =
    (
      ~reduxTuple,
      ~header,
      ~isClosable,
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
      (header, isClosable),
      (gameObject, gameObjectUIComponent, type_),
      self,
    ),
};