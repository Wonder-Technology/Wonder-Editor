open Wonderjs;

open TransformType;

let getLocalPosition = Transform.getTransformLocalPosition;

let setLocalPosition = Transform.setTransformLocalPosition;

let setParent = (parent: transform, child: transform, state) =>
  Transform.setTransformParent(Js.Nullable.return(parent), child, state);

let getChildren = (transform: transform, state) =>
  Transform.getTransformChildren(transform, state);

let getGameObject = Transform.getTransformGameObject;