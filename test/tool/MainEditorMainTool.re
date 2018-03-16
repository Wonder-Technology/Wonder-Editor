let init = (sandbox) => {
  let editorState = StateToolLogic.createEditorState();
  let engineState =
    TestToolEngine.initWithJobConfig(
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
        "name": "init_geometry"
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
        "name": "init_geometry"
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
  let (engineState, scene) = GameObjectEngineService.create(engineState);
  let editorState = SceneEditorService.setScene(scene, editorState);
  let engineState = MainUtils.createDefaultScene(scene, engineState);
  let engineState =
    engineState |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()));
  let engineState = engineState |> DirectorEngineService.init;
  (editorState, engineState)
};