type state = {
  isDirty: bool,
  defaultX: string,
  defaultY: string,
  defaultZ: string
};

type action =
  | MarkDirty;

let _getLocalPosition = () => {
  MainEditorStateView.prepareState() |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition
};

let _setLocalPosition = (x, y, z) =>
  MainEditorStateView.prepareState()
  |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((x, y, z))
  |> MainEditorStateView.finishState;

let component = ReasonReact.reducerComponent("MainEditorInspectorTransform");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  let changeX = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(value, y, z);
    MarkDirty
  };
  let changeY = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(x, value, z);
    MarkDirty
  };
  let changeZ = (value) => {
    let (x, y, z) = _getLocalPosition();
    _setLocalPosition(x, y, value);
    MarkDirty
  };
  {
    ...component,
    initialState: () => {
      let (defaultX, defaultY, defaultZ) = _getLocalPosition();
      {isDirty: false, defaultX:string_of_float(defaultX), defaultY: string_of_float(defaultY), defaultZ: string_of_float(defaultZ)}
    },
    reducer: (action, state) =>
      switch action {
      | MarkDirty => ReasonReact.Update({...state, isDirty: true})
      },
    render: ({state, reduce}) =>
      <div key="transform" className="transform-component">
        <NumberInput
          label="X"
          defaultValue=state.defaultX
          onChange=(reduce(changeX))
        />
        <NumberInput
          label="Y"
          defaultValue=state.defaultY
          onChange=(reduce(changeY))
        />
        <NumberInput
          label="Z"
          defaultValue=state.defaultZ
          onChange=(reduce(changeZ))
        />
      </div>
  }
};