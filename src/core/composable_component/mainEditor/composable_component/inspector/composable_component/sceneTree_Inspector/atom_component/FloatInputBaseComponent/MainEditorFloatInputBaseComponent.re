type state = {componentValue: float};

type action =
  | TriggerBlur(float)
  | TriggerDragDrop(float);

let component =
  ReasonReact.reducerComponent("MainEditorFloatInputBaseComponent");

let reducer = ((blurValueFunc, dragDropFunc), action, state) =>
  switch (action) {
  | TriggerBlur(value) =>
    blurValueFunc(state.componentValue);

    ReasonReact.Update({...state, componentValue: value});
  | TriggerDragDrop(value) =>
    dragDropFunc(state.componentValue);

    ReasonReact.Update({...state, componentValue: value});
  };

let render =
    (
      label,
      title,
      changeComponentValueFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <FloatInput
    defaultValue={state.componentValue |> StringService.floatToString}
    label
    title={
      switch (title) {
      | None => ""
      | Some(title) => title
      }
    }
    onChange=changeComponentValueFunc
    onBlur={value => send(TriggerBlur(value))}
    onDragDrop={value => send(TriggerDragDrop(value))}
  />;

let make =
    (
      ~dragDropFunc,
      ~label,
      ~defaultValue,
      ~changeComponentValueFunc,
      ~blurValueFunc,
      ~title: option(string)=?,
      _children,
    ) => {
  ...component,
  initialState: () => {
    componentValue: defaultValue->(FloatService.truncateFloatValue(5)),
  },
  reducer: reducer((blurValueFunc, dragDropFunc)),
  render: self => render(label, title, changeComponentValueFunc, self),
};