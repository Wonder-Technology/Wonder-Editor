let prepareKeyboardEvent = (~sandbox, ()) =>
  MainEditorSceneTool.initStateWithJob(
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
                      {
                        "name": "init_hotkeys"
                      },
                      {
                         "name": "init_transform_gizmos"
                      }
                    ]
                  }
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

let execKeyboardEvent =
    (
      keyboardDomEventName,
      keyCode,
      ~ctrlKey=false,
      ~altKey=false,
      ~shiftKey=false,
      (),
    ) =>
  EventTool.triggerDomEvent(
    keyboardDomEventName,
    EventTool.getDocument(),
    KeyboardEventTool.buildKeyboardDomEvent(
      ~ctrlKey,
      ~altKey,
      ~shiftKey,
      ~keyCode,
      (),
    ),
  );