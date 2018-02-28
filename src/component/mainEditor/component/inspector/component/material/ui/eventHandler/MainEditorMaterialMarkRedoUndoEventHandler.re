module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;
  let onMarkRedoUndo = ((store, dispatch), materialComponent, value) => {
    WonderLog.Log.print(value) |> ignore;
    MainEditorMaterialView.setBasicMaterialColor(materialComponent, [|0.4, 0.6, 0.7|])
    |> OperateStateUtils.getAndSetState
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);