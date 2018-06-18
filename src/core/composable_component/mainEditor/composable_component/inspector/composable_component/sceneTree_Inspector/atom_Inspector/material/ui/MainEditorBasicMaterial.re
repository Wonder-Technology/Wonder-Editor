type retainedProps = {
  color: string,
  map: option(int),
};

module Method = {
  let setMaterialColor = MainEditorMaterialMarkRedoUndoEventHandler.MakeEventHandler.onMarkRedoUndoByLastStack;
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorBasicMaterial");

let render =
    (
      (store, dispatchFunc),
      materialComponent,
      { retainedProps}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-inspector-material">
    <StringInput
      defaultValue=retainedProps.color
      label="color"
      onBlur=(
        Method.setMaterialColor((store, dispatchFunc), materialComponent)
      )
    />
    (
      switch (retainedProps.map) {
      | None => <div className=""> (DomHelper.textEl("drag texture")) </div>
      | Some(map) =>
        WonderLog.Log.print(map) |> ignore;
        ReasonReact.nullElement;
      }
    )
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

    {
      color: "#ffffff",
      map:
        BasicMaterialEngineService.getMap(materialComponent)
        |> StateLogicService.getEngineStateToGetData,
    };
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), materialComponent, self),
};