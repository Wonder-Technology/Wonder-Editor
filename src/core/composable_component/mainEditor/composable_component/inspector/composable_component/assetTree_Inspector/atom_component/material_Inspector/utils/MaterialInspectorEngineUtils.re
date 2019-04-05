open MaterialDataAssetType;

let _createSphereAddIntoTargetGameObject =
    (material, addMaterialFunc, containerGameObject, inspectorEngineState) => {
  let (inspectorEngineState, sphere) =
    inspectorEngineState
    |> PrimitiveEngineService.createSphere(material, addMaterialFunc);

  inspectorEngineState
  |> GameObjectEngineService.initGameObject(sphere)
  |> HierarchyGameObjectEngineService.addChild(containerGameObject, sphere);
};

let _createBasicMaterialSphere =
    (materialComponent, containerGameObject, engineState, inspectorEngineState) => {
  let (basicMaterial, inspectorEngineState) =
    CloneMaterialEngineLogicService.cloneBasicMaterialToOtherEngine(
      materialComponent,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> _createSphereAddIntoTargetGameObject(
       basicMaterial,
       GameObjectComponentEngineService.addBasicMaterialComponent,
       containerGameObject,
     );
};

let _createLightMaterialSphere =
    (materialComponent, containerGameObject, engineState, inspectorEngineState) => {
  let (lightMaterial, inspectorEngineState) =
    CloneMaterialEngineLogicService.cloneLightMaterialToOtherEngine(
      materialComponent,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> _createSphereAddIntoTargetGameObject(
       lightMaterial,
       GameObjectComponentEngineService.addLightMaterialComponent,
       containerGameObject,
     );
};

let createMaterialSphereIntoInspectorCanvas = (type_, materialComponent) => {
  let engineState = StateEngineService.unsafeGetState();
  let inspectorEngineState = StateInspectorEngineService.unsafeGetState();
  let containerGameObject =
    ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject
    |> StateLogicService.getEditorState;

  let inspectorEngineState =
    switch (type_) {
    | BasicMaterial =>
      _createBasicMaterialSphere(
        materialComponent,
        containerGameObject,
        engineState,
        inspectorEngineState,
      )

    | LightMaterial =>
      _createLightMaterialSphere(
        materialComponent,
        containerGameObject,
        engineState,
        inspectorEngineState,
      )
    };

  inspectorEngineState
  |> StateLogicService.refreshInspectorEngineState
  |> ignore;
};