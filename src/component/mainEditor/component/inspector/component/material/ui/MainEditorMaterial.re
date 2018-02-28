type retainedProps = {color: string};

module Method = {
  let onBlur = (materialComponent, value) => {
    WonderLog.Log.print(value) |> ignore;
    MainEditorMaterialView.setBasicMaterialColor(materialComponent, [|0.4, 0.6, 0.7|])
    |> OperateStateUtils.getAndSetState
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
    let color =
      MainEditorMaterialView.getBasicMaterialColor(materialComponent) |> OperateStateUtils.getState;
    WonderLog.Log.print(color) |> ignore;
    {color: "#ffffff"}
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, materialComponent, self)
};