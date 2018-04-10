open Js.Promise;

let prepareSpecificGameObjectsForEditEngineState = (scene, engineStateForEdit) => {
  let (engineState, camera) = CameraEngineService.createCamera(engineStateForEdit);
  let transform = GameObjectComponentEngineService.getTransformComponent(camera, engineState);
  engineState
  |> TransformEngineService.setLocalPosition(transform, (20., 0., 100.))
  |> GameObjectUtils.addChild(scene, camera)
  |> SceneEngineService.setCurrentCameraGameObject(camera)
};

let computeDiffUidAndIndex = (editorState, engineState) => {
  let diffMap =
    WonderCommonlib.HashMapService.createEmpty()
    |> WonderCommonlib.HashMapService.set("gameObject", 1)
    |> WonderCommonlib.HashMapService.set("transform", 1)
    |> WonderCommonlib.HashMapService.set("material", 0);
  editorState |> SceneEditorService.setDiffMap(diffMap) |> ignore;
  engineState
};

let createDefaultSceneForEdit = (scene, engineState) => {
  let (engineState, camera, box1, box2) =
    SceneEngineService.createDefaultSceneGameObjects(
      engineState,
      CameraEngineService.createCameraBox
    );
  let transform = GameObjectComponentEngineService.getTransformComponent(camera, engineState);
  let material = GameObjectComponentEngineService.getBasicMaterialComponent(camera, engineState);
  engineState
  |> TransformEngineService.setLocalPosition(transform, (0., 0., 40.))
  |> BasicMaterialEngineService.setColor(material, [|1., 0.1, 0.1|])
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
};

let createDefaultSceneForRun = (scene, engineState) => {
  let (engineState, camera, box1, box2) =
    SceneEngineService.createDefaultSceneGameObjects(
      engineState,
      CameraEngineService.createCamera
    );
  let transform = GameObjectComponentEngineService.getTransformComponent(camera, engineState);
  engineState
  |> TransformEngineService.setLocalPosition(transform, (0., 0., 40.))
  |> GameObjectUtils.addChild(scene, camera)
  |> GameObjectUtils.addChild(scene, box1)
  |> GameObjectUtils.addChild(scene, box2)
};

let init = (editorState) =>
  AssetEngineService.loadToData(
    [|"./src/service/state/data/engine/setting.json", "./node_modules/wonder.js/data/"|],
    EngineStateDataEditorService.getEngineStateDataForEdit()
  )
  |> Most.merge(
       AssetEngineService.loadToData(
         [|"./src/service/state/data/engine/runSetting.json", "./node_modules/wonder.js/data/"|],
         EngineStateDataEditorService.getEngineStateDataForRun()
       )
     )
  |> Most.forEach((value) => ())
  |> then_(
       () => {
         StateEngineService.setIsDebug(true) |> ignore;
         let engineState = StateLogicService.getEngineStateForEdit();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         engineState
         |> prepareSpecificGameObjectsForEditEngineState(scene)
         |> computeDiffUidAndIndex(editorState)
         |> createDefaultSceneForEdit(scene)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEngineStateForEdit;
         let engineState = StateLogicService.getEngineStateForRun();
         let (engineState, scene) = GameObjectEngineService.create(engineState);
         engineState
         |> createDefaultSceneForRun(scene)
         |> DirectorEngineService.init
         |> DirectorEngineService.loopBody(0.)
         |> StateLogicService.setEngineStateForRun;
         SceneEditorService.setScene(scene, editorState) |> resolve
       }
     );

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_((editorState) => editorState |> StateEditorService.setState |> resolve);