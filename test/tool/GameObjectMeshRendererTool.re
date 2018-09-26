let getAllGameObjectMeshRendererComponent = (gameObject, engineState) => {
  let rec _iterateGameObjectArr = (gameObjectArr, resultArr) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. resultArr, gameObject) => {
           let resultArr =
             engineState
             |> GameObjectComponentEngineService.hasMeshRendererComponent(
                  gameObject,
                ) ?
               resultArr
               |> ArrayService.push(
                    engineState
                    |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                         gameObject,
                       ),
                  ) :
               resultArr;

           _iterateGameObjectArr(
             engineState |> GameObjectUtils.getChildren(gameObject),
             resultArr,
           );
         },
         resultArr,
       );

  _iterateGameObjectArr([|gameObject|], [||]);
};