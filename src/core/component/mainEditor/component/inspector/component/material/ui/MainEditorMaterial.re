type retainedProps = {color: string};

module Method = {
  let setMaterialColor = MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndo;
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorMaterial");

let render = (store, dispatch, materialComponent, self: ReasonReact.self('a, 'b, 'c)) =>
  <article className="transform-component">
    <StringInput
      defaultValue=self.retainedProps.color
      label="color"
      onBlur=(Method.setMaterialColor((store, dispatch), materialComponent))
    />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, ~materialComponent, _children) => {
  ...component,
  retainedProps: {
    let color =
      StateEngineService.getState() |> BasicMaterialEngineService.getColor(materialComponent);
    WonderLog.Log.print(color) |> ignore;
    {color: "#ffffff"}
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, materialComponent, self)
};