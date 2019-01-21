type state = {
  x: float,
  y: float,
  z: float,
};

type action =
  | TransformBlurX(float)
  | TransformBlurY(float)
  | TransformBlurZ(float);

let component = ReasonReact.reducerComponent("TransformTemplate");

let reducer =
    (
      (uiState, dispatchFunc),
      (transformComponent, blurEventFunc),
      action,
      state,
    ) =>
  switch (action) {
  | TransformBlurX(xValue) =>
    blurEventFunc(
      (uiState, dispatchFunc),
      transformComponent,
      (state.x, state.y, state.z),
    );

    ReasonReact.Update({...state, x: xValue});

  | TransformBlurY(yValue) =>
    blurEventFunc(
      (uiState, dispatchFunc),
      transformComponent,
      (state.x, state.y, state.z),
    );

    ReasonReact.Update({...state, y: yValue});

  | TransformBlurZ(zValue) =>
    blurEventFunc(
      (uiState, dispatchFunc),
      transformComponent,
      (state.x, state.y, state.z),
    );

    ReasonReact.Update({...state, z: zValue});
  };

let render =
    (
      (uiState, dispatchFunc),
      (transformComponent, canBeZero),
      (changeXFunc, changeYFunc, changeZFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-transform-template">
    <FloatInput
      label="X"
      defaultValue=(state.x |> StringService.floatToString)
      onChange=(changeXFunc(transformComponent))
      onBlur=(value => send(TransformBlurX(value)))
      canBeZero
    />
    <FloatInput
      label="Y"
      defaultValue=(state.y |> StringService.floatToString)
      onChange=(changeYFunc(transformComponent))
      onBlur=(value => send(TransformBlurY(value)))
      canBeZero
    />
    <FloatInput
      label="Z"
      defaultValue=(state.z |> StringService.floatToString)
      onChange=(changeZFunc(transformComponent))
      onBlur=(value => send(TransformBlurZ(value)))
      canBeZero
    />
  </article>;

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~transformComponent,
      ~changeXFunc,
      ~changeYFunc,
      ~changeZFunc,
      ~getDataFunc,
      ~blurEventFunc,
      ~canBeZero,
      _children,
    ) => {
  ...component,
  initialState: () => {
    let (x, y, z) = getDataFunc(transformComponent);

    {x, y, z};
  },
  reducer:
    reducer((uiState, dispatchFunc), (transformComponent, blurEventFunc)),
  render: self =>
    render(
      (uiState, dispatchFunc),
      (transformComponent, canBeZero),
      (changeXFunc, changeYFunc, changeZFunc),
      self,
    ),
};