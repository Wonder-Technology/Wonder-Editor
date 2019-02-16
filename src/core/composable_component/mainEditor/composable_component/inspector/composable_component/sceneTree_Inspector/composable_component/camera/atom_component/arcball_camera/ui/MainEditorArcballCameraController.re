module Method = {
  let _blurArcballCameraValue =
      (
        (uiState, dispatchFunc),
        arcballCameraController,
        value,
        (
          unsafeGetArcballCameraControllerValueFunc,
          pushUndoStackWithCopiedEngineStateFunc,
        ),
      ) =>
    unsafeGetArcballCameraControllerValueFunc(arcballCameraController)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      pushUndoStackWithCopiedEngineStateFunc(
        (uiState, dispatchFunc),
        arcballCameraController,
        value,
      );
      /* TransformUtils.refreshTransformWithDispatchFunc(dispatchFunc)
         |> StateLogicService.getAndSetStateToGetData; */

  let _blurArcballCameraTarget =
      (
        (uiState, dispatchFunc),
        arcballCameraController,
        target,
        (
          unsafeGetArcballCameraControllerTargetFunc,
          pushUndoStackWithCopiedEngineStateFunc,
        ),
      ) => {
    let newTarget =
      unsafeGetArcballCameraControllerTargetFunc(arcballCameraController)
      |> StateLogicService.getEngineStateToGetData;

    Vector3Service.isEqual(target, newTarget) ?
      () :
      pushUndoStackWithCopiedEngineStateFunc(
        (uiState, dispatchFunc),
        arcballCameraController,
        target,
      );

    /* TransformUtils.refreshTransformWithDispatchFunc(dispatchFunc)
    |> StateLogicService.getAndSetStateToGetData; */
  };

  let blurArcballCameraDistance =
      ((uiState, dispatchFunc), arcballCameraController, distance) =>
    _blurArcballCameraValue(
      (uiState, dispatchFunc),
      arcballCameraController,
      distance,
      (
        ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance,
        ArcballCameraDistanceEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let blurArcballCameraMinDistance =
      ((uiState, dispatchFunc), arcballCameraController, minDistance) =>
    _blurArcballCameraValue(
      (uiState, dispatchFunc),
      arcballCameraController,
      minDistance,
      (
        ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance,
        ArcballCameraMinDistanceEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let blurArcballCameraPhi =
      ((uiState, dispatchFunc), arcballCameraController, minDistance) =>
    _blurArcballCameraValue(
      (uiState, dispatchFunc),
      arcballCameraController,
      minDistance,
      (
        ArcballCameraEngineService.unsafeGetArcballCameraControllerPhi,
        ArcballCameraPhiEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let blurArcballCameraTheta =
      ((uiState, dispatchFunc), arcballCameraController, minDistance) =>
    _blurArcballCameraValue(
      (uiState, dispatchFunc),
      arcballCameraController,
      minDistance,
      (
        ArcballCameraEngineService.unsafeGetArcballCameraControllerTheta,
        ArcballCameraThetaEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let blurArcballCameraTarget =
      ((uiState, dispatchFunc), arcballCameraController, target) =>
    _blurArcballCameraTarget(
      (uiState, dispatchFunc),
      arcballCameraController,
      target,
      (
        ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget,
        ArcballCameraTargetEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let changeDistance = (arcballCameraController, value) =>
    ArcballCameraEngineService.setArcballCameraControllerDistance(
      value,
      arcballCameraController,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let changeMinDistance = (arcballCameraController, value) =>
    ArcballCameraEngineService.setArcballCameraControllerMinDistance(
      value,
      arcballCameraController,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let changePhi = (arcballCameraController, value) =>
    ArcballCameraEngineService.setArcballCameraControllerPhi(
      arcballCameraController,
      value,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let changeTheta = (arcballCameraController, value) =>
    ArcballCameraEngineService.setArcballCameraControllerTheta(
      arcballCameraController,
      value,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let _setTarget = (arcballCameraController, target) =>
    ArcballCameraEngineService.setArcballCameraControllerTarget(
      arcballCameraController,
      target,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let changeTargetX = (arcballCameraController, value) => {
    let (_x, y, z) =
      ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
        arcballCameraController,
      )
      |> StateLogicService.getEngineStateToGetData;

    _setTarget(arcballCameraController, (value, y, z));
  };

  let changeTargetY = (arcballCameraController, value) => {
    let (x, _y, z) =
      ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
        arcballCameraController,
      )
      |> StateLogicService.getEngineStateToGetData;

    _setTarget(arcballCameraController, (x, value, z));
  };

  let changeTargetZ = (arcballCameraController, value) => {
    let (x, y, _z) =
      ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
        arcballCameraController,
      )
      |> StateLogicService.getEngineStateToGetData;

    _setTarget(arcballCameraController, (x, y, value));
  };
};

let component =
  ReasonReact.statelessComponent("MainEditorArcballCameraController");

let render = ((uiState, dispatchFunc), arcballCameraController, _self) =>
  <article className="wonder-inspector-arcballCameraController">
    <MainEditorFloatInputBaseComponent
      label="Distance"
      getComponentValueFunc=(
        ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
          arcballCameraController,
        )
      )
      changeComponentValueFunc=(
        Method.changeDistance(arcballCameraController)
      )
      blurValueFunc=(
        Method.blurArcballCameraDistance(
          (uiState, dispatchFunc),
          arcballCameraController,
        )
      )
      dragDropFunc=(
        _ =>
          TransformUtils.refreshTransformWithDispatchFunc(dispatchFunc)
          |> StateLogicService.getAndSetStateToGetData
      )
    />
    <MainEditorFloatInputBaseComponent
      label="Min Distance"
      getComponentValueFunc=(
        ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance(
          arcballCameraController,
        )
      )
      changeComponentValueFunc=(
        Method.changeMinDistance(arcballCameraController)
      )
      blurValueFunc=(
        Method.blurArcballCameraMinDistance(
          (uiState, dispatchFunc),
          arcballCameraController,
        )
      )
      dragDropFunc=(
        _ => {
          WonderLog.Log.debug(
            WonderLog.Log.buildDebugMessage(
              ~description={j|aaa|j},
              ~params={j||j},
            ),
            true,
          );

          TransformUtils.refreshTransformWithDispatchFunc(dispatchFunc)
          |> StateLogicService.getAndSetStateToGetData;
        }
      )
    />
    <ThreeFloatInput
      uiState
      dispatchFunc
      label="Target"
      gameObjectComponent=arcballCameraController
      changeXFunc=Method.changeTargetX
      changeYFunc=Method.changeTargetY
      changeZFunc=Method.changeTargetZ
      getDataFunc=ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget
      blurEventFunc=Method.blurArcballCameraTarget
      dragDropFunc=(
        _ =>
          TransformUtils.refreshTransformWithDispatchFunc(dispatchFunc)
          |> StateLogicService.getAndSetStateToGetData
      )
      canBeZero=true
    />
    <MainEditorFloatInputBaseComponent
      label="Phi"
      getComponentValueFunc=(
        ArcballCameraEngineService.unsafeGetArcballCameraControllerPhi(
          arcballCameraController,
        )
      )
      changeComponentValueFunc=(Method.changePhi(arcballCameraController))
      blurValueFunc=(
        Method.blurArcballCameraPhi(
          (uiState, dispatchFunc),
          arcballCameraController,
        )
      )
      dragDropFunc=(
        _ =>
          TransformUtils.refreshTransformWithDispatchFunc(dispatchFunc)
          |> StateLogicService.getAndSetStateToGetData
      )
    />
    <MainEditorFloatInputBaseComponent
      label="Theta"
      getComponentValueFunc=(
        ArcballCameraEngineService.unsafeGetArcballCameraControllerTheta(
          arcballCameraController,
        )
      )
      changeComponentValueFunc=(Method.changeTheta(arcballCameraController))
      blurValueFunc=(
        Method.blurArcballCameraTheta(
          (uiState, dispatchFunc),
          arcballCameraController,
        )
      )
      dragDropFunc=(
        _ =>
          TransformUtils.refreshTransformWithDispatchFunc(dispatchFunc)
          |> StateLogicService.getAndSetStateToGetData
      )
    />
  </article>;

let make = (~uiState, ~dispatchFunc, ~arcballCameraController, _children) => {
  ...component,
  render: self =>
    render((uiState, dispatchFunc), arcballCameraController, self),
};