let addChild = (parent, child, state) =>
  TransformLogicService.setParent(
    GameObjectLogicService.getTransformComponent(parent, state),
    GameObjectLogicService.getTransformComponent(child, state),
    state
  );

let getChildren = (gameObject, state) =>
  TransformLogicService.getChildren(
    GameObjectLogicService.getTransformComponent(gameObject, state),
    state
  )
  |> Js.Array.map((transform) => TransformLogicService.getGameObjectByTransform(transform, state));

let hasChildren = (gameObject, state) => getChildren(gameObject, state) |> Js.Array.length > 0;

let addBox = (targetGameObject, (editorState, engineState)) => {
  let (engineState, box) = PrimitiveCompositeService.createBox(engineState);
  (
    box,
    (
      editorState,
      engineState
      |> GameObjectLogicService.initGameObject(box)
      |> addChild(targetGameObject, box)
    )
  )
};