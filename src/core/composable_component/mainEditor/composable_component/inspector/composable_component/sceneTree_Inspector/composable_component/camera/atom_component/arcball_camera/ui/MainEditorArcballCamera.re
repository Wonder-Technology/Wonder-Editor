

module Method = {
  let blurArcbalCameraDistance =
      ((store, dispatchFunc), arcballCameraController, distance) => {
    ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
      arcballCameraController,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, distance) ?
      () :
      ArcballCameraDistanceEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        arcballCameraController,
        distance,
      );

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };

  let blurArcbalCameraMinDistance =
      ((store, dispatchFunc), arcballCameraController, minDistance) => {
    ArcballCameraEngineService.unsafeGetArcballCameraControllerMinDistance(
      arcballCameraController,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, minDistance) ?
      () :
      ArcballCameraMinDistanceEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        arcballCameraController,
        minDistance,
      );

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };

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
};

let component = ReasonReact.statelessComponent("MainEditorArcballCamera");

let render = ((store, dispatchFunc), arcballCameraController, _self) =>
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
        Method.blurArcbalCameraDistance(
          (store, dispatchFunc),
          arcballCameraController,
        )
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
        Method.blurArcbalCameraMinDistance(
          (store, dispatchFunc),
          arcballCameraController,
        )
      )
    />
  </article>;

let make = (~store, ~dispatchFunc, ~arcballCameraController, _children) => {
  ...component,
  render: self =>
    render((store, dispatchFunc), arcballCameraController, self),
};