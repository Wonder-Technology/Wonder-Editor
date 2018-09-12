  let blurIntensityEvent = ((store, dispatchFunc), lightComponent, intensity) =>
    PointLightEngineService.getPointLightIntensity(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, intensity) ?
      () :
      PointLightIntensityBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        intensity,
      );

  let changeIntensity = (lightComponent, value) =>
    PointLightEngineService.setPointLightIntensity(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurConstantEvent = ((store, dispatchFunc), lightComponent, constant) =>
    PointLightEngineService.getPointLightConstant(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, constant) ?
      () :
      PointLightConstantBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        constant,
      );

  let changeConstant = (lightComponent, value) =>
    PointLightEngineService.setPointLightConstant(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurLinearEvent = ((store, dispatchFunc), lightComponent, linear) =>
    PointLightEngineService.getPointLightLinear(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, linear) ?
      () :
      PointLightLinearBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        linear,
      );

  let changeLinear = (lightComponent, value) =>
    PointLightEngineService.setPointLightLinear(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurQuadraticEvent = ((store, dispatchFunc), lightComponent, quadratic) =>
    PointLightEngineService.getPointLightQuadratic(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, quadratic) ?
      () :
      PointLightQuadraticBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        quadratic,
      );

  let changeQuadratic = (lightComponent, value) =>
    PointLightEngineService.setPointLightQuadratic(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurRangeEvent = ((store, dispatchFunc), lightComponent, range) =>
    PointLightEngineService.getPointLightRange(lightComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, range) ?
      () :
      PointLightRangeBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        lightComponent,
        range,
      );

  let changeRange = (lightComponent, value) =>
    PointLightEngineService.setPointLightRange(value, lightComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;