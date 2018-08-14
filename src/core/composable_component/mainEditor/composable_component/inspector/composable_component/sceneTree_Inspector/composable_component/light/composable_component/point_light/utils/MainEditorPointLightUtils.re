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
    PointLightEngineService.setPointLightIntensity(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DiffType.PointLight},
       |]);

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
    PointLightEngineService.setPointLightConstant(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DiffType.PointLight},
       |]);

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
    PointLightEngineService.setPointLightLinear(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DiffType.PointLight},
       |]);

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
    PointLightEngineService.setPointLightQuadratic(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DiffType.PointLight},
       |]);

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
    PointLightEngineService.setPointLightRange(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|lightComponent|], type_: DiffType.PointLight},
       |]);