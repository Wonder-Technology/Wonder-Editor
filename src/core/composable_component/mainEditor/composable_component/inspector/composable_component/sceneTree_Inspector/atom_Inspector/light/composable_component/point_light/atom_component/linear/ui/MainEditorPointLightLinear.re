open DiffType;

type state = {constantValue: float};

type action =
  | ConstantBlur(float);

module Method = {
  let blurConstantEvent = ((store, dispatchFunc), lightComponent, constant) =>
    PointLightEngineService.getPointLightConstant(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, constant) ?
      () :
      PointLightConstantBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        constant,
      );

  let changeConstant = (lightComponent, value) =>
    PointLightEngineService.setPointLightConstant(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DiffType.PointLight},
       |]);
};

let component = ReasonReact.reducerComponent("MainEditorLightConstant");

let reducer = ((store, dispatchFunc), lightComponent, action, state) =>
  switch (action) {
  | ConstantBlur(value) =>
    Method.blurConstantEvent(
      (store, dispatchFunc),
      lightComponent,
      state.constantValue,
    );

    ReasonReact.Update({...state, constantValue: value});
  };

let render =
    (
      (store, dispatchFunc),
      lightComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-light-constant">
    <FloatInput
      defaultValue=(state.constantValue |> StringService.floatToString)
      label="Constant"
      onChange=(Method.changeConstant(lightComponent))
      onBlur=(value => send(ConstantBlur(value)))
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~lightComponent, _children) => {
  ...component,
  initialState: () => {
    constantValue:
      PointLightEngineService.getPointLightConstant(lightComponent)
      |> StateLogicService.getEngineStateToGetData,
  },
  reducer: reducer((store, dispatchFunc), lightComponent),
  render: self => render((store, dispatchFunc), lightComponent, self),
};