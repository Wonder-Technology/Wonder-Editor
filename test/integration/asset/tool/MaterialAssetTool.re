let addOneLightMaterial = () => {
  let assetTreeData =
    MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();
  let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

  MainEditorAssetHeaderOperateNodeTool.addMaterial();

  addedMaterialNodeId;
};

let addOneBasicMaterial = () => {
  let assetTreeData =
    MainEditorAssetTreeTool.BuildAssetTree.Material.buildOneMaterialAssetTree();
  let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

  MainEditorAssetHeaderOperateNodeTool.addMaterial();

  /* let {materialComponent}: NodeAssetType.materialResultType =
     StateEditorService.getState()
     |> MaterialNodeMapAssetEditorService.unsafeGetResult(addedMaterialNodeId); */
  /* MainEditorMaterialTool.changeMaterial(
       ~sourceMaterial=GameObjectTool.getCurrentSceneTreeNodeLightMaterial(),
       ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
       ~targetMaterial=materialComponent,
       ~targetMaterialType=MaterialDataAssetType.LightMaterial,
       ~materialNodeId=Some(addedMaterialNodeId),
       (),
     ); */

  /* MainEditorBasicMaterialForGameObjectTool.changeMaterialTypeToBeBasicMaterial(); */

  let materialComponent =
    MainEditorAssetMaterialNodeTool.getMaterialComponent(
      ~nodeId=addedMaterialNodeId,
      (),
    );

  MaterialInspectorTool.changeMaterialType(
    ~material=materialComponent,
    ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
    ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
    ~materialNodeId=addedMaterialNodeId,
    (),
  );

  addedMaterialNodeId;
};