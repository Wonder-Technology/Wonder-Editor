open DiffType;

type state = {shininessValue: float};

type action =
  | ShininessBlur(float);

module Method = {
  let blurShininessEvent = LightMaterialShininessBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let changeShininess = (materialComponent, value) =>
    LightMaterialEngineService.setLightMaterialShininess(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|materialComponent|], type_: DiffType.LightMaterial},
       |]);
};

let component = ReasonReact.reducerComponent("MainEditorMaterialShininess");

let reducer = ((store, dispatchFunc), materialComponent, action, state) =>
  switch (action) {
  | ShininessBlur(value) =>
    Method.blurShininessEvent(
      (store, dispatchFunc),
      materialComponent,
      state.shininessValue,
    );

    ReasonReact.Update({...state, shininessValue: value});
  };

let render =
    (
      (store, dispatchFunc),
      materialComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-light-shininess">
    <FloatInput
      defaultValue=(state.shininessValue |> StringService.floatToString)
      label="Shininess"
      onChange=(Method.changeShininess(materialComponent))
      onBlur=(value => send(ShininessBlur(value)))
    />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  initialState: () => {
    shininessValue:
      LightMaterialEngineService.getLightMaterialShininess(materialComponent)
      |> StateLogicService.getEngineStateToGetData,
  },
  reducer: reducer((store, dispatchFunc), materialComponent),
  render: self => render((store, dispatchFunc), materialComponent, self),
};