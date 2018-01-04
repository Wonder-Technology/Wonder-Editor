let create = MainEditorGameObjectAdaptor.create;

let addChild = (parent, child, state) =>
  MainEditorTransformAdaptor.setParent(
    MainEditorGameObjectAdaptor.getTransformComponent(parent, state),
    MainEditorGameObjectAdaptor.getTransformComponent(child, state),
    state
  );

let getChildren = (gameObject, state) =>
  MainEditorTransformAdaptor.getChildren(
    MainEditorGameObjectAdaptor.getTransformComponent(gameObject, state),
    state
  )
  |> Js.Array.map((transform) => MainEditorTransformAdaptor.getGameObject(transform, state));

let hasChildren = (gameObject, state) => getChildren(gameObject, state) |> Js.Array.length > 0;

let getTransformComponent = MainEditorGameObjectAdaptor.getTransformComponent;

let disposeGameObject = MainEditorGameObjectAdaptor.disposeGameObject;