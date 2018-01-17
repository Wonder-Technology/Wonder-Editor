open Wonderjs;

open TransformType;

let getLocalPosition = Wonderjs.Transform.getTransformLocalPosition;

let setLocalPosition = Wonderjs.Transform.setTransformLocalPosition;

let getParent = (child: transform, state) => Wonderjs.Transform.getTransformParent(child, state);

let setParent = (parent: transform, child: transform, state) =>
  Wonderjs.Transform.setTransformParent(Js.Nullable.return(parent), child, state);

let setTransformParentKeepOrder = (parent: transform, child: transform, state) =>
  Wonderjs.Transform.setTransformParentKeepOrder(Js.Nullable.return(parent), child, state);

let getChildren = (transform: transform, state) =>
  Wonderjs.Transform.getTransformChildren(transform, state);

let getGameObject = Wonderjs.Transform.getTransformGameObject;