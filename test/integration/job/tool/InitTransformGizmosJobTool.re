let prepareStateAndView = (~sandbox, ~viewWidth, ~viewHeight) => {
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
              "name": "init_event_for_editor"
            },
            {
              "name": "init_camera"
            },
            {
              "name": "init_transform_gizmos"
            },
            {
              "name": "init_picking"
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
                "name": "update_transform_gizmos"
            },
            {
                "name": "update_transform"
            }
        ]
    }
]
              |},
        (),
      ),
    (),
  );

  PrepareRenderViewJobTool.setViewRect(
    ~width=viewWidth * 2,
    ~height=viewHeight,
    (),
  );
};

let prepareMouseEvent =
    (
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~offsetParent=Js.Nullable.undefined,
      (),
    ) => {
  prepareStateAndView(~sandbox, ~viewWidth, ~viewHeight);

  MouseEventTool.prepareWithState(
    ~sandbox,
    ~canvasWidth=viewWidth,
    ~canvasHeight=viewHeight,
    ~offsetLeft,
    ~offsetTop,
    ~offsetParent,
    ~engineState=StateEngineService.unsafeGetState(),
    (),
  );
  MouseEventTool.prepareForPointerLock(sandbox);

  MouseEventTool.setPointerLocked(.);

  ((viewWidth, viewHeight), (offsetLeft, offsetTop));
};

let prepareOneGameObject =
    (
      ~createGameObjectFunc=InitPickingJobTool.createSphere,
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      ~cameraPos,
      ~gameObjectPos,
      ~gameObjectEulerAngles,
      (),
    ) => {
  let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
    prepareMouseEvent(
      ~sandbox,
      ~viewWidth,
      ~viewHeight,
      ~offsetLeft,
      ~offsetTop,
      (),
    );

  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (editCamera, (editorState, engineState)) =
    InitPickingJobTool.prepareCamera(
      cameraPos,
      (viewWidth, viewHeight),
      (editorState, engineState),
    );

  let (engineState, gameObject1) =
    InitPickingJobTool.prepareGameObject(
      gameObjectPos,
      gameObjectEulerAngles,
      createGameObjectFunc,
      engineState,
    );

  InitPickingJobTool.prepareState(sandbox, editorState, engineState);

  gameObject1;
};

let getCurrentSceneTreeNodePosition = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(3);
};


let getCurrentSceneTreeNodeEulerAngles = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  TransformEngineService.getEulerAngles(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(1);
};

let createTransformGizmos = ((editorState, engineState)) =>
  InitTransformGizmosJob._createTransformGizmos((editorState, engineState));