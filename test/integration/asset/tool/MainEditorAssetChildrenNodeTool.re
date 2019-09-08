let selectTextureNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectCubemapNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectMaterialNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectFolderNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectAssetBundleNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectIMGUIExecFuncDataNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectIMGUICustomControlNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectIMGUISkinNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);

let selectFntNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, dispatchFunc, event);