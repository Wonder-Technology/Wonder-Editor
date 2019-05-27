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
      editorState,
      engineState,
      inspectorEngineState,
    ) => {
  let (lightMaterial, editorState, inspectorEngineState) =
    CloneMaterialEngineLogicService.cloneLightMaterialToOtherEngineState(
      materialComponent,
      editorState,
      engineState,
      inspectorEngineState,
    );

  (
    editorState,
    inspectorEngineState
    |> _createSphereWithClonedMaterial(
         lightMaterial,
         GameObjectComponentEngineService.addLightMaterialComponent,
         containerGameObject,
       ),
  );
};

let createMaterialSphereIntoInspectorCanvas =
    (type_, materialComponent, editorState, engineState, inspectorEngineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|inspector canvas-> container gameObject -> children is empty|j},
                ~actual={j|not|j},
              ),
              () => {
                let containerGameObject =
                  editorState
                  |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;

                inspectorEngineState
                |> HierarchyGameObjectEngineService.getChildren(
                     containerGameObject,
                   )
                |> Js.Array.length == 0;
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  let containerGameObject =
    editorState
    |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;

  switch (type_) {
  | BasicMaterial => (
      editorState,
      _createBasicMaterialSphereIntoInspectorCanvas(
        materialComponent,
        containerGameObject,
        engineState,
        inspectorEngineState,
      ),
    )

  | LightMaterial =>
    _createLightMaterialSphereIntoInspectorCanvas(
      materialComponent,
      containerGameObject,
      editorState,
      engineState,
      inspectorEngineState,
    )
  };
};