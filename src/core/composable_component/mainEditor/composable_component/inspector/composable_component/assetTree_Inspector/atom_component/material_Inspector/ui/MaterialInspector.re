type state = {materialType: MaterialDataAssetType.materialType};

type action =
  | ChangeMaterialType(int);

module Method = {
  let changeMaterialType = InspectorChangeMaterialTypeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("MaterialInspector");

let reducer =
    (
      (store, dispatchFunc),
      (currentNodeId, materialComponent),
      action,
      state,
    ) =>
  switch (action) {
  | ChangeMaterialType(value) =>
    let sourceMaterialType = state.materialType;
    let targetMaterialType =
      value |> MainEditorMaterialType.convertIntToMaterialType;

    ReasonReactUtils.sideEffects(() =>
      Method.changeMaterialType(
        (store, dispatchFunc),
        (currentNodeId, materialComponent),
        (sourceMaterialType, targetMaterialType),
      )
    );
  };

let render =
    (
      (store, dispatchFunc),
      (name, type_, materialComponent),
      renameFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="MaterialInspector" className="wonder-material-inspector">
    <h1> (DomHelper.textEl("Material")) </h1>
    <hr />
    <StringInput
      label="Name"
      defaultValue=name
      onBlur=renameFunc
      canBeNull=false
    />
    <Select
      label="Type"
      options=(MainEditorMaterialUtils.getMaterialOptions())
      selectedKey=(
        state.materialType |> MainEditorMaterialType.convertMaterialTypeToInt
      )
      onChange=(value => send(ChangeMaterialType(value)))
    />
    (
      switch (state.materialType) {
      | BasicMaterial =>
        <MainEditorBasicMaterial store dispatchFunc materialComponent />

      | LightMaterial =>
        <MainEditorLightMaterial store dispatchFunc materialComponent />
      }
    )
  </article>;

let make =
    (
      ~store,
      ~dispatchFunc,
      ~currentNodeId,
      ~name,
      ~type_,
      ~materialComponent,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {materialType: type_},
  reducer:
    reducer((store, dispatchFunc), (currentNodeId, materialComponent)),
  render: self =>
    render(
      (store, dispatchFunc),
      (name, type_, materialComponent),
      renameFunc,
      self,
    ),
};