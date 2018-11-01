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

  /* let {materialComponent}: AssetNodeType.materialResultType =
     StateEditorService.getState()
     |> AssetMaterialNodeMapEditorService.unsafeGetResult(addedMaterialNodeId); */
  /* MainEditorMaterialTool.changeMaterial(
       ~sourceMaterial=GameObjectTool.getCurrentGameObjectLightMaterial(),
       ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
       ~targetMaterial=materialComponent,
       ~targetMaterialType=AssetMaterialDataType.LightMaterial,
       ~materialNodeId=Some(addedMaterialNodeId),
       (),
     ); */

  /* MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial(); */

  let materialComponent =
    MainEditorAssetMaterialNodeTool.getMaterialComponent(
      ~nodeId=addedMaterialNodeId,
      (),
    );

  MaterialInspectorTool.changeMaterialType(
    ~material=materialComponent,
    ~sourceMaterialType=AssetMaterialDataType.LightMaterial,
    ~targetMaterialType=AssetMaterialDataType.BasicMaterial,
    ~materialNodeId=addedMaterialNodeId,
    (),
  );

  addedMaterialNodeId;
};