type retainedProps = {color: string};

module Method = {
  let setMaterialColor = MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByLastStack;
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorBasicMaterial");

let render =
    (
      (store, dispatchFunc),
      materialComponent,
      self: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-inspector-material">
    <StringInput
      defaultValue=self.retainedProps.color
      label="color"
      onBlur=(
        Method.setMaterialColor((store, dispatchFunc), materialComponent)
      )
    />
  </article>;

let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  retainedProps: {
    let color =
      BasicMaterialEngineService.getColor(materialComponent)
      |> StateLogicService.getEngineStateToGetData;
    {color: "#ffffff"};
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), materialComponent, self),
};