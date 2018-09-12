

type state = {componentValueForUndo: float};

type action =
  | TriggerBlur(float);

let component =
  ReasonReact.reducerComponent("MainEditorFloatInputBaseComponent");

let reducer = (blurValueFunc, action, state) =>
  switch (action) {
  | TriggerBlur(value) =>
    blurValueFunc(state.componentValueForUndo);

    ReasonReact.Update({...state, componentValueForUndo: value});
  };

let render =
    (
      label,
      changeComponentValueFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-floatInput-base">
    <FloatInput
      defaultValue=(state.componentValueForUndo |> StringService.floatToString)
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
    componentValueForUndo:
      getComponentValueFunc
      |> StateLogicService.getEngineStateToGetData
      |. FloatService.truncateFloatValue(5),
  },
  reducer: reducer(blurValueFunc),
  render: self => render(label, changeComponentValueFunc, self),
};