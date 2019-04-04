type state = {materialType: MaterialDataAssetType.materialType};

type action =
  | ChangeMaterialType(int);

module Method = {
  let changeMaterialType = InspectorChangeMaterialTypeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("MaterialInspector");

let reducer =
    (
      (uiState, dispatchFunc),
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
        (uiState, dispatchFunc),
        (currentNodeId, materialComponent),
        (sourceMaterialType, targetMaterialType),
      )
    );
  };

let render =
    (
      (uiState, dispatchFunc),
      (name, type_, materialComponent),
      renameFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MaterialInspector" className="wonder-material-inspector">
    <h1> {DomHelper.textEl("Material")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "material-name-describe",
          languageType,
        )
      }
      defaultValue=name
      onBlur=renameFunc
      canBeNull=false
    />
    <Select
      label="Type"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "material-type-describe",
          languageType,
        )
      }
      options={MainEditorMaterialUtils.getMaterialOptions()}
      selectedKey={
        state.materialType |> MainEditorMaterialType.convertMaterialTypeToInt
      }
      onChange={value => send(ChangeMaterialType(value))}
    />
    {
      switch (state.materialType) {
      | BasicMaterial =>
        <MainEditorBasicMaterial
          uiState
          dispatchFunc
          materialComponent
          isShowInspectorCanvas=true
        />

      | LightMaterial =>
        <MainEditorLightMaterial
          uiState
          dispatchFunc
          materialComponent
          isShowInspectorCanvas=true
        />
      }
    }
  </article>;
};

let make =
    (
      ~uiState,
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
    reducer((uiState, dispatchFunc), (currentNodeId, materialComponent)),
  render: self =>
    render(
      (uiState, dispatchFunc),
      (name, type_, materialComponent),
      renameFunc,
      self,
    ),
  didMount: _self =>
    MaterialInspectorEngineUtils.createMaterialSphereInToInspectorCanvas(
      type_,
      materialComponent,
    ),
  willUnmount: _self =>
    (
      StateEditorService.getState(),
      StateInspectorEngineService.unsafeGetState(),
    )
    |> InspectorEngineGameObjectLogicService.removeInspectorEngineParentGameObjectAllChild,
};