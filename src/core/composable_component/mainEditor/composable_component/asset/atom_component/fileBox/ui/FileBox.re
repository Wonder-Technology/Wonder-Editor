module Method = {
  let onSelect = (dispatch, fileId, _event) => {
    (
      (editorState) =>
        editorState
        |> AssetCurrentNodeIdEditorService.setCurrentNodeId(fileId)
        |> CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.AssetTree)
        |> SceneEditorService.clearCurrentSceneTreeNode
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
};

let component = ReasonReact.statelessComponent("FileBox");

let render = (store, dispatch, attributeTuple, _self) => {
  let (dragImg, imgSrc, fileId, fileName, sign, isSelected) = attributeTuple;
  let className = "file-item " ++ (isSelected ? "item-active" : "");
  <article className onClick=((_event) => Method.onSelect(dispatch, fileId, _event))>
    <img src=imgSrc onDragStart=(EventUtils.dragStart(fileId, sign, dragImg)) />
    <span className="item-text"> (DomHelper.textEl(fileName)) </span>
  </article>
};

let make = (~store, ~dispatch, ~attributeTuple, _children) => {
  ...component,
  render: (self) => render(store, dispatch, attributeTuple, self)
};