open Wonderjs;

open GameObjectType;

let create = MainEditorGameObjectAdaptor.create;

let addChild = (parent: gameObject, child: gameObject, state) =>
  MainEditorTransformAdaptor.setParent(
    MainEditorGameObjectAdaptor.getTransformComponent(parent, state),
    MainEditorGameObjectAdaptor.getTransformComponent(child, state),
    state
  );

let getChildren = (gameObject: gameObject, state) =>
  MainEditorTransformAdaptor.getChildren(
    MainEditorGameObjectAdaptor.getTransformComponent(gameObject, state),
    state
  )
  |> Js.Array.map((transform) => MainEditorTransformAdaptor.getGameObject(transform, state));