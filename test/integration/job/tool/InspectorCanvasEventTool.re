let _prepareInspectorCanvasParent =
    (~sandbox, ~offsetWidth=100, ~offsetHeight=50, ()) =>
  DomTool.stubFakeDomForGetElementById(
    sandbox,
    "inspectorCanvasParent",
    {"offsetWidth": offsetWidth, "offsetHeight": offsetHeight},
  );

let prepareMouseEvent =
    (
      ~sandbox,
      ~offsetWidth=100,
      ~offsetHeight=50,
      ~offsetLeft=1,
      ~offsetTop=2,
      (),
    ) => {
  MainEditorSceneTool.initState(~sandbox, ());

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
            {"name": "init_event_for_editor_inspector"}
                   ]
                 }
               ]
                |},
        ~initJobs=
          {|
                [
            {"name": "init_event_for_editor_inspector"}
                ]
                |},
        (),
      ),
    (),
  );

  _prepareInspectorCanvasParent(~sandbox, ~offsetWidth, ~offsetHeight, ());

  MouseEventTool.prepareWithState(
    ~sandbox,
    ~offsetLeft,
    ~offsetTop,
    ~engineState=StateInspectorEngineService.unsafeGetState(),
    ~setBrowserFunc=
      () =>
        BrowserDetectToolEngine.setChromeFromEngineState
        |> StateLogicService.getAndSetInspectorEngineState,
    ~setEngineFunc=StateInspectorEngineService.setState,
    (),
  );

  MainUtils._handleInspectorEngineState
  |> StateLogicService.getAndSetInspectorEngineState;

  MouseEventTool.setPointerLocked(.);
};