let getLocalPosition = () =>
  MainEditorStateView.prepareState()
  |> MainEditorComponentView.InspectorView.TransformView.getLocalPosition;

let setLocalPosition = (x, y, z) =>
  MainEditorStateView.prepareState()
  |> MainEditorComponentView.InspectorView.TransformView.setLocalPosition((x, y, z))
  |> MainEditorStateView.finishState;

let changeX = (value) => {
  let (x, y, z) = getLocalPosition();
  setLocalPosition(value, y, z)
};

let changeY = (value) => {
  let (x, y, z) = getLocalPosition();
  setLocalPosition(x, value, z)
};

let changeZ = (value) => {
  let (x, y, z) = getLocalPosition();
  setLocalPosition(x, y, value)
};
/* let getMainEditorTransformMap = () => {
     let mainEditorTransformMap = WonderCommonlib.HashMapSystem.createEmpty();
     WonderCommonlib.HashMapSystem.set(
       "getLocalPosition",
       Obj.magic(getLocalPosition),
       mainEditorTransformMap
     )
     |> WonderCommonlib.HashMapSystem.set("changeX", Obj.magic(changeX))
     |> WonderCommonlib.HashMapSystem.set("changeY", Obj.magic(changeY))
     |> WonderCommonlib.HashMapSystem.set("changeZ", Obj.magic(changeZ))
     |> ignore;
     mainEditorTransformMap
   }; */