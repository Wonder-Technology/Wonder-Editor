type state = {
  isDirty: bool,
  x: float,
  y: float,
  z: float
};

type action =
  | MakeDirty;

let component = ReasonReact.reducerComponent("transformui");

let make = (~states: AppStore.appState, ~dispatch, _children) => {
  let changeX = (value) => {
    let (x, y, z) =
      MainEditorStateView.prepareState()
      |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;
    let stateTuple =
      MainEditorStateView.prepareState()
      |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((value, y, z));
    MainEditorStateView.finishState(stateTuple);
    MakeDirty
  };
  let changeY = (value) => {
    let (x, y, z) =
      MainEditorStateView.prepareState()
      |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;
    let stateTuple =
      MainEditorStateView.prepareState()
      |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((x, value, z));
    MainEditorStateView.finishState(stateTuple);
    MakeDirty
  };
  let changeZ = (value) => {
    let (x, y, z) =
      MainEditorStateView.prepareState()
      |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;
    let stateTuple =
      MainEditorStateView.prepareState()
      |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((x, y, value));
    MainEditorStateView.finishState(stateTuple);
    MakeDirty
  };
  {
    ...component,
    initialState: () => {
      let (x, y, z) =
        MainEditorStateView.prepareState()
        |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;
      {isDirty: false, x, y, z}
    },
    reducer: (action, state) =>
      switch action {
      | MakeDirty => ReasonReact.Update({...state, isDirty: true})
      },
    render: ({state, handle, reduce}) =>
      <div key="transform" className="transform-component">
        <NumberInput
          label="X"
          defaultValue=(string_of_float(state.x))
          onChange=(reduce(changeX))
        />
        <NumberInput
          label="Y"
          defaultValue=(string_of_float(state.y))
          onChange=(reduce(changeY))
        />
        <NumberInput
          label="Z"
          defaultValue=(string_of_float(state.z))
          onChange=(reduce(changeZ))
        />
      </div>
  }
};