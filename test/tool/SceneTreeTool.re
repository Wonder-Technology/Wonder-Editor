let _prepareSpecificGameObjects = engineState => {
  let editorState = StateEditorService.getState();
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, gridPlane) =
    GeometryEngineService.createGridPlaneGameObject(
      (14., 2., 0.),
      [|0.9, 0.9, 0.9|],
      engineState,
    );
  let (editorState, engineState, camera) =
    CameraEngineService.createCamera(editorState, engineState);
  let (engineState, arcballCameraController) =
    ArcballCameraEngineService.create(engineState);

  let engineState =
    engineState
    |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         camera,
       )
    |. BasicCameraViewEngineService.activeBasicCameraView(engineState);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraController(
         camera,
         arcballCameraController,
       );

  editorState |> StateEditorService.setState |> ignore;

  engineState;
  /* |> HierarchyGameObjectEngineService.addChild(scene, gridPlane)
     |> HierarchyGameObjectEngineService.addChild(scene, camera); */
};

let _buildTwoCameraSceneGraph = (componentData, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, camera1) =
    CameraEngineService.createCamera(editorState, engineState);
  let (editorState, engineState, camera2) =
    CameraEngineService.createCamera(editorState, engineState);
  let (editorState, engineState, cube1) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);

  (
    camera1,
    camera2,
    cube1,
    editorState,
    engineState
    |> HierarchyGameObjectEngineService.addChild(scene, camera1)
    |> HierarchyGameObjectEngineService.addChild(scene, camera2)
    |> HierarchyGameObjectEngineService.addChild(scene, cube1),
  );
};

let buildTwoCameraSceneGraphToEngine = sandbox => {
  let engineState =
    StateEngineService.unsafeGetState() |> _prepareSpecificGameObjects;

  let editorState = StateEditorService.getState();

  engineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState
  |> ignore;

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  let defaultLightMaterialData =
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState);

  let (camera1, camera2, cube1, editorState, engineState) =
    engineState
    |> _buildTwoCameraSceneGraph(
         (cubeGeometry, defaultLightMaterialData),
         editorState,
       );

  engineState
  |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
       camera2,
     )
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState;

  editorState |> StateEditorService.setState |> ignore;

  (camera1, camera2, cube1);
};

let _buildThreeLayerSceneGraph = (componentData, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, cube1) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  let (editorState, engineState, cube2) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  let (editorState, engineState, cube3) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  let (editorState, engineState, cube4) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);

  (
    editorState,
    engineState
    |> HierarchyGameObjectEngineService.addChild(scene, cube1)
    |> HierarchyGameObjectEngineService.addChild(cube1, cube4)
    |> HierarchyGameObjectEngineService.addChild(scene, cube2)
    |> HierarchyGameObjectEngineService.addChild(scene, cube3),
    (scene, (cube1, cube4), cube2, cube3),
  );
};

let buildThreeLayerSceneGraphToEngine = sandbox => {
  let engineState =
    StateEngineService.unsafeGetState() |> _prepareSpecificGameObjects;

  let editorState = StateEditorService.getState();

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  let defaultLightMaterialData =
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState);

  let (editorState, engineState, layerGameObjectData) =
    engineState
    |> _buildThreeLayerSceneGraph(
         (cubeGeometry, defaultLightMaterialData),
         editorState,
       );

  engineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState;

  editorState |> StateEditorService.setState |> ignore;

  layerGameObjectData;
};

let _buildFourLayerSceneGraph = (componentData, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, cube1) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  let (editorState, engineState, cube2) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  let (editorState, engineState, cube3) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  let (editorState, engineState, cube4) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  (
    editorState,
    engineState
    |> HierarchyGameObjectEngineService.addChild(scene, cube1)
    |> HierarchyGameObjectEngineService.addChild(cube1, cube3)
    |> HierarchyGameObjectEngineService.addChild(cube3, cube4)
    |> HierarchyGameObjectEngineService.addChild(scene, cube2),
    (scene, (cube1, cube3, cube4), cube2),
  );
};

let buildFourLayerSceneGraphToEngine = sandbox => {
  let engineState =
    StateEngineService.unsafeGetState() |> _prepareSpecificGameObjects;

  let editorState = StateEditorService.getState();

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  let defaultLightMaterialData =
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState);

  let (editorState, engineState, layerGameObjectData) =
    engineState
    |> _buildFourLayerSceneGraph(
         (cubeGeometry, defaultLightMaterialData),
         editorState,
       );

  engineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState;

  editorState |> StateEditorService.setState |> ignore;

  layerGameObjectData;
};