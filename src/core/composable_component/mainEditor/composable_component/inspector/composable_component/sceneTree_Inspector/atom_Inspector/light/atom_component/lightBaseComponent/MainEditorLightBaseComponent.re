open DiffType;

type state = {componentValue: float};

type action =
  | TriggerBlur(float);

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

let component = ReasonReact.reducerComponent("MainEditorLightBaseComponent");

let reducer = (blurValueFunc, action, state) =>
  switch (action) {
  | TriggerBlur(value) =>
    blurValueFunc(state.componentValue);

    ReasonReact.Update({...state, componentValue: value});
  };

let render =
    (
      label,
      changeComponentValueFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-light-base">
    <FloatInput
      defaultValue=(state.componentValue |> StringService.floatToString)
      label
      onChange=changeComponentValueFunc
      onBlur=(value => send(TriggerBlur(value)))
    />
  </article>;

let make =
    (
      ~label,
      ~getComponentValueFunc,
      ~changeComponentValueFunc,
      ~blurValueFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    componentValue:
      getComponentValueFunc
      |> StateLogicService.getEngineStateToGetData
      |. FloatService.truncateFloatValue(5),
  },
  reducer: reducer(blurValueFunc),
  render: self => render(label, changeComponentValueFunc, self),
};