open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let createNewMaterial = () => {
  let assetTreeData =
    MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
  let addedMaterialNodeId = MainEditorAssetIdTool.getNewAssetId();

  MainEditorAssetHeaderOperateNodeTool.addMaterial();

  let materialComponent =
    MainEditorAssetMaterialNodeTool.getMaterialComponent(
      ~nodeId=addedMaterialNodeId,
      (),
    );

  (addedMaterialNodeId, materialComponent);
};

let judgeClonedAndSourceLightMaterialAttributeIsEqual = getAttributeFunc => {
  let inspectorEngineState = StateInspectorEngineService.unsafeGetState();
  let engineState = StateEngineService.unsafeGetState();
  let (addedMaterialNodeId, materialComponent) = createNewMaterial();

  MaterialInspector.Method.didMount(
    MaterialDataAssetType.LightMaterial,
    materialComponent,
  );

  let materialSphereLightMaterial =
    InspectorEngineTool.getMaterialSphereLightMaterial(
      StateEditorService.getState(),
      inspectorEngineState,
    );

  inspectorEngineState
  |> getAttributeFunc(materialSphereLightMaterial)
  |> expect == (engineState |> getAttributeFunc(materialComponent));
};

let judgeClonedAndSourceBasicMaterialAttributeIsEqual = getAttributeFunc => {
  let inspectorEngineState = StateInspectorEngineService.unsafeGetState();
  let engineState = StateEngineService.unsafeGetState();
  let (addedMaterialNodeId, materialComponent) = createNewMaterial();

  MaterialInspectorTool.changeMaterialType(
    ~material=materialComponent,
    ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
    ~targetMaterialType=MaterialDataAssetType.BasicMaterial,
    ~materialNodeId=addedMaterialNodeId,
    (),
  );

  MaterialInspector.Method.didMount(
    MaterialDataAssetType.BasicMaterial,
    materialComponent,
  );

  let materialSphereBasicMaterial =
    InspectorEngineTool.getMaterialSphereBasicMaterial(
      StateEditorService.getState(),
      inspectorEngineState,
    );

  inspectorEngineState
  |> getAttributeFunc(materialSphereBasicMaterial)
  |> expect == (engineState |> getAttributeFunc(materialComponent));
};

let judgeClonedAndSourceTextureAttributeIsEqual = getAttributeFunc => {
  let (addedMaterialNodeId, materialComponent) = createNewMaterial();

  MainEditorAssetUploadTool.loadOneTexture()
  |> then_(uploadedTextureNodeId => {
       let editorState = StateEditorService.getState();
       let engineState = StateEngineService.unsafeGetState();
       let inspectorEngineState = StateInspectorEngineService.unsafeGetState();
       let textureComponent =
         MainEditorAssetTextureNodeTool.getTextureComponent(
           uploadedTextureNodeId,
           editorState,
         );

       MainEditorLightMaterialForGameObjectTool.Drag.dragAssetTextureToMap(
         ~material=materialComponent,
         ~textureNodeId=uploadedTextureNodeId,
         (),
       );

       MaterialInspector.Method.didMount(
         MaterialDataAssetType.LightMaterial,
         materialComponent,
       );

       let materialSphereTextureComponent =
         inspectorEngineState
         |> LightMaterialEngineService.getLightMaterialDiffuseMap(
              InspectorEngineTool.getMaterialSphereLightMaterial(
                editorState,
                inspectorEngineState,
              ),
            )
         |> OptionService.unsafeGet;

       inspectorEngineState
       |> getAttributeFunc(materialSphereTextureComponent)
       |> expect == (engineState |> getAttributeFunc(textureComponent))
       |> resolve;
     });
};