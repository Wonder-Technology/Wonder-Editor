open Js.Promise;

open NodeAssetType;

let getUseTextureMaterialArray = (currentNode, engineState) =>
  TextureNodeAssetService.isTextureNode(currentNode) ?
    {
      let {textureComponent} =
        TextureNodeAssetService.getNodeData(currentNode);

      Some(
        LightMaterialEngineService.getAllLightMaterials(engineState)
        |> Js.Array.filter(lightMaterial =>
             LightMaterialEngineService.isDiffuseMap(
               lightMaterial,
               textureComponent,
               engineState,
             )
           ),
      );
    } :
    None;

let _createAllMaterialSnapshot =
    (
      (currentNode, material),
      engineState,
      (editorState, inspectorEngineState),
    ) => {
  let (editorState, (inspectorEngineState, _)) =
    (editorState, inspectorEngineState)
    |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
    |> MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
         MaterialDataAssetType.LightMaterial,
         material,
         editorState,
         engineState,
       );

  let inspectorEngineState =
    inspectorEngineState
    |> InspectorCanvasUtils.restoreArcballCameraControllerAngle
    |> StateLogicService.renderInspectorEngineStateAndReturnState;

  let editorState =
    editorState
    |> ImgCanvasUtils.clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNode(
         DomHelper.getElementById("inspector-canvas"),
         DomHelper.getElementById("img-canvas"),
         currentNode,
       );

  (editorState, inspectorEngineState);
};

let redrawAllMaterialSetToImageDataMap =
    (
      useTextureMaterialArray,
      engineState,
      (editorState, inspectorEngineState),
    ) =>
  useTextureMaterialArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (editorState, inspectorEngineState), materialComponent) =>
         switch (
           editorState
           |> OperateTreeAssetEditorService.findMaterialNode(
                materialComponent,
                MaterialDataAssetType.LightMaterial,
              )
         ) {
         | None => (editorState, inspectorEngineState)
         | Some(materialNode) =>
           _createAllMaterialSnapshot(
             (materialNode, materialComponent),
             engineState,
             (editorState, inspectorEngineState),
           )
         },
       (editorState, inspectorEngineState),
     );