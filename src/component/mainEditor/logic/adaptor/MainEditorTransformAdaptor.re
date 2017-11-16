open Wonderjs;

open TransformType;

let setLocalPosition = Transform.setTransformLocalPosition;

let setParent = (parent: transform, child: transform, state) =>
  Transform.setTransformParent(Js.Nullable.return(parent), child, state);

let getGameObject = Transform.getTransformGameObject;