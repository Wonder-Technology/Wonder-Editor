let prepareInspectorCanvas = sandbox => {
  MainEditorSceneTool.initInspectorEngineState(
    ~sandbox,
    ~isInitJob=false,
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
        (),
      ),
    (),
  );

  StateInspectorEngineService.unsafeGetState()
  |> MainUtils._handleInspectorEngineState
  |> StateInspectorEngineService.setState
  |> ignore;

  CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;
};