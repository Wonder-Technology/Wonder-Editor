let addChild = (parent, child, state) =>
  TransformLogicSingleService.setParent(
    GameObjectLogicSingleService.getTransformComponent(parent, state),
    GameObjectLogicSingleService.getTransformComponent(child, state),
    state
  );

let getChildren = (gameObject, state) =>
  TransformLogicSingleService.getChildren(
    GameObjectLogicSingleService.getTransformComponent(gameObject, state),
    state
  )
  |> Js.Array.map((transform) => TransformLogicSingleService.getGameObjectByTransform(transform, state));

let hasChildren = (gameObject, state) => getChildren(gameObject, state) |> Js.Array.length > 0;

let addBox = (targetGameObject, (editorState, engineState)) => {
  let (engineState, box) = PrimitiveLogicCompositeService.createBox(engineState);
  (
    box,
    (
      editorState,
      engineState
      |> GameObjectLogicSingleService.initGameObject(box)
      |> addChild(targetGameObject, box)
    )
  )
};