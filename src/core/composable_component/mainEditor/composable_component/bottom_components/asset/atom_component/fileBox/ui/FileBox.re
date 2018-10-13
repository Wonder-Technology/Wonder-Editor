open CurrentNodeDataType;

open UpdateStore;

module Method = {
  let onSelect = (fileId, fileType, dispatchFunc, _event) => {
    StateEditorService.getState()
    |> AssetCurrentNodeDataEditorService.setCurrentNodeData({
         currentNodeId: fileId,
         nodeType: fileType,
       })
    |> StateEditorService.setState
    |> ignore;

    StateEditorService.getState()
    |> SceneEditorService.clearCurrentSceneTreeNode
    |> CurrentSelectSourceEditorService.setCurrentSelectSource(
         EditorType.Asset,
       )
    |> StateEditorService.setState
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
  };
};

let component = ReasonReact.statelessComponent("FileBox");

let render =
    (
      (_store, dispatchFunc),
      (dragImg, imgSrc, fileId, fileType, fileName, widget, isSelected),
      _self,
    ) => {
  let className = "item-text " ++ (isSelected ? "item-active" : "");
  <article
    className="wonder-asset-fileBox "
    onClick=(
      _event => Method.onSelect(fileId, fileType, dispatchFunc, _event)
    )>
    <div className="box-image">
      <img
        src=imgSrc
        onDragStart=(DragEventBaseUtils.dragStart(fileId, widget, dragImg))
      />
    </div>
    <div className> <span> (DomHelper.textEl(fileName)) </span> </div>
  </article>;
};

let make =
    (
      ~store,
      ~dispatchFunc,
      ~dragImg,
      ~imgSrc,
      ~fileId,
      ~fileType,
      ~fileName,
      ~widget,
      ~isSelected,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (store, dispatchFunc),
      (dragImg, imgSrc, fileId, fileType, fileName, widget, isSelected),
      self,
    ),
};