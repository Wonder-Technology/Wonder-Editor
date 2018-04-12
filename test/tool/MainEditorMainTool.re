let createEngineStateAndInitWithJobConfigWithoutBuildFakeDom = (sandbox) =>
  TestToolEngine.initWithJobConfigWithoutBuildFakeDom(
    ~sandbox,
    ~isDebug="true",
    ~noWorkerJobRecord=
      NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
        ~initPipelines={|
      [
    {
    "name": "default",
    "jobs": [
      {
        "name": "detect_gl"
      },
      {
        "name": "init_camera"
      },
      {
        "name": "init_boxGeometry"
      } ,
      {
        "name": "preget_glslData"
      },
      {
        "name": "init_basic_material"
      },
      {
        "name": "init_light_material"
      }
    ]
    }
    ]
      |},
        ~initJobs={|

    [
      {
        "name": "detect_gl"
      },
      {
        "name": "init_camera"
      },
      {
        "name": "init_boxGeometry"
      },
      {
        "name": "preget_glslData"
      },
      {
        "name": "init_basic_material"
      },
      {
        "name": "init_light_material"
      }
    ]
      |},
        ()
      ),
    ()
  );

let init = (sandbox) => {
  SettingToolEngine.buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
  let editorState = StateToolLogic.createEditorState();
  let engineForEditState = createEngineStateAndInitWithJobConfigWithoutBuildFakeDom(sandbox);
  let engineForRunState = createEngineStateAndInitWithJobConfigWithoutBuildFakeDom(sandbox);
  /* TODO refactor: move "create default scene out" */
  let (engineForEditState, scene) = GameObjectEngineService.create(engineForEditState);
  engineForEditState
  |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(scene)
  |> DefaultSceneUtils.computeDiffValue(editorState)
  |> DefaultSceneUtils.createDefaultSceneForEdit(scene)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> DirectorEngineService.init
  |> StateLogicService.setEditEngineState;
  let editorState = StateEditorService.getState();
  let (engineForRunState, sceneForRun) = GameObjectEngineService.create(engineForRunState);
  engineForRunState
  |> DefaultSceneUtils.createDefaultSceneForRun(sceneForRun)
  |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()))
  |> DirectorEngineService.init
  |> StateLogicService.setRunEngineState;
  editorState |> SceneEditorService.setScene(sceneForRun) |> StateEditorService.setState |> ignore
};