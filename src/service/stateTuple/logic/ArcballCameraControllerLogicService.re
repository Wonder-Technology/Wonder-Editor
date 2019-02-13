let _renderWhenStop = (event, handleFunc, engineState) => {
  let (engineState, event) = handleFunc(. event, engineState);

  let engineState = StateLogicService.renderWhenStop(engineState);

  (engineState, event);
};

let _isKeyAffectedArballCameraController = ({key}: EventType.keyboardEvent) =>
  switch (key) {
  | "a"
  | "s"
  | "d"
  | "w" => true
  | _ => false
  };

let bindArcballCameraControllerEventForSceneView =
    (cameraController, engineState) => {
  let (
    engineState,
    pointDragStartHandleFunc,
    pointDragDropHandleFunc,
    pointDragOverHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    ArcballCameraEngineService.prepareBindEvent(
      cameraController,
      engineState,
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragStartEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(event, pointDragStartHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragDropEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(event, pointDragDropHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragOverEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(event, pointDragOverHandleFunc, engineState) :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointScaleEventName(),
      ~handleFunc=
        (. event, engineState) =>
          _renderWhenStop(event, pointScaleHandleFunc, engineState),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onKeyboardEvent(
      ~eventName=EventType.KeyDown_SceneView |> Obj.magic,
      ~handleFunc=
        (. event: EventType.keyboardEvent, engineState) =>
          _isKeyAffectedArballCameraController(event) ?
            {
              HandleDomEventEngineService.preventDefault(
                event.event |> EventType.keyboardDomEventToDomEvent,
              )
              |> ignore;

              let engineState = keydownHandleFunc(. event, engineState);

              let engineState = StateLogicService.renderWhenStop(engineState);

              engineState;
            } :
            engineState,
      ~state=engineState,
      (),
    );

  engineState;
};

let _checkSceneAllArcballCameraControllersNotBindEvent = engineState =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect=
              {j|scene's all arcballCameraControllers should not bind event|j},
            ~actual={j|bind|j},
          ),
          () =>
          HierarchyGameObjectEngineService.getAllGameObjects(
            SceneEngineService.getSceneGameObject(engineState),
            engineState,
          )
          |> Js.Array.filter(gameObject =>
               GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                 gameObject,
                 engineState,
               )
             )
          |> Js.Array.filter(arcballCameraController =>
               ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                 arcballCameraController,
                 engineState,
               )
             )
          |> Js.Array.length == 0
        )
      )
    )
  );

let bindGameViewActiveCameraArcballCameraControllerEvent = engineState => {
  WonderLog.Contract.requireCheck(
    () => _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
    StateEditorService.getStateIsDebug(),
  );

  switch (
    GameViewEditorService.getActivedBasicCameraView(
      StateEditorService.getState(),
    )
  ) {
  | None => engineState
  | Some(activeBasicCameraView) =>
    BasicCameraViewEngineService.getBasicCameraViewGameObject(
      activeBasicCameraView,
      engineState,
    )
    |> ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponentForGameView(
         _,
         engineState,
       )
  };
};

let unbindGameViewActiveCameraArcballCameraControllerEvent = engineState =>
  (
    switch (
      GameViewEditorService.getActivedBasicCameraView(
        StateEditorService.getState(),
      )
    ) {
    | None => engineState
    | Some(activeBasicCameraView) =>
      BasicCameraViewEngineService.getBasicCameraViewGameObject(
        activeBasicCameraView,
        engineState,
      )
      |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponentForGameView(
           _,
           engineState,
         )
    }
  )
  |> WonderLog.Contract.ensureCheck(
       engineState =>
         _checkSceneAllArcballCameraControllersNotBindEvent(engineState),
       StateEditorService.getStateIsDebug(),
     );

let setEditorCameraFocusTargetGameObject =
    (distance, isCurrentSceneTreeNodeCanBeOperate, editorState, engineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|the editor camera should has arcballCameraController component|j},
                ~actual={j|not|j},
              ),
              () =>
              editorState
              |> SceneViewEditorService.unsafeGetEditCamera
              |. GameObjectComponentEngineService.hasArcballCameraControllerComponent(
                   engineState,
                 )
              |> assertTrue
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  let editorCameraArcballControllerComponent =
    editorState
    |> SceneViewEditorService.unsafeGetEditCamera
    |. GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
         engineState,
       );

  isCurrentSceneTreeNodeCanBeOperate ?
    engineState
    |> ArcballCameraEngineService.setArcballCameraControllerTarget(
         editorCameraArcballControllerComponent,
         editorState
         |> SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
         |. GameObjectComponentEngineService.unsafeGetTransformComponent(
              engineState,
            )
         |. TransformEngineService.getPosition(engineState),
       )
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         distance,
         editorCameraArcballControllerComponent,
       ) :
    engineState
    |> ArcballCameraEngineService.setArcballCameraControllerTarget(
         editorCameraArcballControllerComponent,
         (0., 0., 0.),
       );
};