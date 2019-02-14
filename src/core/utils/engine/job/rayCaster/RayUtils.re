open ShapeType;

let _createPerspectiveCameraRay =
    (
      {x, y}: CoordinateType.mouseData,
      {cameraToWorldMatrix, projectionMatrix}: RayType.perspectiveCameraData,
    )
    : RayType.ray => {
  let origin =
    cameraToWorldMatrix |> Wonderjs.Matrix4Service.getTranslationTuple;

  {
    origin,
    direction:
      Vector3Service.unproject(
        (x, y, (-1.0)),
        cameraToWorldMatrix,
        projectionMatrix,
      )
      |> Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, _, origin)
      |> Wonderjs.Vector3Service.normalize,
  };
};

let _getPerspectiveCameraData =
    (cameraGameObject, (editorState, engineState))
    : RayType.perspectiveCameraData => {
  cameraToWorldMatrix:
    BasicCameraViewEngineService.getBasicCameraViewWorldToCameraMatrix(
      GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    )
    |> Wonderjs.Matrix4Service.invert(
         _,
         Wonderjs.Matrix4Service.createIdentityMatrix4(),
       ),
  projectionMatrix:
    PerspectiveCameraProjectionEngineService.unsafeGetPerspectiveCameraProjectionPMatrix(
      GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
        cameraGameObject,
        engineState,
      ),
      engineState,
    ),
};

let createPerspectiveCameraRayFromEvent =
    (
      {userData}: EventType.customEvent,
      cameraGameObject,
      (editorState, engineState),
    ) => {
  let {locationInView}: EventType.pointEvent =
    EventType.userDataToPointEvent(userData |> OptionService.unsafeGet);

  let (locationInViewX, locationInViewY) = locationInView;

  _createPerspectiveCameraRay(
    CoordinateUtils.convertMouselocationInViewToNDC(
      locationInView,
      CoordinateUtils.getSceneViewSize(editorState),
    ),
    _getPerspectiveCameraData(cameraGameObject, (editorState, engineState)),
  );
};

let applyMatrix4 = ({origin, direction}: RayType.ray, mat4) : RayType.ray => {
  let direction =
    Wonderjs.Vector3Service.add(Wonderjs.Vector3Type.Float, direction, origin)
    |> Wonderjs.Vector3Service.transformMat4Tuple(_, mat4);

  let origin = Wonderjs.Vector3Service.transformMat4Tuple(origin, mat4);

  {
    origin,
    direction:
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        direction,
        origin,
      )
      |> Wonderjs.Vector3Service.normalize,
  };
};

let distanceToPlane =
    ({normal, constant} as plane, ({origin, direction}: RayType.ray) as ray) => {
  let denominator = Vector3Service.dot(normal, direction);

  denominator === 0. ?
    PlaneShapeUtils.distanceToPoint(origin, plane) === 0. ? Some(0.) : None :
    {
      let t =
        -. (Vector3Service.dot(origin, normal) +. constant) /. denominator;

      /*

       /* Return if the ray never intersects the plane

          t >= 0. ? Some(t) : None;
          */

          */

      Some(t);
    };
};


/*

 let _getCenter = (min, max) =>
      Wonderjs.Vector3Service.add(Wonderjs.Vector3Type.Float, max, min)
      |> Wonderjs.Vector3Service.scale(Wonderjs.Vector3Type.Float, 0.5);

    let _getHalfExtends = (min, max) =>
      Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, max, min)
      |> Wonderjs.Vector3Service.scale(Wonderjs.Vector3Type.Float, 0.5);

    let isIntersectAABB = ({min, max}, {origin, direction} as ray) => {
      let (originX, originY, originZ) = origin;
      let (directionX, directionY, directionZ) = direction;
      /* let (minX, minY, minZ) = min;
         let (maxX, maxY, maxZ) = max; */

      let (centerX, centerY, centerZ) as center = _getCenter(min, max);
      let (halfExtendsX, halfExtendsY, halfExtendsZ) as halfExtends =
        _getHalfExtends(min, max);




      let (diffX, diffY, diffZ) as diff =
        Wonderjs.Vector3Service.sub(Wonderjs.Vector3Type.Float, origin, center);

      let (absDiffX, absDiffY, absDiffZ) as absDiff = (
        Js.Math.abs_float(diffX),
        Js.Math.abs_float(diffY),
        Js.Math.abs_float(diffZ),
      );

      let (prodX, prodY, prodZ) as prod =
        Wonderjs.Vector3Service.multiply(
          Wonderjs.Vector3Type.Float,
          diff,
          direction,
        );


      if (absDiffX > halfExtendsX
          && prodX >= 0.
          || absDiffY > halfExtendsY
          && prodY >= 0.
          || absDiffZ > halfExtendsZ
          && prodZ >= 0.) {
        false;
      } else {
        let (absDirX, absDirY, absDirZ) as absDir = (
          Js.Math.abs_float(directionX),
          Js.Math.abs_float(directionY),
          Js.Math.abs_float(directionZ),
        );

        let (crossX, crossY, crossZ) =
          Wonderjs.Vector3Service.cross(direction, diff);

        let (crossX, crossY, crossZ) as cross = (
          Js.Math.abs_float(crossX),
          Js.Math.abs_float(crossY),
          Js.Math.abs_float(crossZ),
        );

        if (crossX > halfExtendsY
            *. absDirZ
            +. halfExtendsZ
            *. absDirY
            || crossY > halfExtendsX
            *. absDirZ
            +. halfExtendsZ
            *. absDirX
            || crossZ > halfExtendsX
            *. absDirY
            +. halfExtendsY
            *. absDirX) {
          false;
        } else {
          true;
        };
      };
    }; */
