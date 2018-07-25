open DiffType;

type state = {
  distance: float,
  minDistance: float,
};

type action =
  | CameraBlurDistance(float)
  | CameraBlurMinDistance(float);

module Method = {
  let blurArcbalCameraDistance = ArcballCameraDistanceEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let blurArcbalCameraMinDistance = ArcballCameraMinDistanceEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let changeDistance = (arcballCameraComponent, value) =>
    ArcballCameraEngineService.setArcballCameraControllerDistance(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|arcballCameraComponent|], type_: ArcballCamera},
       |]);

  let changeMinDistance = (arcballCameraComponent, value) =>
    ArcballCameraEngineService.setArcballCameraControllerMinDistance(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|arcballCameraComponent|], type_: ArcballCamera},
       |]);
};

let component = ReasonReact.reducerComponent("MainEditorTransform");

let reducer = ((store, dispatchFunc), arcballCameraComponent, action, state) =>
  switch (action) {
  | CameraBlurDistance(distance) =>
    Method.blurArcbalCameraDistance(
      (store, dispatchFunc),
      arcballCameraComponent,
      state.distance,
    );

    ReasonReact.Update({...state, distance});

  | CameraBlurMinDistance(minDistance) =>
    Method.blurArcbalCameraMinDistance(
      (store, dispatchFunc),
      arcballCameraComponent,
      state.minDistance,
    );

    ReasonReact.Update({...state, minDistance});
  };

let render =
    (
      (store, dispatchFunc),
      arcballCameraComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-inspector-arcballCamera">
    <FloatInput
      label="distance"
      defaultValue=(state.distance |> StringService.floatToString)
      onChange=(Method.changeDistance(arcballCameraComponent))
      onBlur=(value => send(CameraBlurDistance(value)))
    />
    <FloatInput
      label="min distance"
      defaultValue=(state.minDistance |> StringService.floatToString)
      onChange=(Method.changeMinDistance(arcballCameraComponent))
      onBlur=(value => send(CameraBlurMinDistance(value)))
    />
  </article>;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~arcballCameraComponent,
      _children,
    ) => {
  ...component,
  initialState: () => {
    let engineStateToGetData = StateLogicService.getRunEngineState();
    {
      distance:
        engineStateToGetData
        |> ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
             arcballCameraComponent,
           ),
      minDistance:
        engineStateToGetData
        |> ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance(
             arcballCameraComponent,
           ),
    };
  },
  reducer: reducer((store, dispatchFunc), arcballCameraComponent),
  render: self =>
    render((store, dispatchFunc), arcballCameraComponent, self),
};