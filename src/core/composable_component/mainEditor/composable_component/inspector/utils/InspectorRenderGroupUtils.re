open MainEditorMaterialType;

open Wonderjs;

open RenderGroupType;

let _getMaterialHandleFuncByType = materialType =>
  switch (materialType) {
  | BasicMaterial => (
      GameObjectComponentEngineService.getBasicMaterialComponent,
      GameObjectComponentEngineService.disposeBasicMaterialComponent,
    )

  | LightMaterial => (
      GameObjectComponentEngineService.getLightMaterialComponent,
      GameObjectComponentEngineService.disposeLightMaterialComponent,
    )
  };

let disposeRenderGroup = (gameObject, materialType, engineState) => {
  let (getMaterialFunc, disposeMaterialFunc) =
    _getMaterialHandleFuncByType(materialType);

  engineState
  |> RenderGroupEngineService.disposeRenderGroupComponents(
       gameObject,
       RenderGroupEngineService.getRenderGroupComponents(
         gameObject,
         (
           GameObjectComponentEngineService.getMeshRendererComponent,
           getMaterialFunc,
         ),
         engineState,
       ),
       (
         GameObjectComponentEngineService.disposeMeshRendererComponent,
         disposeMaterialFunc,
       ),
     );
};

let hasRenderGroupComponents = (gameObject, engineState) =>
  engineState
  |> RenderGroupEngineService.hasRenderGroupComponents(
       gameObject,
       (
         GameObjectComponentEngineService.hasMeshRendererComponent,
         GameObjectComponentEngineService.hasBasicMaterialComponent,
       ),
     )
  || engineState
  |> RenderGroupEngineService.hasRenderGroupComponents(
       gameObject,
       (
         GameObjectComponentEngineService.hasMeshRendererComponent,
         GameObjectComponentEngineService.hasLightMaterialComponent,
       ),
     );

let _getOperateSourceRenderGroupFunc =
    (materialType, gameObject, engineStateToGetData) =>
  switch (materialType) {
  | BasicMaterial => (
      (DiffType.MeshRenderer, DiffType.BasicMaterial),
      engineStateToGetData
      |> RenderGroupEngineService.getRenderGroupComponents(
           gameObject,
           (
             GameObjectComponentEngineService.getMeshRendererComponent,
             GameObjectComponentEngineService.getBasicMaterialComponent,
           ),
         ),
      GameObjectComponentEngineService.disposeBasicMaterialComponent,
    )
  | LightMaterial => (
      (DiffType.MeshRenderer, DiffType.LightMaterial),
      engineStateToGetData
      |> RenderGroupEngineService.getRenderGroupComponents(
           gameObject,
           (
             GameObjectComponentEngineService.getMeshRendererComponent,
             GameObjectComponentEngineService.getLightMaterialComponent,
           ),
         ),
      GameObjectComponentEngineService.disposeLightMaterialComponent,
    )
  };

let _getOperateTargetRenderGroupFunc =
    (materialType, editEngineState, runEngineState) =>
  switch (materialType) {
  | BasicMaterial => (
      (DiffType.MeshRenderer, DiffType.BasicMaterial),
      OperateRenderGroupLogicService.createRenderGroup(
        (MeshRendererEngineService.create, BasicMaterialEngineService.create),
        editEngineState,
        runEngineState,
      ),
      GameObjectComponentEngineService.addBasicMaterialComponent,
    )
  | LightMaterial => (
      (DiffType.MeshRenderer, DiffType.LightMaterial),
      OperateRenderGroupLogicService.createRenderGroup(
        (MeshRendererEngineService.create, LightMaterialEngineService.create),
        editEngineState,
        runEngineState,
      ),
      GameObjectComponentEngineService.addLightMaterialComponent,
    )
  };

let _replaceRenderGroup =
    (
      (disposeSourceMaterialFunc, addTargetMaterialFunc),
      sourceMeshRenderer,
      sourceMaterial,
      targetMeshRenderer,
      targetMaterial,
      gameObject,
      state,
    ) =>
  RenderGroupEngineService.replaceRenderGroupComponents(
    (
      {meshRenderer: sourceMeshRenderer, material: sourceMaterial},
      {meshRenderer: targetMeshRenderer, material: targetMaterial},
    ),
    gameObject,
    (disposeSourceMaterialFunc, addTargetMaterialFunc),
    state,
  );

let replaceRenderGroupByMaterialType = (sourceMateralType, targetMaterialType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  let editEngineState = StateLogicService.getEditEngineState();
  let runEngineState = StateLogicService.getRunEngineState();

  let (
    (sourceMeshRendererDiffType, sourceMaterialDiffType),
    sourceRenderGroup,
    disposeSourceMaterialFunc,
  ) =
    _getOperateSourceRenderGroupFunc(
      sourceMateralType,
      gameObject,
      runEngineState,
    );

  let (
    (targetMeshRendererDiffType, targetMaterialDiffType),
    (targetRenderGroup, editEngineState, runEngineState),
    addTargetMaterialFunc,
  ) =
    _getOperateTargetRenderGroupFunc(
      targetMaterialType,
      editEngineState,
      runEngineState,
    );

  let (editEngineState, runEngineState) =
    (editEngineState, runEngineState)
    |> StateLogicService.handleFuncWithDiff(
         [|
           {
             arguments: [|sourceRenderGroup.meshRenderer|],
             type_: sourceMeshRendererDiffType,
           },
           {
             arguments: [|sourceRenderGroup.material|],
             type_: sourceMaterialDiffType,
           },
           {
             arguments: [|targetRenderGroup.meshRenderer|],
             type_: targetMeshRendererDiffType,
           },
           {
             arguments: [|targetRenderGroup.material|],
             type_: targetMaterialDiffType,
           },
           {arguments: [|gameObject|], type_: DiffType.GameObject},
         |],
         _replaceRenderGroup((
           disposeSourceMaterialFunc,
           addTargetMaterialFunc,
         )),
       );

  runEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;

  editEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;
};