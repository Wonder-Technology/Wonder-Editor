let selectTextureNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, AssetNodeType.Texture, dispatchFunc, event);

let selectFolderNode =
    (~nodeId, ~event=Obj.magic(-1), ~dispatchFunc=TestTool.getDispatch(), ()) =>
  FileBox.Method.onSelect(nodeId, AssetNodeType.Folder, dispatchFunc, event);