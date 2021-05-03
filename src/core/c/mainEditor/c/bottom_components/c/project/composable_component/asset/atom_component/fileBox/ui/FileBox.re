open UpdateStore;

module Method = {
  let onSelect = (nodeId, dispatchFunc, _event) => {
    let editorState = StateEditorService.getState();

    editorState
    |> CurrentNodeIdAssetEditorService.setCurrentNodeId(nodeId)
    |> SceneTreeEditorService.clearCurrentSceneTreeNode
    |> CurrentSelectSourceEditorService.setCurrentSelectSource(
         AssetWidgetService.getWidget(),
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
      (dragImg, effectAllowd, imgSrc, nodeId, fileName, widget, isSelected),
      _self,
    ) => {
  let className = "item-text " ++ (isSelected ? "item-active" : "");
  <article
    className="wonder-asset-fileBox "
    onClick=(_event => Method.onSelect(nodeId, dispatchFunc, _event))>
    <div className="box-image">
      <img
        src=imgSrc
        onDragStart=(
          e =>
            DragEventBaseUtils.dragStart(
              nodeId,
              widget,
              (dragImg, effectAllowd),
              e,
            )
        )
      />
    </div>
    <div className> <span> (DomHelper.textEl(fileName)) </span> </div>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~effectAllowd,
      ~dragImg,
      ~imgSrc,
      ~nodeId,
      ~fileName,
      ~widget,
      ~isSelected,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (dragImg, effectAllowd, imgSrc, nodeId, fileName, widget, isSelected),
      self,
    ),
};