/* open EditorType;

   open SceneViewType; */

/* TransformEngineService.getPosition(
     GameObjectComponentEngineService.unsafeGetTransformComponent(
       SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
       engineState,
     ),
     engineState,
   ); */

/* let _isSelectCircleNotVisiblePart =
     (intersectPointInCircle,  cameraPosInLocalCoordSystem) =>
   Vector3Service.dot(
     Wonderjs.Vector3Service.normalize(
       Wonderjs.Vector3Service.sub(
         Wonderjs.Vector3Type.Float,
         (0., 0., 0.),
         intersectPointInCircle,
       ),
     ),
     Wonderjs.Vector3Service.sub(
       Wonderjs.Vector3Type.Float,
       cameraPosInLocalCoordSystem,
       intersectPointInCircle,
     ),
   )
   >= 0.0; */

let _isSelectCircleNotVisiblePart =
    (intersectPointInCircle, centerPoint, cameraPos) =>
  Vector3Service.dot(
    Wonderjs.Vector3Service.normalize(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        centerPoint,
        intersectPointInCircle,
      ),
    ),
    Wonderjs.Vector3Service.sub(
      Wonderjs.Vector3Type.Float,
      cameraPos,
      intersectPointInCircle,
    ),
  )
  >= 0.0;

let _isSelectCircle = (intersectXYPlanePoint, editorState, engineState) =>
  switch (intersectXYPlanePoint) {
  | None => false
  | Some(intersectPoint) =>
    _isSelectCircleNotVisiblePart(
      intersectPoint,
      CircleRotationGizmosUtils.getCenterPoint(editorState, engineState),
      /* CameraPosUtils.getCameraPosInLocalCoordSystem(
           CameraPosUtils.getCameraPos(editorState, engineState),
           TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
             SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
             engineState,
           ),
           engineState,
         ), */
      CameraPosUtils.getCameraPos(editorState, engineState),
    ) ?
      false :
      {
        let expandFactor = 0.2;
        let radius =
          DataRotationGizmoSceneViewEditorService.getRadius()
          *. ComputeTransformGizmoScaleUtils.getScaleFactor(
               editorState,
               engineState,
             );

        let lengthToCenter =
          Vector3Service.length(
            Wonderjs.Vector3Service.sub(
              Wonderjs.Vector3Type.Float,
              intersectPoint,
              CircleRotationGizmosUtils.getCenterPoint(
                editorState,
                engineState,
              ),
            ),
          );

        lengthToCenter <= radius
        *. (1. +. expandFactor)
        && lengthToCenter >= radius
        *. (1. -. expandFactor);
      }
  };

let _selectCircle =
    (
      intersectPlanePoint,
      (setCurrentGizmoColorFunc, onlySelectCircleGizmoFunc),
      editorState,
      engineState,
    ) => {
  let editorState =
    editorState
    |> onlySelectCircleGizmoFunc
    |> AngleRotationGizmoSceneViewEditorService.setDragStartPoint(
         intersectPlanePoint,
       );

  let engineState = setCurrentGizmoColorFunc(editorState, engineState);

  (editorState, engineState);
};

let selectRotationGizmo = (event, editorState, engineState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  let intersectXYPlanePoint =
    RayUtils.checkIntersectPlane(
      CircleRotationGizmosUtils.buildXYPlane(editorState, engineState),
      ray,
    );

  !
    ComputeRotationGizmosUtils.isGizmoUnUsed(
      GameObjectEngineService.unsafeGetGameObjectName(
        OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
          editorState,
        ),
        engineState,
      ),
      editorState,
      engineState,
    )
  && _isSelectCircle(intersectXYPlanePoint, editorState, engineState) ?
    {
      WonderLog.Log.print("select xy plane") |> ignore;

      _selectCircle(
        intersectXYPlanePoint |> OptionService.unsafeGet,
        (
          CurrentTransformGizmosUtils.setCurrentGizmoColor(
            GameObjectEngineService.getAllBasicMaterials(
              HierarchyGameObjectEngineService.getAllGameObjects(
                OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                  editorState,
                ),
                engineState,
              ),
              engineState,
            ),
            GameObjectEngineService.unsafeGetGameObjectName(
              OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                editorState,
              ),
              engineState,
            ),
            CurrentRotationGizmosUtils.isSelected,
          ),
          SelectRotationGizmoSceneViewEditorService.onlySelectXYCircleGizmo,
        ),
        editorState,
        engineState,
      );
    } :
    {
      let intersectXZPlanePoint =
        RayUtils.checkIntersectPlane(
          CircleRotationGizmosUtils.buildXZPlane(editorState, engineState),
          ray,
        );

      !
        ComputeRotationGizmosUtils.isGizmoUnUsed(
          GameObjectEngineService.unsafeGetGameObjectName(
            OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
              editorState,
            ),
            engineState,
          ),
          editorState,
          engineState,
        )
      && _isSelectCircle(intersectXZPlanePoint, editorState, engineState) ?
        {
          WonderLog.Log.print("select xz plane") |> ignore;

          _selectCircle(
            intersectXZPlanePoint |> OptionService.unsafeGet,
            (
              CurrentTransformGizmosUtils.setCurrentGizmoColor(
                GameObjectEngineService.getAllBasicMaterials(
                  HierarchyGameObjectEngineService.getAllGameObjects(
                    OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
                      editorState,
                    ),
                    engineState,
                  ),
                  engineState,
                ),
                GameObjectEngineService.unsafeGetGameObjectName(
                  OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
                    editorState,
                  ),
                  engineState,
                ),
                CurrentRotationGizmosUtils.isSelected,
              ),
              SelectRotationGizmoSceneViewEditorService.onlySelectXZCircleGizmo,
            ),
            editorState,
            engineState,
          );
        } :
        {
          let intersectYZPlanePoint =
            RayUtils.checkIntersectPlane(
              CircleRotationGizmosUtils.buildYZPlane(
                editorState,
                engineState,
              ),
              ray,
            );

          !
            ComputeRotationGizmosUtils.isGizmoUnUsed(
              GameObjectEngineService.unsafeGetGameObjectName(
                OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
                  editorState,
                ),
                engineState,
              ),
              editorState,
              engineState,
            )
          && _isSelectCircle(intersectYZPlanePoint, editorState, engineState) ?
            {
              WonderLog.Log.print("select yz plane") |> ignore;

              _selectCircle(
                intersectYZPlanePoint |> OptionService.unsafeGet,
                (
                  CurrentTransformGizmosUtils.setCurrentGizmoColor(
                    GameObjectEngineService.getAllBasicMaterials(
                      HierarchyGameObjectEngineService.getAllGameObjects(
                        OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
                          editorState,
                        ),
                        engineState,
                      ),
                      engineState,
                    ),
                    GameObjectEngineService.unsafeGetGameObjectName(
                      OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
                        editorState,
                      ),
                      engineState,
                    ),
                    CurrentRotationGizmosUtils.isSelected,
                  ),
                  SelectRotationGizmoSceneViewEditorService.onlySelectYZCircleGizmo,
                ),
                editorState,
                engineState,
              );
            } :
            {
              WonderLog.Log.print("not select any plane") |> ignore;

              (
                editorState
                |> SelectRotationGizmoSceneViewEditorService.markNotSelectAnyRotationGizmo,
                engineState,
              );
            };
        };
    };
};