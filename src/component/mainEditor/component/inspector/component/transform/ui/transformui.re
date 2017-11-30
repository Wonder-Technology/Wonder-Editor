type state = {isDirty: bool};

type action =
  | MakeDirty;

let component = ReasonReact.reducerComponent("transformui");

let make = (~states: AppStore.appState, ~dispatch, _children) => {
  let changeX = (value) => {
    let stateTuple =
      MainEditorStateView.prepareState()
      |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition;
    MainEditorStateView.finishState(stateTuple);
    MakeDirty
  };
  {
    ...component,
    initialState: () => {isDirty: false},
    reducer: (action, state) =>
      switch action {
      | MakeDirty => ReasonReact.Update({isDirty: true})
      },
    render: ({state, handle, reduce}) => {
      let (x, y, z) =
        MainEditorStateView.prepareState()
        |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;
      Js.log(x);
      Js.log(y);
      Js.log(z);
      <div key="transform" className="transform-component">
        <NumberInput label="X" defaultValue=(string_of_float(21.4)) onChange=(reduce(changeX)) />
        <NumberInput label="Y" defaultValue=(string_of_float(y)) />
        <NumberInput label="Z" defaultValue=(string_of_float(z)) />
      </div>
    }
  }
};