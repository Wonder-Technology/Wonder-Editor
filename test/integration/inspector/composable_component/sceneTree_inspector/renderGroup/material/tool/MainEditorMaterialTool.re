let changeMaterial =
    (
      ~sourceMaterial,
      ~sourceMaterialType,
      ~targetMaterial,
      ~targetMaterialType,
      ~materialNodeId,
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorMaterial.Method.changeMaterial(
    (uiState, dispatchFunc),
    gameObject,
    (
      materialNodeId,
      (sourceMaterial, targetMaterial),
      (sourceMaterialType, targetMaterialType),
    ),
  );

let getDefaultBasicMaterialName = PrepareDefaultComponentLogicService.getDefaultBasicMaterialName;

let getDefaultLightMaterialName = PrepareDefaultComponentLogicService.getDefaultLightMaterialName;