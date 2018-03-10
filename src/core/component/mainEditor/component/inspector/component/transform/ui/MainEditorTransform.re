type retainedProps = {
  x: string,
  y: string,
  z: string
};

module Method = {
  let truncateTransformValue = ((x, y, z)) => {
    open OperateFloatUtils;
    let truncateLen = 6;
    (
      truncateFloatValue(x, truncateLen),
      truncateFloatValue(y, truncateLen),
      truncateFloatValue(z, truncateLen)
    )
  };
  let onMarkRedoUndo = MainEditorTransformMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndo;
  let getCurrentGameObjectLocalPosition = (transformComponent) =>
    TransformEngineService.getLocalPosition(transformComponent)
    |> StateLogicService.getEngineState;
  let _setCurrentGameObjectLocalPosition = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalPosition(transformComponent, (x, y, z))
    |> StateLogicService.getAndSetEngineState;
  let changeX = (transformComponent, value) => {
    let (_x, y, z) = getCurrentGameObjectLocalPosition(transformComponent);
    _setCurrentGameObjectLocalPosition(transformComponent, (value, y, z))
  };
  let changeY = (transformComponent, value) => {
    let (x, _y, z) = getCurrentGameObjectLocalPosition(transformComponent);
    _setCurrentGameObjectLocalPosition(transformComponent, (x, value, z))
  };
  let changeZ = (transformComponent, value) => {
    let (x, y, _z) = getCurrentGameObjectLocalPosition(transformComponent);
    _setCurrentGameObjectLocalPosition(transformComponent, (x, y, value))
  };
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorTransform");

let render = (store, dispatch, transformComponent, self: ReasonReact.self('a, 'b, 'c)) =>
  <article className="transform-component">
    <FloatInput
      label="X"
      defaultValue=self.retainedProps.x
      onChange=(Method.changeX(transformComponent))
      onBlur=(Method.onMarkRedoUndo((store, dispatch), ()))
    />
    <FloatInput
      label="Y"
      defaultValue=self.retainedProps.y
      onChange=(Method.changeY(transformComponent))
      onBlur=(Method.onMarkRedoUndo((store, dispatch), ()))
    />
    <FloatInput
      label="Z"
      defaultValue=self.retainedProps.z
      onChange=(Method.changeZ(transformComponent))
      onBlur=(Method.onMarkRedoUndo((store, dispatch), ()))
    />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, ~transformComponent, _children) => {
  ...component,
  retainedProps: {
    let (x, y, z) =
      Method.getCurrentGameObjectLocalPosition(transformComponent) |> Method.truncateTransformValue;
    {x, y, z}
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, transformComponent, self)
};