let _buildSceneTreeAppState = (sceneGraphData) => {
  let state = TestToolUI.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state
};

let buildAppStateSceneGraphFromEngine = () =>
  StateFacade.prepareState()
  |> MainEditorSceneTreeView.getSceneGraphDataFromEngine
  |> _buildSceneTreeAppState;

let buildTwoLayerSceneGraphToEngine = () => {
  let (editorState, engineState) = StateFacade.prepareState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, box1) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box2) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box3) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box4) = PrimitiveLogicCompositeService.createBox(engineState);
  (editorState, engineState) |> StateFacade.finishState;
  (
    (stateTuple) =>
      stateTuple
      |> GameObjectFacade.addChild(scene, box1)
      |> GameObjectFacade.addChild(box1, box4)
      |> GameObjectFacade.addChild(scene, box2)
      |> GameObjectFacade.addChild(scene, box3)
  )
  |> StateFacade.getAndSetState
};

let buildThreeLayerSceneGraphToEngine = () => {
  let (editorState, engineState) = StateFacade.prepareState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, box1) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box2) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box3) = PrimitiveLogicCompositeService.createBox(engineState);
  let (engineState, box4) = PrimitiveLogicCompositeService.createBox(engineState);
  (editorState, engineState) |> StateFacade.finishState;
  (
    (stateTuple) =>
      stateTuple
      |> GameObjectFacade.addChild(scene, box1)
      |> GameObjectFacade.addChild(box1, box3)
      |> GameObjectFacade.addChild(box3, box4)
      |> GameObjectFacade.addChild(scene, box2)
  )
  |> StateFacade.getAndSetState
};