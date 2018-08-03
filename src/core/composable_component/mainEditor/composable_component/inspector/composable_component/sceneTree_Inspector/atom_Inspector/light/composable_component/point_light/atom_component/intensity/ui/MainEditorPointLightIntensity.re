open DiffType;

type state = {intensityValue: float};

type action =
  | IntensityBlur(float);

module Method = {
  let blurIntensityEvent = ((store, dispatchFunc), lightComponent, intensity) =>
    PointLightEngineService.getPointLightIntensity(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, intensity) ?
      () :
      PointLightIntensityBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        intensity,
      );

  let changeIntensity = (lightComponent, value) =>
    PointLightEngineService.setPointLightIntensity(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DiffType.PointLight},
       |]);
};

let component = ReasonReact.reducerComponent("MainEditorLightIntensity");

let reducer = ((store, dispatchFunc), lightComponent, action, state) =>
  switch (action) {
  | IntensityBlur(value) =>
    Method.blurIntensityEvent(
      (store, dispatchFunc),
      lightComponent,
      state.intensityValue,
    );

    ReasonReact.Update({...state, intensityValue: value});
  };

let render =
    (
      (store, dispatchFunc),
      lightComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-light-intensity">
    <FloatInput
      defaultValue=(state.intensityValue |> StringService.floatToString)
      label="Intensity"
      onChange=(Method.changeIntensity(lightComponent))
      onBlur=(value => send(IntensityBlur(value)))
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  initialState: () => {
    intensityValue:
      PointLightEngineService.getPointLightIntensity(lightComponent)
      |> StateLogicService.getEngineStateToGetData,
  },
  reducer: reducer((store, dispatchFunc), lightComponent),
  render: self => render((store, dispatchFunc), lightComponent, self),
};