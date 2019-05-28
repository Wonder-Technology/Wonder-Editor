let getAmbientLightArr = () => [|0.2, 0.2, 0.2|];

let getCameraDefaultDistance = () => 1.1;

let _renderWhenStop = (event, handleFunc, inspectorEngineState) => {
  let (inspectorEngineState, event) =
    handleFunc(. event, inspectorEngineState);

  let inspectorEngineState =
    StateLogicService.renderInspectorEngineStateWhenStop(
      inspectorEngineState,
    );

  (inspectorEngineState, event);
};

/* TODO duplicate */
let _bindArcballCameraControllerEventForInspector =
    (cameraController, inspectorEngineState) => {
  let (
    inspectorEngineState,
    pointDragStartHandleFunc,
    pointDragDropHandleFunc,
    pointDragOverHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    ArcballCameraEngineService.prepareBindEvent(
      cameraController,
      inspectorEngineState,
    );

  let inspectorEngineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=InspectorEventEditorService.getPointDragStartEventName(),
      ~handleFunc=
        (. event, inspectorEngineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(
              event,
              pointDragStartHandleFunc,
              inspectorEngineState,
            ) :
            (inspectorEngineState, event),
      ~state=inspectorEngineState,
      (),
    );

  let inspectorEngineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=InspectorEventEditorService.getPointDragDropEventName(),
      ~handleFunc=
        (. event, inspectorEngineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(
              event,
              pointDragDropHandleFunc,
              inspectorEngineState,
            ) :
            (inspectorEngineState, event),
      ~state=inspectorEngineState,
      (),
    );

  let inspectorEngineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=InspectorEventEditorService.getPointDragOverEventName(),
      ~handleFunc=
        (. event, inspectorEngineState) =>
          MouseEventService.isRightMouseButton(event) ?
            _renderWhenStop(
              event,
              pointDragOverHandleFunc,
              inspectorEngineState,
            ) :
            (inspectorEngineState, event),
      ~state=inspectorEngineState,
      (),
    );

  inspectorEngineState;
};

let _initCameraAddToSceneGameObject = (camera, inspectorEngineState) => {
  let (inspectorEngineState, arcballCameraController) =
    ArcballCameraEngineService.create(inspectorEngineState);

  inspectorEngineState
  /* |> TransformEngineService.setLocalPosition(
       (0., 0., 1.1),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         camera,
         inspectorEngineState,
       ),
     ) */
  |> ArcballCameraEngineService.setArcballCameraControllerDistance(
       getCameraDefaultDistance(),
       arcballCameraController,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerWheelSpeed(
       arcballCameraController,
       0.5,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedX(
       arcballCameraController,
       1.,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerMoveSpeedY(
       arcballCameraController,
       1.,
     )
  |> ArcballCameraEngineService.setArcballCameraControllerTheta(
       arcballCameraController,
       1.5,
     )
  |> _bindArcballCameraControllerEventForInspector(arcballCameraController)
  |> BasicCameraViewEngineService.activeBasicCameraView(
       inspectorEngineState
       |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
            camera,
          ),
     )
  |> GameObjectComponentEngineService.addArcballCameraControllerComponent(
       camera,
       arcballCameraController,
     )
  |> SceneEngineService.addSceneChild(camera);
};

let _initDirectionLightAddToSceneGameObject =
    (directionLight, inspectorEngineState) =>
  inspectorEngineState
  |> TransformEngineService.setTransformLocalEulerAngles(
       (145., 15., 0.),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         directionLight,
         inspectorEngineState,
       ),
     )
  |> SceneEngineService.addSceneChild(directionLight);

let _initEmptyGameObjectAddToSceneGameObject =
    (emptyGameObject, inspectorEngineState) =>
  inspectorEngineState |> SceneEngineService.addSceneChild(emptyGameObject);

let _initAmbientLight = inspectorEngineState =>
  inspectorEngineState
  |> SceneEngineService.setAmbientLightColor(getAmbientLightArr());

let createDefaultScene = inspectorEngineState => {
  let (inspectorEngineState, camera) =
    PrimitiveEngineService.createCamera(inspectorEngineState);
  let (inspectorEngineState, directionLight) =
    PrimitiveEngineService.createDirectionLight(inspectorEngineState);
  let (inspectorEngineState, emptyGameObject) =
    GameObjectEngineService.create(inspectorEngineState);

  let inspectorEngineState =
    inspectorEngineState
    |> _initCameraAddToSceneGameObject(camera)
    |> _initDirectionLightAddToSceneGameObject(directionLight)
    |> _initEmptyGameObjectAddToSceneGameObject(emptyGameObject)
    |> _initAmbientLight;

  (emptyGameObject, inspectorEngineState);
};