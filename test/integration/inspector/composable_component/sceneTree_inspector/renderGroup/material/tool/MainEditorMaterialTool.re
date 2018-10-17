let changeMaterial =
    (
      ~sourceMaterial,
      ~sourceMaterialType,
      ~targetMaterial,
      ~targetMaterialType,
      ~materialNodeId,
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorMaterial.Method.changeMaterial(
    (store, dispatchFunc),
    gameObject,
    (
      materialNodeId,
      (sourceMaterial, targetMaterial),
      (sourceMaterialType, targetMaterialType),
    ),
  );

let getDefaultBasicMaterialName = PrepareDefaultComponentUtils.getDefaultBasicMaterialName;

let getDefaultLightMaterialName = PrepareDefaultComponentUtils.getDefaultLightMaterialName;