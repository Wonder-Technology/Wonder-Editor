type retainedProps = {color: string};

module Method = {
  let getCurrentGameObjectColor = (materialComponent) =>
    MainEditorStateView.prepareState()
    |> MainEditorMaterialView.getCurrentGameObjectBasicMaterialColor(materialComponent);
  let setCurrentGameObjectColor = (materialComponent) =>
    MainEditorStateView.prepareState()
    |> MainEditorMaterialView.setCurrentGameObjectBasicMaterialColor(
         materialComponent,
         [|0.4, 0.6, 0.7|]
       )
    |> MainEditorStateView.finishState;
  let onBlur = (materialComponent, value) => {
    WonderLog.Log.print(value) |> ignore;
    setCurrentGameObjectColor(materialComponent)
  };
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorMaterial");

let render = (store, dispatch, materialComponent, self: ReasonReact.self('a, 'b, 'c)) =>
  <article className="transform-component">
    <StringInput
      defaultValue=self.retainedProps.color
      label="color"
      onBlur=(Method.onBlur(materialComponent))
    />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, ~materialComponent, _children) => {
  ...component,
  retainedProps: {
    let color = Method.getCurrentGameObjectColor(materialComponent);
    WonderLog.Log.print(color) |> ignore;
    {color: "#ffffff"}
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, materialComponent, self)
};