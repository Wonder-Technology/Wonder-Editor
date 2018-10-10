type state = {materialType: MaterialType.materialType};

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

    ReasonReactUtils.updateWithSideEffects(
      {...state, materialType: targetMaterialType}, state =>
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
    <div className="">
      <h1> (DomHelper.textEl("Material")) </h1>
      <hr />
      <StringInput
        label="name"
        defaultValue=name
        onBlur=renameFunc
        canBeNull=false
      />
      <div className="inspector-material">
        <div className="">
          <Select
            label="shader"
            options=(MainEditorMaterialUtils.getMaterialOptions())
            selectedKey=(
              state.materialType
              |> MainEditorMaterialType.convertMaterialTypeToInt
            )
            onChange=(value => send(ChangeMaterialType(value)))
          />
        </div>
        <div className="">
          (
            switch (state.materialType) {
            | BasicMaterial =>
              <MainEditorBasicMaterial store dispatchFunc materialComponent />

            | LightMaterial =>
              <MainEditorLightMaterial store dispatchFunc materialComponent />
            }
          )
        </div>
      </div>
    </div>
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