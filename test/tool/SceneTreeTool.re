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
    |> GameObjectComponentEngineService.getBasicCameraViewComponent(camera)
    |. BasicCameraViewEngineService.activeBasicCameraView(engineState);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addArcballCameraController(
         camera,
         arcballCameraController,
       );

  editorState |> StateEditorService.setState |> ignore;

  engineState
  |> GameObjectUtils.addChild(scene, gridPlane)
  |> GameObjectUtils.addChild(scene, camera);
};

let _buildTwoCameraSceneGraph = (cubeGeometry, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, camera1) =
    CameraEngineService.createCamera(editorState, engineState);
  let (editorState, engineState, camera2) =
    CameraEngineService.createCamera(editorState, engineState);
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);

  (
    camera1,
    camera2,
    box1,
    editorState,
    engineState
    |> GameObjectUtils.addChild(scene, camera1)
    |> GameObjectUtils.addChild(scene, camera2)
    |> GameObjectUtils.addChild(scene, box1),
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

  let (camera1, camera2, box1, editorState, engineState) =
    engineState |> _buildTwoCameraSceneGraph(cubeGeometry, editorState);

  engineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(camera2)
  |. BasicCameraViewEngineService.activeBasicCameraView(engineState)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState;

  editorState |> StateEditorService.setState |> ignore;

  (camera1, camera2, box1);
};

let _buildThreeLayerSceneGraph = (cubeGeometry, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, box3) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, box4) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);

  (
    editorState,
    engineState
    |> GameObjectUtils.addChild(scene, box1)
    |> GameObjectUtils.addChild(box1, box4)
    |> GameObjectUtils.addChild(scene, box2)
    |> GameObjectUtils.addChild(scene, box3),
  );
};

let buildThreeLayerSceneGraphToEngine = sandbox => {
  let engineState =
    StateEngineService.unsafeGetState() |> _prepareSpecificGameObjects;

  let editorState = StateEditorService.getState();

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  let (editorState, engineState) =
    engineState |> _buildThreeLayerSceneGraph(cubeGeometry, editorState);

  engineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState;

  editorState |> StateEditorService.setState |> ignore;
};

let _buildFourLayerSceneGraph = (cubeGeometry, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, box3) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, box4) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  (
    box1,
    box2,
    box3,
    box4,
    editorState,
    engineState
    |> GameObjectUtils.addChild(scene, box1)
    |> GameObjectUtils.addChild(box1, box3)
    |> GameObjectUtils.addChild(box3, box4)
    |> GameObjectUtils.addChild(scene, box2),
  );
};

let buildFourLayerSceneGraphToEngine = sandbox => {
  let engineState =
    StateEngineService.unsafeGetState() |> _prepareSpecificGameObjects;

  let editorState = StateEditorService.getState();

  let (editorState, engineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponent(editorState, engineState);

  let (box1, box2, box3, box4, editorState, engineState) =
    engineState |> _buildFourLayerSceneGraph(cubeGeometry, editorState);

  engineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateEngineService.setState;

  editorState |> StateEditorService.setState |> ignore;

  (box1, box2, box3, box4);
};

let clearCurrentGameObjectAndSetTreeSpecificGameObject = clickTreeNodeIndex => {
  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;

  let component =
    BuildComponentTool.buildSceneTree(
      TestTool.buildAppStateSceneGraphFromEngine(),
    );

  BaseEventTool.triggerComponentEvent(
    component,
    SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex),
  );
};

let buildFourLayerSceneAndGetBox = sandbox => {
  let (box1, box2, box3, box4) = buildFourLayerSceneGraphToEngine(sandbox);

  let firstLayerFirstCubeDomIndex =
    SceneTreeNodeDomTool.OperateFourLayer.getFirstLayerFirstCubeDomIndex();

  clearCurrentGameObjectAndSetTreeSpecificGameObject(
    firstLayerFirstCubeDomIndex,
  );

  (box1, box2, box3, box4);
};