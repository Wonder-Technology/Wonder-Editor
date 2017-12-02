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

let getTransformComponent = MainEditorGameObjectAdaptor.getTransformComponent;