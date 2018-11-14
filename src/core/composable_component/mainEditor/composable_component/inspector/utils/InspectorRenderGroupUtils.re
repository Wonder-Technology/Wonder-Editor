open AssetMaterialDataType;

open Wonderjs;

open RenderGroupType;

let _getMaterialHandleFuncByType = materialType =>
  switch (materialType) {
  | BasicMaterial => (
      GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
      GameObjectComponentEngineService.removeBasicMaterialComponent,
    )

  | LightMaterial => (
      GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
      GameObjectComponentEngineService.removeLightMaterialComponent,
    )
  };

let disposeRenderGroup = (gameObject, materialType, engineState) => {
  let (getMaterialFunc, removeMaterialFunc) =
    _getMaterialHandleFuncByType(materialType);

  engineState
  |> RenderGroupEngineService.disposeRenderGroupComponents(
       gameObject,
       RenderGroupEngineService.getRenderGroupComponents(
         gameObject,
         (
           GameObjectComponentEngineService.unsafeGetMeshRendererComponent,
           getMaterialFunc,
         ),
         engineState,
       ),
       (
         GameObjectComponentEngineService.disposeMeshRendererComponent,
         removeMaterialFunc,
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

module Remove = {
  let _getOperateSourceRenderGroupData =
      (materialType, gameObject, engineStateToGetData) =>
    switch (materialType) {
    | BasicMaterial => (
        engineStateToGetData
        |> RenderGroupEngineService.getRenderGroupComponents(
             gameObject,
             (
               GameObjectComponentEngineService.unsafeGetMeshRendererComponent,
               GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
             ),
           ),
        GameObjectComponentEngineService.removeBasicMaterialComponent,
      )
    | LightMaterial => (
        engineStateToGetData
        |> RenderGroupEngineService.getRenderGroupComponents(
             gameObject,
             (
               GameObjectComponentEngineService.unsafeGetMeshRendererComponent,
               GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
             ),
           ),
        GameObjectComponentEngineService.removeLightMaterialComponent,
      )
    };

  let _getOperateTargetRenderGroupData =
      (meshRenderer, materialType, engineState) =>
    switch (materialType) {
    | BasicMaterial =>
      let (engineState, material) =
        BasicMaterialEngineService.create(engineState);

      (
        engineState,
        RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
        GameObjectComponentEngineService.addBasicMaterialComponent,
      );
    | LightMaterial =>
      let (engineState, material) =
        LightMaterialEngineService.create(engineState);

      (
        engineState,
        RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
        GameObjectComponentEngineService.addLightMaterialComponent,
      );
    };

  let replaceMaterialByMaterialType =
      (gameObject, sourceMateralType, targetMaterialType, engineState) => {
    let (sourceRenderGroup, removeSourceMaterialFunc) =
      _getOperateSourceRenderGroupData(
        sourceMateralType,
        gameObject,
        engineState,
      );

    let (engineState, targetRenderGroup, addTargetMaterialFunc) =
      _getOperateTargetRenderGroupData(
        sourceRenderGroup.meshRenderer,
        targetMaterialType,
        engineState,
      );

    engineState
    |> RenderGroupEngineService.replaceMaterial(
         (sourceRenderGroup, targetRenderGroup),
         gameObject,
         (removeSourceMaterialFunc, addTargetMaterialFunc),
       );

    engineState;
  };

  let replaceMaterialByMaterialData =
      (
        gameObject,
        (
          (sourceMaterial, targetMaterial),
          (sourceMaterialType, targetMaterialType),
        ),
        engineState,
      ) => {
    let meshRenderer =
      GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
        gameObject,
        engineState,
      );
    let sourceRenderGroup =
      RenderGroupEngineService.buildRenderGroup(meshRenderer, sourceMaterial);
    let targetRenderGroup =
      RenderGroupEngineService.buildRenderGroup(meshRenderer, targetMaterial);

    let removeSourceMaterialFunc =
      switch (sourceMaterialType) {
      | BasicMaterial => GameObjectComponentEngineService.removeBasicMaterialComponent
      | LightMaterial => GameObjectComponentEngineService.removeLightMaterialComponent
      };
    let addTargetMaterialFunc =
      switch (targetMaterialType) {
      | BasicMaterial => GameObjectComponentEngineService.addBasicMaterialComponent
      | LightMaterial => GameObjectComponentEngineService.addLightMaterialComponent
      };

    let engineState =
      engineState
      |> RenderGroupEngineService.replaceMaterial(
           (sourceRenderGroup, targetRenderGroup),
           gameObject,
           (removeSourceMaterialFunc, addTargetMaterialFunc),
         );

    engineState;
  };
};

module Dispose = {
  let _getOperateSourceRenderGroupData =
      (meshRenderer, material, materialType, engineState) =>
    switch (materialType) {
    | BasicMaterial => (
        RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
        GameObjectComponentEngineService.disposeBasicMaterialComponent,
      )
    | LightMaterial => (
        RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
        GameObjectComponentEngineService.disposeLightMaterialComponent,
      )
    };

  let _getOperateTargetRenderGroupData =
      (meshRenderer, material, materialType, engineState) =>
    switch (materialType) {
    | BasicMaterial => (
        engineState,
        RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
        GameObjectComponentEngineService.addBasicMaterialComponent,
      )
    | LightMaterial => (
        engineState,
        RenderGroupEngineService.buildRenderGroup(meshRenderer, material),
        GameObjectComponentEngineService.addLightMaterialComponent,
      )
    };

  let replaceMaterial =
      (
        gameObject,
        (
          (sourceMaterial, targetMaterial),
          (sourceMaterialType, targetMaterialType),
        ),
        engineState,
      ) => {
    let meshRenderer =
      GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
        gameObject,
        engineState,
      );

    let (sourceRenderGroup, disposeSourceMaterialFunc) =
      _getOperateSourceRenderGroupData(
        meshRenderer,
        sourceMaterial,
        sourceMaterialType,
        engineState,
      );

    let (engineState, targetRenderGroup, addTargetMaterialFunc) =
      _getOperateTargetRenderGroupData(
        meshRenderer,
        targetMaterial,
        targetMaterialType,
        engineState,
      );

    engineState
    |> RenderGroupEngineService.replaceMaterial(
         (sourceRenderGroup, targetRenderGroup),
         gameObject,
         (disposeSourceMaterialFunc, addTargetMaterialFunc),
       );
  };

  let replaceGameObjectsMaterialsOfTheMaterial =
      (
        (
          (sourceMaterial, targetMaterial),
          (sourceMaterialType, targetMaterialType),
        ),
        engineState,
      ) =>
    switch (
      MainEditorMaterialUtils.getGameObjectsByType(
        sourceMaterial,
        sourceMaterialType,
        engineState,
      )
    ) {
    | None =>
      /* TODO dispose material */
      engineState
    | Some(gameObjects) =>
      let engineState =
        gameObjects
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. engineState, gameObject) =>
               replaceMaterial(
                 gameObject,
                 (
                   (sourceMaterial, targetMaterial),
                   (sourceMaterialType, targetMaterialType),
                 ),
                 engineState,
               ),
             engineState,
           );

      engineState;
    };
};