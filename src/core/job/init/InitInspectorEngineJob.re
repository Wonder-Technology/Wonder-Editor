let initInspectorEngineJob = (_, inspectorEngineState) => {
  let (inspectorEngineState, camera) =
    PrimitiveEngineService.createCamera(inspectorEngineState);
  /* let (inspectorEngineState, sphere) =
    PrimitiveEngineService.createSphereTest(inspectorEngineState); */
  let (inspectorEngineState, directionLight) =
    PrimitiveEngineService.createDirectionLight(inspectorEngineState);

  inspectorEngineState
};