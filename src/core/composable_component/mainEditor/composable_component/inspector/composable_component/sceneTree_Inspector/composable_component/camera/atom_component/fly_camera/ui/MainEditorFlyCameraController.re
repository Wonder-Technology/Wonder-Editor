module Method = {
  let _blurFlyCameraValue =
      (
        (uiState, dispatchFunc),
        flyCameraController,
        value,
        (
          unsafeGetFlyCameraControllerValueFunc,
          pushUndoStackWithCopiedEngineStateFunc,
        ),
      ) =>
    unsafeGetFlyCameraControllerValueFunc(flyCameraController)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      pushUndoStackWithCopiedEngineStateFunc(
        (uiState, dispatchFunc),
        flyCameraController,
        value,
      );

  let changeMoveSpeed = (flyCameraController, value) =>
    FlyCameraEngineService.setFlyCameraControllerMoveSpeed(
      flyCameraController,
      value,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurFlyCameraMoveSpeed =
      ((uiState, dispatchFunc), flyCameraController, moveSpeed) =>
    _blurFlyCameraValue(
      (uiState, dispatchFunc),
      flyCameraController,
      moveSpeed,
      (
        FlyCameraEngineService.unsafeGetFlyCameraControllerMoveSpeed,
        FlyCameraMoveSpeedEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let changeRotateSpeed = (flyCameraController, value) =>
    FlyCameraEngineService.setFlyCameraControllerRotateSpeed(
      flyCameraController,
      value,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurFlyCameraRotateSpeed =
      ((uiState, dispatchFunc), flyCameraController, rotateSpeed) =>
    _blurFlyCameraValue(
      (uiState, dispatchFunc),
      flyCameraController,
      rotateSpeed,
      (
        FlyCameraEngineService.unsafeGetFlyCameraControllerRotateSpeed,
        FlyCameraRotateSpeedEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let changeWheelSpeed = (flyCameraController, value) =>
    FlyCameraEngineService.setFlyCameraControllerWheelSpeed(
      flyCameraController,
      value,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurFlyCameraWheelSpeed =
      ((uiState, dispatchFunc), flyCameraController, wheelSpeed) =>
    _blurFlyCameraValue(
      (uiState, dispatchFunc),
      flyCameraController,
      wheelSpeed,
      (
        FlyCameraEngineService.unsafeGetFlyCameraControllerWheelSpeed,
        FlyCameraWheelSpeedEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      ),
    );

  let renderMoveSpeed =
      (
        (uiState, dispatchFunc) as uiStoreDataTuple,
        flyCameraController,
        languageType,
      ) =>
    <MainEditorFloatInputBaseComponent
      label="Move Speed"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "fly-move-speed-describe",
          languageType,
        )
      }
      defaultValue={
        FlyCameraEngineService.unsafeGetFlyCameraControllerMoveSpeed(
          flyCameraController,
        )
        |> StateLogicService.getEngineStateToGetData
      }
      changeComponentValueFunc={changeMoveSpeed(flyCameraController)}
      blurValueFunc={
        blurFlyCameraMoveSpeed(uiStoreDataTuple, flyCameraController)
      }
      dragDropFunc={
        blurFlyCameraMoveSpeed(uiStoreDataTuple, flyCameraController)
      }
    />;
  let renderRotateSpeed =
      (
        (uiState, dispatchFunc) as uiStoreDataTuple,
        flyCameraController,
        languageType,
      ) =>
    <MainEditorFloatInputBaseComponent
      label="Rotate Speed"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "fly-rotate-speed-describe",
          languageType,
        )
      }
      defaultValue={
        FlyCameraEngineService.unsafeGetFlyCameraControllerRotateSpeed(
          flyCameraController,
        )
        |> StateLogicService.getEngineStateToGetData
      }
      changeComponentValueFunc={changeRotateSpeed(flyCameraController)}
      blurValueFunc={
        blurFlyCameraRotateSpeed(uiStoreDataTuple, flyCameraController)
      }
      dragDropFunc={
        blurFlyCameraRotateSpeed(uiStoreDataTuple, flyCameraController)
      }
    />;
  let renderWheelSpeed =
      (
        (uiState, dispatchFunc) as uiStoreDataTuple,
        flyCameraController,
        languageType,
      ) =>
    <MainEditorFloatInputBaseComponent
      label="Wheel Speed"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "fly-wheel-speed-describe",
          languageType,
        )
      }
      defaultValue={
        FlyCameraEngineService.unsafeGetFlyCameraControllerWheelSpeed(
          flyCameraController,
        )
        |> StateLogicService.getEngineStateToGetData
      }
      changeComponentValueFunc={changeWheelSpeed(flyCameraController)}
      blurValueFunc={
        blurFlyCameraWheelSpeed(uiStoreDataTuple, flyCameraController)
      }
      dragDropFunc={
        blurFlyCameraWheelSpeed(uiStoreDataTuple, flyCameraController)
      }
    />;
};

let component =
  ReasonReact.statelessComponent("MainEditorFlyCameraController");

let render =
    ((uiState, dispatchFunc) as uiStoreDataTuple, flyCameraController, _self) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="wonder-inspector-flyCameraController">
    {
      Method.renderMoveSpeed(
        uiStoreDataTuple,
        flyCameraController,
        languageType,
      )
    }
    {
      Method.renderRotateSpeed(
        uiStoreDataTuple,
        flyCameraController,
        languageType,
      )
    }
    {
      Method.renderWheelSpeed(
        uiStoreDataTuple,
        flyCameraController,
        languageType,
      )
    }
  </article>;
};

let make = (~uiState, ~dispatchFunc, ~flyCameraController, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), flyCameraController, self),
};