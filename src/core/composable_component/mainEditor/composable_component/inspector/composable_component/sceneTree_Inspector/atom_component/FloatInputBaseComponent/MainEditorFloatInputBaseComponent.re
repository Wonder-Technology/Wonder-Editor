open DiffType;

/* TODO rename to componentValueForUndo */
type state = {componentValue: float};

type action =
  | TriggerBlur(float);

let component = ReasonReact.reducerComponent("MainEditorFloatInputBaseComponent");

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
  <article className="wonder-floatInput-base">
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