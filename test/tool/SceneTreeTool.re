let _prepareSpecificGameObjectsForEditEngineState = editEngineState => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editEngineState, gridPlane) =
    GeometryEngineService.createGridPlaneGameObject(
      (14., 2., 0.),
      [|0.9, 0.9, 0.9|],
      editEngineState,
    );
  let (editEngineState, camera) =
    CameraEngineService.createCameraForEditEngineState(editEngineState);
  let (editEngineState, arcballCameraController) =
    ArcballCameraEngineService.create(editEngineState);

  editEngineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(camera)
  |. BasicCameraViewEngineService.activeBasicCameraView(editEngineState)
  |> GameObjectLogicService.addArcballCameraControllerForEditEngineState(
       camera,
       arcballCameraController,
     )
  |> GameObjectUtils.addChild(scene, gridPlane)
  |> GameObjectUtils.addChild(scene, camera);
};

let _buildTwoCameraSceneGraphForEditEngineState = (cubeGeometry, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, camera1) =
    CameraEngineService.createCameraForEditEngineState(engineState);
  let (engineState, camera2) =
    CameraEngineService.createCameraForEditEngineState(engineState);
  let (engineState, box1) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );

  (
    camera1,
    camera2,
    box1,
    engineState
    |> GameObjectUtils.addChild(scene, camera1)
    |> GameObjectUtils.addChild(scene, camera2)
    |> GameObjectUtils.addChild(scene, box1),
  );
};
let _buildTwoCameraSceneGraphForRunEngineState =
    (cubeGeometry, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, camera1) =
    CameraEngineService.createCameraForRunEngineState(
      editorState,
      engineState,
    );
  let (editorState, engineState, camera2) =
    CameraEngineService.createCameraForRunEngineState(
      editorState,
      engineState,
    );
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );

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
  let editEngineState =
    StateLogicService.getEditEngineState()
    |> _prepareSpecificGameObjectsForEditEngineState;

  let editorState =
    StateEditorService.getState() |> DefaultSceneUtils.computeDiffValue;

  let (editEngineState, editCubeGeometry) =
    editEngineState
    |> DefaultSceneUtils.prepareDefaultComponentForEditEngineState;

  let (camera1, camera2, box1, editEngineState) =
    editEngineState
    |> _buildTwoCameraSceneGraphForEditEngineState(editCubeGeometry);

  editEngineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setEditEngineState;

  let (editorState, runEngineState, runCubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponentForRunEngineState(
      editorState,
      StateLogicService.getRunEngineState(),
    );

  let (camera1, camera2, box1, editorState, runEngineState) =
    runEngineState
    |> _buildTwoCameraSceneGraphForRunEngineState(
         runCubeGeometry,
         editorState,
       );

  runEngineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(camera2)
  |. BasicCameraViewEngineService.activeBasicCameraView(runEngineState)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setRunEngineState;

  editorState |> StateEditorService.setState |> ignore;

  (camera1, camera2, box1);
};

let _buildThreeLayerSceneGraphForEditEngineState = (cubeGeometry, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, box1) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box2) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box3) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box4) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );

  engineState
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(box1, box4)
  |> GameObjectUtils.addChild(scene, box2)
  |> GameObjectUtils.addChild(scene, box3);
};
let _buildThreeLayerSceneGraphForRunEngineState =
    (cubeGeometry, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box3) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box4) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );

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
  let editEngineState =
    StateLogicService.getEditEngineState()
    |> _prepareSpecificGameObjectsForEditEngineState;

  let editorState =
    StateEditorService.getState() |> DefaultSceneUtils.computeDiffValue;

  let (editEngineState, editCubeGeometry) =
    editEngineState
    |> DefaultSceneUtils.prepareDefaultComponentForEditEngineState;

  let editEngineState =
    editEngineState
    |> _buildThreeLayerSceneGraphForEditEngineState(editCubeGeometry);

  editEngineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setEditEngineState;

  let (editorState, runEngineState, runCubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponentForRunEngineState(
      editorState,
      StateLogicService.getRunEngineState(),
    );

  let (editorState, runEngineState) =
    runEngineState
    |> _buildThreeLayerSceneGraphForRunEngineState(
         runCubeGeometry,
         editorState,
       );

  runEngineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setRunEngineState;

  editorState |> StateEditorService.setState |> ignore;
};

let _buildFourLayerSceneGraphForEditEngineState = (cubeGeometry, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (engineState, box1) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box2) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box3) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box4) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  (
    box1,
    box2,
    box3,
    box4,
    engineState
    |> GameObjectUtils.addChild(scene, box1)
    |> GameObjectUtils.addChild(box1, box3)
    |> GameObjectUtils.addChild(box3, box4)
    |> GameObjectUtils.addChild(scene, box2),
  );
};
let _buildFourLayerSceneGraphForRunEngineState =
    (cubeGeometry, editorState, engineState) => {
  let scene = MainEditorSceneTool.unsafeGetScene();
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box3) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box4) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
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
  let editEngineState =
    StateLogicService.getEditEngineState()
    |> _prepareSpecificGameObjectsForEditEngineState;

  let editorState =
    StateEditorService.getState() |> DefaultSceneUtils.computeDiffValue;

  let (editEngineState, editCubeGeometry) =
    editEngineState
    |> DefaultSceneUtils.prepareDefaultComponentForEditEngineState;

  let (box1, box2, box3, box4, editEngineState) =
    editEngineState
    |> _buildFourLayerSceneGraphForEditEngineState(editCubeGeometry);

  editEngineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setEditEngineState;

  let (editorState, runEngineState, runCubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponentForRunEngineState(
      editorState,
      StateLogicService.getRunEngineState(),
    );

  let (box1, box2, box3, box4, editorState, runEngineState) =
    StateLogicService.getRunEngineState()
    |> _buildFourLayerSceneGraphForRunEngineState(
         runCubeGeometry,
         editorState,
       );

  runEngineState
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> StateLogicService.setRunEngineState;

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