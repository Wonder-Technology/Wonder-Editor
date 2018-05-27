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

let render = (store, dispatch, imgSrc, fileId, fileName, sign, isSelected, _self) => {
  let className = "file-item " ++ (isSelected ? "item-active" : "");
  <article className onClick=((_event) => Method.onSelect(dispatch, fileId, _event))>
    <img src=imgSrc onDragStart=(EventUtils.dragStart(fileId, sign)) />
    <span className="item-text"> (DomHelper.textEl(fileName)) </span>
  </article>
};

let make = (~store, ~dispatch, ~imgSrc, ~fileId, ~fileName, ~sign, ~isSelected, _children) => {
  ...component,
  render: (self) => render(store, dispatch, imgSrc, fileId, fileName, sign, isSelected, self)
};