let generate = (wdbGameObject, imageUint8ArrayMap, engineState) => {
  let (engineState, _, wdbArrayBuffer) =
    GenerateSceneGraphEngineService.generateWDBForASB(
      wdbGameObject,
      Js.Nullable.return(imageUint8ArrayMap),
      engineState,
    );

  (engineState, wdbArrayBuffer);
};