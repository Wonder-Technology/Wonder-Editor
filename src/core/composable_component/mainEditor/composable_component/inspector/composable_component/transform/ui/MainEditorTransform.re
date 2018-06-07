type retainedProps = {
  x: string,
  y: string,
  z: string,
};

module Method = {
  let onMarkRedoUndoByFirstStack = MainEditorTransformMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByFirstStack;
  let _setCurrentSceneTreeNodeLocalPosition = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalPosition((x, y, z))
    |> StateLogicService.getAndRefreshEngineStateWithDiff(
         [|transformComponent|],
         DiffType.Transform,
       );
  let changeX = (transformComponent, value) => {
    let (_x, y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);
    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (value, y, z));
  };
  let changeY = (transformComponent, value) => {
    let (x, _y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);
    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (x, value, z));
  };
  let changeZ = (transformComponent, value) => {
    let (x, y, _z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);
    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (x, y, value));
  };
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorTransform");

let render =
    (
      store,
      dispatchFunc,
      transformComponent,
      self: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="transform-component">
    <FloatInput
      label="X"
      defaultValue=self.retainedProps.x
      onChange=(Method.changeX(transformComponent))
      onBlur=(Method.onMarkRedoUndoByFirstStack((store, dispatchFunc), ()))
    />
    <FloatInput
      label="Y"
      defaultValue=self.retainedProps.y
      onChange=(Method.changeY(transformComponent))
      onBlur=(Method.onMarkRedoUndoByFirstStack((store, dispatchFunc), ()))
    />
    <FloatInput
      label="Z"
      defaultValue=self.retainedProps.z
      onChange=(Method.changeZ(transformComponent))
      onBlur=(Method.onMarkRedoUndoByFirstStack((store, dispatchFunc), ()))
    />
  </article>;

let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~transformComponent, _children) => {
  ...component,
  retainedProps: {
    let (x, y, z) =
      TransformUtils.getCurrentTransformData(transformComponent);

    {x, y, z};
  },
  shouldUpdate,
  render: self => render(store, dispatchFunc, transformComponent, self),
};