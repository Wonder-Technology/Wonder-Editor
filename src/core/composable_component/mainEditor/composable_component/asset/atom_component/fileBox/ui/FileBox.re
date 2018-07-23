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
      (dragImg, imgSrc, fileId, fileType, fileName, flag, isSelected),
      _self,
    ) => {
  let className = "wonder-asset-fileBox " ++ (isSelected ? "item-active" : "");
  <article
    className
    onClick=(
      _event => Method.onSelect(fileId, fileType, dispatchFunc, _event)
    )>
    <img
      src=imgSrc
      onDragStart=(DragEventBaseUtils.dragStart(fileId, flag, dragImg))
    />
    <span className="item-text"> (DomHelper.textEl(fileName)) </span>
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
      ~flag,
      ~isSelected,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (store, dispatchFunc),
      (dragImg, imgSrc, fileId, fileType, fileName, flag, isSelected),
      self,
    ),
};