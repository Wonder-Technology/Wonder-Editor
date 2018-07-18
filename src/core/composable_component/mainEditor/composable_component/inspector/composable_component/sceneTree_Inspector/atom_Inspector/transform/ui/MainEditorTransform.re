open DiffType;

type state = {
  x: float,
  y: float,
  z: float,
};

type action =
  | TransformBlurX(float)
  | TransformBlurY(float)
  | TransformBlurZ(float);

module Method = {
  let blurTransformEvent = TransformBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let _setCurrentSceneTreeNodeLocalPosition = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalPosition((x, y, z))
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|transformComponent|], type_: Transform},
       |]);

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

let component = ReasonReact.reducerComponent("MainEditorTransform");

let reducer = ((store, dispatchFunc), transformComponent, action, state) =>
  switch (action) {
  | TransformBlurX(xValue) =>
    Method.blurTransformEvent(
      (store, dispatchFunc),
      transformComponent,
      (state.x, state.y, state.z),
    );

    ReasonReact.Update({...state, x: xValue});

  | TransformBlurY(yValue) =>
    Method.blurTransformEvent(
      (store, dispatchFunc),
      transformComponent,
      (state.x, state.y, state.z),
    );

    ReasonReact.Update({...state, y: yValue});

  | TransformBlurZ(zValue) =>
    Method.blurTransformEvent(
      (store, dispatchFunc),
      transformComponent,
      (state.x, state.y, state.z),
    );

    ReasonReact.Update({...state, z: zValue});
  };

let render =
    (
      (store, dispatchFunc),
      transformComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-inspector-transform">
    <FloatInput
      label="X"
      defaultValue=(state.x |> StringService.floatToString)
      onChange=(Method.changeX(transformComponent))
      onBlur=(value => send(TransformBlurX(value)))
    />
    <FloatInput
      label="Y"
      defaultValue=(state.y |> StringService.floatToString)
      onChange=(Method.changeY(transformComponent))
      onBlur=(value => send(TransformBlurY(value)))
    />
    <FloatInput
      label="Z"
      defaultValue=(state.z |> StringService.floatToString)
      onChange=(Method.changeZ(transformComponent))
      onBlur=(value => send(TransformBlurZ(value)))
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~transformComponent, _children) => {
  ...component,
  initialState: () => {
    let (x, y, z) =
      TransformUtils.getCurrentTransformData(transformComponent);

    {x, y, z};
  },
  reducer: reducer((store, dispatchFunc), transformComponent),
  render: self => render((store, dispatchFunc), transformComponent, self),
};