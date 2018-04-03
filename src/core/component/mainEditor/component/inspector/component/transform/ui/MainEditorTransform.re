type retainedProps = {
  x: string,
  y: string,
  z: string
};

module Method = {
  let truncateTransformValue = ((x, y, z)) => {
    let truncateLen = 6;
    (
      FloatService.truncateFloatValue(x, truncateLen),
      FloatService.truncateFloatValue(y, truncateLen),
      FloatService.truncateFloatValue(z, truncateLen)
    )
  };
  let onMarkRedoUndoByFirstStack = MainEditorTransformMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByFirstStack;
  let getCurrentGameObjectLocalPosition = (transformComponent) =>
    TransformEngineService.getLocalPosition(transformComponent)
    |> StateLogicService.getEngineStateToGetData;
  let _setCurrentGameObjectLocalPosition = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalPosition(transformComponent, (x, y, z))
    |> StateLogicService.getAndRefreshEngineState;
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
      onBlur=(Method.onMarkRedoUndoByFirstStack((store, dispatch), ()))
    />
    <FloatInput
      label="Y"
      defaultValue=self.retainedProps.y
      onChange=(Method.changeY(transformComponent))
      onBlur=(Method.onMarkRedoUndoByFirstStack((store, dispatch), ()))
    />
    <FloatInput
      label="Z"
      defaultValue=self.retainedProps.z
      onChange=(Method.changeZ(transformComponent))
      onBlur=(Method.onMarkRedoUndoByFirstStack((store, dispatch), ()))
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