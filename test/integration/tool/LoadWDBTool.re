let getBoxTexturedMeshGameObjects = engineState =>
  engineState
  |> GameObjectEngineService.getAllGameObjects(
       SceneEngineService.getSceneGameObject(engineState),
     )
  |> Js.Array.filter(gameObject =>
       GameObjectEngineService.getGameObjectName(gameObject, engineState)
       === Some("Mesh")
     );

let getBoxTexturedMeshGameObject = engineState =>
  engineState |> getBoxTexturedMeshGameObjects |> ArrayService.unsafeGetFirst;

let getBoxTexturedMeshGameObjectFromAssetNode =
    (wdbNodeId, (editorState, engineState)) => {
  let wdbGameObject =
    MainEditorAssetWDBNodeTool.getWDBGameObject(wdbNodeId, editorState);

  GameObjectTool.getChild(wdbGameObject, 0, engineState);
};

let getBoxTexturedMeshGameObjectMaterialType = () => AssetMaterialDataType.LightMaterial;

let getBoxTexturedMeshGameObjectMaterialName = () => "Texture";

let getBoxTexturedMeshGameObjectTextureName = () => "texture_0";

let getBoxTexturedMeshGameObjectImageName = () => "CesiumLogoFlat.png";