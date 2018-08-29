open Wonderjs;

let create = GameObjectAPI.createGameObject;

let initGameObject = GameObjectAPI.initGameObject;

let disposeGameObject = GameObjectAPI.disposeGameObject;

let cloneGameObject = GameObjectAPI.cloneGameObject;

let disposeGameObjectKeepOrder = GameObjectAPI.disposeGameObjectKeepOrder;

let disposeGameObjectKeepOrderRemoveGeometry = GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometry;

/* let hasGameObjectBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent; */
/*
 let hasGameObjectLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent; */

/* let hasGameObjectDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

   let hasGameObjectPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent; */

let getGameObjectName = GameObjectAPI.getGameObjectName;

let unsafeGetGameObjectName = GameObjectAPI.unsafeGetGameObjectName;

let setGameObjectName = (name, gameObject, engineState) =>
  GameObjectAPI.setGameObjectName(gameObject, name, engineState);

let _getChildren = (parent, state) =>
  TransformAPI.unsafeGetTransformChildren(parent, state)
  |> Js.Array.sortInPlace;

let getAllChildrenTransform = (rootGameObject, state) => {
  let rec _addChildren = (parentArr, state, childrenArr) => {
    let childrenArr = childrenArr |> Js.Array.concat(parentArr);
    parentArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (state, childrenArr), parent) =>
           _addChildren(_getChildren(parent, state), state, childrenArr),
         (state, childrenArr),
       );
  };
  _addChildren(
    _getChildren(
      GameObjectAPI.unsafeGetGameObjectTransformComponent(
        rootGameObject,
        state,
      ),
      state,
    ),
    state,
    [||],
  );
};

let getAllGameObjects = (rootGameObject, state) => {
  let (state, allTransformChildren) =
    getAllChildrenTransform(rootGameObject, state);

  [|rootGameObject|]
  |> Js.Array.concat(
       allTransformChildren
       |> Js.Array.map(transform =>
            TransformAPI.unsafeGetTransformGameObject(transform, state)
          ),
     );
};