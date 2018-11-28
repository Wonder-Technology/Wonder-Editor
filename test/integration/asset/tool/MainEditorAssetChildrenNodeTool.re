let selectTextureNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, AssetNodeType.Texture, dispatchFunc, event);

let selectMaterialNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(
    nodeId,
    AssetNodeType.Material,
    dispatchFunc,
    event,
  );

let selectFolderNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, AssetNodeType.Folder, dispatchFunc, event);