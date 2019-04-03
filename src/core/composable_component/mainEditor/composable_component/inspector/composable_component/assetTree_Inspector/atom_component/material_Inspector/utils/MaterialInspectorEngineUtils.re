open MaterialDataAssetType;

let _createSphereAddIntoScene =
    (material, addMaterialFunc, inspectorEngineState) => {
  let (inspectorEngineState, sphere) =
    inspectorEngineState
    |> PrimitiveEngineService.createSphere(material, addMaterialFunc);

  inspectorEngineState
  |> GameObjectEngineService.initGameObject(sphere)
  |> SceneEngineService.addSceneChild(sphere);
};

let _createBasicMaterialSphere =
    (materialComponent, engineState, inspectorEngineState) => {
  let (basicMaterial, inspectorEngineState) =
    CloneMaterialEngineLogicService.cloneBasicMaterialToOtherEngine(
      materialComponent,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> _createSphereAddIntoScene(
       basicMaterial,
       GameObjectComponentEngineService.addBasicMaterialComponent,
     );
};

let _createLightMaterialSphere =
    (materialComponent, engineState, inspectorEngineState) => {
  let (lightMaterial, inspectorEngineState) =
    CloneMaterialEngineLogicService.cloneLightMaterialToOtherEngine(
      materialComponent,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> _createSphereAddIntoScene(
       lightMaterial,
       GameObjectComponentEngineService.addLightMaterialComponent,
     );
};

let createMaterialSphereInInspectorCanvas = (type_, materialComponent) => {
  let engineState = StateEngineService.unsafeGetState();
  let inspectorEngineState = StateInspectorEngineService.unsafeGetState();

  let inspectorEngineState =
    switch (type_) {
    | BasicMaterial =>
      _createBasicMaterialSphere(
        materialComponent,
        engineState,
        inspectorEngineState,
      )

    | LightMaterial =>
      _createLightMaterialSphere(
        materialComponent,
        engineState,
        inspectorEngineState,
      )
    };

  inspectorEngineState
  |> StateLogicService.refreshInspectorEngineState
  |> ignore;
};