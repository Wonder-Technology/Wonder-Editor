open MaterialDataAssetType;

let _createSphereWithClonedMaterial =
    (material, addMaterialFunc, containerGameObject, inspectorEngineState) => {
  let (inspectorEngineState, sphere) =
    inspectorEngineState
    |> PrimitiveEngineService.createSphere(material, addMaterialFunc);

  inspectorEngineState
  |> GameObjectEngineService.initGameObject(sphere)
  |> HierarchyGameObjectEngineService.addChild(containerGameObject, sphere);
};

let _createBasicMaterialSphereIntoInspectorCanvas =
    (
      materialComponent,
      containerGameObject,
      engineState,
      inspectorEngineState,
    ) => {
  let (basicMaterial, inspectorEngineState) =
    CloneMaterialEngineLogicService.cloneBasicMaterialToOtherEngineState(
      materialComponent,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> _createSphereWithClonedMaterial(
       basicMaterial,
       GameObjectComponentEngineService.addBasicMaterialComponent,
       containerGameObject,
     );
};

let _createLightMaterialSphereIntoInspectorCanvas =
    (
      materialComponent,
      containerGameObject,
      engineState,
      inspectorEngineState,
    ) => {
  let (lightMaterial, inspectorEngineState) =
    CloneMaterialEngineLogicService.cloneLightMaterialToOtherEngineState(
      materialComponent,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> _createSphereWithClonedMaterial(
       lightMaterial,
       GameObjectComponentEngineService.addLightMaterialComponent,
       containerGameObject,
     );
};

let createMaterialSphereIntoInspectorCanvas =
    (
      type_,
      materialComponent,
      (editorState, engineState),
      inspectorEngineState,
    ) => {
  let containerGameObject =
    editorState
    |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;

  switch (type_) {
  | BasicMaterial =>
    _createBasicMaterialSphereIntoInspectorCanvas(
      materialComponent,
      containerGameObject,
      engineState,
      inspectorEngineState,
    )

  | LightMaterial =>
    _createLightMaterialSphereIntoInspectorCanvas(
      materialComponent,
      containerGameObject,
      engineState,
      inspectorEngineState,
    )
  };
};