open TransformGizmoCoordinateSystemSwitchType;

type state = {selectedCoordinateSystem: coordinateSystem};

type action =
  | Change(coordinateSystem, onChangeFunc);

module Method = {
  let getText = (coordinateSystem: coordinateSystem) =>
    switch (coordinateSystem) {
    | World => "World"
    | Local => "Local"
    };

  let _getReverse = (coordinateSystem: coordinateSystem) : coordinateSystem =>
    switch (coordinateSystem) {
    | World => Local
    | Local => World
    };

  let change = ((state, send), onChangeFunc) =>
    send(
      Change(state.selectedCoordinateSystem |> _getReverse, onChangeFunc),
    );
};

let component = ReasonReact.reducerComponent("TransformGizmoSwitch");

let reducer = (action, state) =>
  switch (action) {
  | Change(coordinateSystem, onChangeFunc) =>
    ReasonReactUtils.updateWithSideEffects(
      {...state, selectedCoordinateSystem: coordinateSystem}, _state =>
      onChangeFunc(coordinateSystem)
    )
  };

let render =
    (
      isDisable,
      onChangeFunc,
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <article
    key="TransformGizmoCoordinateSystemSwitch"
    className="transform-gizmo-coordinate-system-switch">
    <button
      disabled=isDisable
      onClick=(_e => Method.change((state, send), onChangeFunc))>
      (DomHelper.textEl(Method.getText(state.selectedCoordinateSystem)))
    </button>
  </article>;

let make = (~defaultCoordinateSystem, ~isDisable, ~onChange, _children) => {
  ...component,
  initialState: () => {selectedCoordinateSystem: defaultCoordinateSystem},
  reducer,
  render: self => render(isDisable, onChange, self),
};