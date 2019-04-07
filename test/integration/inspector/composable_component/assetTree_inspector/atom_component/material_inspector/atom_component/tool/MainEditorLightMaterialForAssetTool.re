let changeShininess =
    (~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(), ~value, ()) =>
  MainEditorLightMaterialForAsset.Method.changeShininess(material, value);

let changeColor = (material, color) =>
  MainEditorLightMaterialForAsset.Method.changeColor(material, color);