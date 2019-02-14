type state = {
  isShowComponent: bool,
  triangleDirection: string,
};

type action =
  | ToggleShowComponent;

module Method = {
  let removeComponent = AddableComponentRemoveComponentEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let changeShowComponentByType = ((uiState, dispatchFunc), type_, value) =>
    dispatchFunc(
      AppStore.InspectorAction(
        SetShowComponent(
          type_ |> InspectorComponentType.convertComponentTypeToInt,
          value,
        ),
      ),
    );
};

let component = ReasonReact.reducerComponent("ComponentBox");

let reducer = (reduxTuple, type_, action) =>
  switch (action) {
  | ToggleShowComponent => (
      state =>
        state.isShowComponent ?
          ReasonReactUtils.sideEffects(() =>
            Method.changeShowComponentByType(reduxTuple, type_, false)
          ) :
          ReasonReactUtils.sideEffects(() =>
            Method.changeShowComponentByType(reduxTuple, type_, true)
          )
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
      <div
        className="header-triangle" onClick=(_e => send(ToggleShowComponent))>
        <span className=state.triangleDirection />
      </div>
      <div className="header-title"> (DomHelper.textEl(header)) </div>
      (
        isDisposable ?
          <div className="header-close">
            <img
              src="./public/img/close.png"
              onClick=(
                _e => Method.removeComponent(reduxTuple, gameObject, type_)
              )
            />
          </div> :
          ReasonReact.null
      )
    </div>
    (state.isShowComponent ? gameObjectUIComponent : ReasonReact.null)
  </article>;

let make =
    (
      ~reduxTuple,
      ~header,
      ~isDisposable,
      ~gameObject,
      ~gameObjectUIComponent,
      ~isShowComponent,
      ~type_,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowComponent,
    triangleDirection: isShowComponent ? "triangle-bottom" : "triangle-right",
  },
  reducer: reducer(reduxTuple, type_),
  render: self =>
    render(
      reduxTuple,
      (header, isDisposable),
      (gameObject, gameObjectUIComponent, type_),
      self,
    ),
};