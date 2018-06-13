module Method = {
  let onSelect = (fileId, dispatchFunc, _event) => {
    (
      editorState =>
        editorState
        |> CurrentNodeEditorService.clearCurrentNode
        |> AssetCurrentNodeIdEditorService.setCurrentNodeId(fileId)
        |> CurrentSelectSourceEditorService.setCurrentSelectSource(
             EditorType.AssetTree,
           )
    )
    |> StateLogicService.getAndSetEditorState;
    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

let component = ReasonReact.statelessComponent("FileBox");

let render = ((_store, dispatchFunc), attributeTuple, _self) => {
  let (dragImg, imgSrc, fileId, fileName, flag, isSelected) = attributeTuple;
  let className = "wonder-asset-fileBox " ++ (isSelected ? "item-active" : "");
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
  render: self => render((store, dispatchFunc), attributeTuple, self),
};