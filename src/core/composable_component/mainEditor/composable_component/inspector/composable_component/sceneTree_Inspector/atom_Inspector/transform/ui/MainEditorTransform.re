open DiffType;

type state = {
  x: string,
  y: string,
  z: string,
};

type action =
  | TransformBlurX(float)
  | TransformBlurY(float)
  | TransformBlurZ(float);

module Method = {
  let blurTransformEvent = MainEditorTransformMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByStackFirst;

  let _setCurrentSceneTreeNodeLocalPosition = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalPosition((x, y, z))
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|transformComponent|], type_: Transform},
       |]);

  let changeX = (transformComponent, value) => {
    let (_x, y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);
    WonderLog.Log.print(("change x", value)) |> ignore;

    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (value, y, z));
  };

  let changeY = (transformComponent, value) => {
    let (x, _y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent);

    WonderLog.Log.print(("change y", (x, value))) |> ignore;

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
      (
        state.x |> float_of_string,
        state.y |> float_of_string,
        state.z |> float_of_string,
      ),
    );

    ReasonReact.Update({...state, x: xValue |> string_of_float});

  | TransformBlurY(yValue) =>
    Method.blurTransformEvent(
      (store, dispatchFunc),
      transformComponent,
      (
        state.x |> float_of_string,
        state.y |> float_of_string,
        state.z |> float_of_string,
      ),
    );

    ReasonReact.Update({...state, y: yValue |> string_of_float});

  | TransformBlurZ(zValue) =>
    Method.blurTransformEvent(
      (store, dispatchFunc),
      transformComponent,
      (
        state.x |> float_of_string,
        state.y |> float_of_string,
        state.z |> float_of_string,
      ),
    );

    ReasonReact.Update({...state, z: zValue |> string_of_float});
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
      defaultValue=state.x
      onChange=(Method.changeX(transformComponent))
      onBlur=(value => send(TransformBlurX(value)))
    />
    <FloatInput
      label="Y"
      defaultValue=state.y
      onChange=(Method.changeY(transformComponent))
      onBlur=(value => send(TransformBlurY(value)))
    />
    <FloatInput
      label="Z"
      defaultValue=state.z
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

    WonderLog.Log.print("init state") |> ignore;
    WonderLog.Log.print((x, y, z)) |> ignore;

    {x, y, z};
  },
  reducer: reducer((store, dispatchFunc), transformComponent),
  render: self => render((store, dispatchFunc), transformComponent, self),
};