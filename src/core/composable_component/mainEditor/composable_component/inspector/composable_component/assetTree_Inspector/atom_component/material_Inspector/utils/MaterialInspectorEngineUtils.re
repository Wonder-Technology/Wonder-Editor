open MaterialDataAssetType;

let _createSphereAddIntoTargetGameObject =
    (material, addMaterialFunc, parentGameObject, inspectorEngineState) => {
  let (inspectorEngineState, sphere) =
    inspectorEngineState
    |> PrimitiveEngineService.createSphere(material, addMaterialFunc);

  inspectorEngineState
  |> GameObjectEngineService.initGameObject(sphere)
  |> HierarchyGameObjectEngineService.addChild(parentGameObject, sphere);
};

let _createBasicMaterialSphere =
    (materialComponent, parentGameObject, engineState, inspectorEngineState) => {
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
       parentGameObject,
     );
};

let _createLightMaterialSphere =
    (materialComponent, parentGameObject, engineState, inspectorEngineState) => {
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
       parentGameObject,
     );
};

let createMaterialSphereInInspectorCanvas = (type_, materialComponent) => {
  let engineState = StateEngineService.unsafeGetState();
  let inspectorEngineState = StateInspectorEngineService.unsafeGetState();
  let parentGameObject =
    ParentGameObjectInspectorCanvasEditorService.unsafeGetParentGameObject
    |> StateLogicService.getEditorState;

  let inspectorEngineState =
    switch (type_) {
    | BasicMaterial =>
      _createBasicMaterialSphere(
        materialComponent,
        parentGameObject,
        engineState,
        inspectorEngineState,
      )

    | LightMaterial =>
      _createLightMaterialSphere(
        materialComponent,
        parentGameObject,
        engineState,
        inspectorEngineState,
      )
    };

  inspectorEngineState
  |> StateLogicService.refreshInspectorEngineState
  |> ignore;
};