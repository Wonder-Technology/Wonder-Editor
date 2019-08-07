let prepareInspectorEngineState =
    (~sandbox, ~buffer=SettingToolEngine.buildBufferConfigStr(), ()) => {
  MainEditorSceneTool.initInspectorEngineState(
    ~sandbox,
    ~isInitJob=false,
    ~buffer,
    ~noWorkerJobRecord=
      NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
        ~initJobs=
          {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
        ~loopPipelines=
          {|
             [
                {
                  "name": "default",
                  "jobs": [
                    {
                        "name": "dispose"

                    }
                  ]
                }
              ]
             |},
        (),
      ),
    (),
  );

  StateInspectorEngineService.unsafeGetState()
  |> MainUtils._handleInspectorEngineState
  |> StateInspectorEngineService.setState
  |> ignore;
};