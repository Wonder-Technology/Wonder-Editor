open Wonderjs;

open TransformType;

let getLocalPosition = Wonderjs.Transform.getTransformLocalPosition;

let setLocalPosition = Wonderjs.Transform.setTransformLocalPosition;

let setParent = (parent: transform, child: transform, state) =>
  Wonderjs.Transform.setTransformParent(Js.Nullable.return(parent), child, state);

let getChildren = (transform: transform, state) =>
  Wonderjs.Transform.getTransformChildren(transform, state);

let getGameObject = Wonderjs.Transform.getTransformGameObject;