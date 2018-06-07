module Method = {
  let onSelect = (fileId, dispatchFunc, _event) => {
    (
      editorState =>
        editorState
        |> AssetCurrentNodeIdEditorService.setCurrentNodeId(fileId)
        |> CurrentSelectSourceEditorService.setCurrentSelectSource(
             EditorType.AssetTree,
           )
        |> SceneEditorService.clearCurrentSceneTreeNode
    )
    |> StateLogicService.getAndSetEditorState;
    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

let component = ReasonReact.statelessComponent("FileBox");

let render = (store, dispatchFunc, attributeTuple, _self) => {
  let (dragImg, imgSrc, fileId, fileName, flag, isSelected) = attributeTuple;
  let className = "file-item " ++ (isSelected ? "item-active" : "");
  <article
    className
    onClick=(_event => Method.onSelect(fileId, dispatchFunc, _event))>
    <img
      src=imgSrc
      onDragStart=(DragEventBaseUtils.dragStart(fileId, flag, dragImg))
    />
    <span className="item-text"> (DomHelper.textEl(fileName)) </span>
  </article>;
};

let make = (~store, ~dispatchFunc, ~attributeTuple, _children) => {
  ...component,
  render: self => render(store, dispatchFunc, attributeTuple, self),
};