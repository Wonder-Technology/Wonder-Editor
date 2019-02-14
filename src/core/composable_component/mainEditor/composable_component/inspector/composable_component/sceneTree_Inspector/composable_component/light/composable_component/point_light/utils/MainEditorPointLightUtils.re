  let blurIntensityEvent = ((uiState, dispatchFunc), lightComponent, intensity) =>
    PointLightEngineService.getPointLightIntensity(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, intensity) ?
      () :
      PointLightIntensityBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        lightComponent,
        intensity,
      );

  let changeIntensity = (lightComponent, value) =>
    PointLightEngineService.setPointLightIntensity(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurConstantEvent = ((uiState, dispatchFunc), lightComponent, constant) =>
    PointLightEngineService.getPointLightConstant(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, constant) ?
      () :
      PointLightConstantBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        lightComponent,
        constant,
      );

  let changeConstant = (lightComponent, value) =>
    PointLightEngineService.setPointLightConstant(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurLinearEvent = ((uiState, dispatchFunc), lightComponent, linear) =>
    PointLightEngineService.getPointLightLinear(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, linear) ?
      () :
      PointLightLinearBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        lightComponent,
        linear,
      );

  let changeLinear = (lightComponent, value) =>
    PointLightEngineService.setPointLightLinear(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurQuadraticEvent = ((uiState, dispatchFunc), lightComponent, quadratic) =>
    PointLightEngineService.getPointLightQuadratic(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, quadratic) ?
      () :
      PointLightQuadraticBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        lightComponent,
        quadratic,
      );

  let changeQuadratic = (lightComponent, value) =>
    PointLightEngineService.setPointLightQuadratic(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurRangeEvent = ((uiState, dispatchFunc), lightComponent, range) =>
    PointLightEngineService.getPointLightRange(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, range) ?
      () :
      PointLightRangeBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        lightComponent,
        range,
      );

  let changeRange = (lightComponent, value) =>
    PointLightEngineService.setPointLightRange(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;