type state = {materialType: MaterialDataAssetType.materialType};

type action =
  | ChangeMaterialType(int);

module Method = {
  let changeMaterialType = InspectorChangeMaterialTypeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let didMount = (type_, materialComponent) => {
    InspectorCanvasUtils.showInspectorCanvas();

    Console.tryCatch(
      () => {
        let (editorState, (inspectorEngineState, sphere)) =
          MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
            type_,
            materialComponent,
            StateEditorService.getState(),
            StateEngineService.unsafeGetState(),
            StateInspectorEngineService.unsafeGetState(),
          );

        editorState
        |> MaterialSphereInspectorCanvasEditorService.setMaterialSphereGameObjectInInspectorCanvas(
             sphere,
           )
        |> StateEditorService.setState
        |> ignore;
        inspectorEngineState |> StateLogicService.refreshInspectorEngineState;
      },
      e => Console.throwFatal(e) |> ignore,
    );
  };

  let _doesUpdateSnapshot =
      (currentNodeId, (editorState, inspectorEngineState)) =>
    OperateTreeAssetEditorService.isNodeExistById(currentNodeId, editorState)
    && MaterialSphereInspectorCanvasEditorService.isExistInContainer(
         editorState,
         inspectorEngineState,
       );

  let willUnmount = (currentNodeId, dispatchFunc) => {
    InspectorCanvasUtils.restoreArcballCameraControllerAngle
    |> StateLogicService.getInspectorEngineStateToGetData
    |> StateLogicService.refreshInspectorEngineState;

    InspectorCanvasUtils.hideInspectorCanvas();

    _doesUpdateSnapshot(
      currentNodeId,
      (
        StateEditorService.getState(),
        StateInspectorEngineService.unsafeGetState(),
      ),
    ) ?
      InspectorCanvasUtils.updateSnapshot(
        currentNodeId,
        (
          ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNodeId,
          dispatchFunc,
        ),
      ) :
      ();

    (
      StateEditorService.getState(),
      StateInspectorEngineService.unsafeGetState(),
    )
    |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
    |> StateInspectorEngineService.setState
    |> ignore;

    MaterialSphereInspectorCanvasEditorService.removeMaterialSphereGameObjectInInspectorCanvas
    |> StateLogicService.getAndSetEditorState;
  };
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
      (name, type_, currentNodeId, materialComponent),
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
        <MainEditorBasicMaterialForAsset
          uiState
          dispatchFunc
          materialComponent
          currentNodeId
        />

      | LightMaterial =>
        <MainEditorLightMaterialForAsset
          uiState
          dispatchFunc
          materialComponent
          currentNodeId
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
      (name, type_, currentNodeId, materialComponent),
      renameFunc,
      self,
    ),
  didMount: _self => Method.didMount(type_, materialComponent),
  willUnmount: _self => Method.willUnmount(currentNodeId, dispatchFunc),
};