type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart
  | DragDrop(int, int);

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let onDoubleClick = (dispatchFunc, nodeId) => {
    let editorState = StateEditorService.getState();

    let editorState =
      switch (
        OperateTreeAssetEditorService.findNodeParentId(
          OperateTreeAssetEditorService.unsafeFindNodeById(
            nodeId,
            editorState,
          ),
          editorState,
        )
      ) {
      | None => editorState
      | Some(parentFolderNodeId) =>
        OperateTreeAssetEditorService.setNodeIsShowChildren(
          parentFolderNodeId,
          true,
          editorState,
        )
      };

    editorState |> StateEditorService.setState |> ignore;

    FolderNodeUtils.enterFolder(dispatchFunc, nodeId);
  };

  let onClick = FileBox.Method.onSelect;
};

let component = ReasonReact.reducerComponent("FolderBox");

let reducer = (onDrop, action, state) =>
  switch (action) {
  | DragStart =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("opacity", "0.2", state.style),
    })

  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("border", "2px solid coral", state.style),
    })

  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "0px", state.style),
    })

  | DragEnd =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("opacity", "1", state.style),
    })

  | DragDrop(targetId, removedId) =>
    ReasonReactUtils.sideEffects(() => onDrop((targetId, removedId)))

  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      (_store, _dispatchFunc),
      (dragImg, effectAllowd, imgSrc, folderId, name, widget, isSelected),
      (isWidget, checkNodeRelation),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let id = {j|folder-$folderId|j};
  let className = "item-text " ++ (isSelected ? "item-active" : "");

  <article className="wonder-asset-folderBox" id style=state.style>
    <div
      className="item-ground"
      draggable=true
      onDragStart=(
        _e =>
          send(
            DragEventUtils.handleDragStart(
              (folderId, DragStart, widget),
              (dragImg, effectAllowd),
              _e,
            ),
          )
      )
      onDragEnd=(_e => send(DragEventUtils.handleDragEnd(DragEnd, _e)))
      onDragEnter=(
        _e =>
          send(
            DragEventUtils.handleDragEnter(
              folderId,
              (DragEnter, Nothing),
              (isWidget, checkNodeRelation),
              _e,
            ),
          )
      )
      onDragLeave=(
        _e => send(DragEventUtils.handleDragLeave(folderId, DragLeave, _e))
      )
      onDragOver=(e => DragEventUtils.handleDragOver("move", e))
      onDrop=(
        _e =>
          send(
            DragEventUtils.handleDrop(
              folderId,
              (
                (targetId, removedId) => DragDrop(targetId, removedId),
                DragLeave,
              ),
              (isWidget, checkNodeRelation),
              _e,
            ),
          )
      )
    />
    <div className="box-image"> <img src=imgSrc /> </div>
    <div className> <span> (DomHelper.textEl(name)) </span> </div>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~dragImg,
      ~effectAllowd,
      ~imgSrc,
      ~folderId,
      ~name,
      ~isSelected,
      ~widget,
      ~debounceTime,
      ~onDrop,
      ~isWidget,
      ~checkNodeRelation,
      _children,
    ) => {
  ...component,
  reducer: reducer(onDrop),
  initialState: () => {style: ReactDOMRe.Style.make(~border="0px", ())},
  didMount: _self => {
    let clickStream =
      WonderBsMost.Most.fromEvent(
        "mousedown",
        DomHelper.getElementById("folder-" ++ string_of_int(folderId))
        |> Obj.magic,
        true,
      );

    clickStream
    |> ClickStreamUtils.bindClickStream(~isSingleClick=false, debounceTime)
    |> WonderBsMost.Most.forEach(_event =>
         Method.onDoubleClick(dispatchFunc, folderId)
       )
    |> ignore;

    clickStream
    |> ClickStreamUtils.bindClickStream(~isSingleClick=true, debounceTime)
    |> WonderBsMost.Most.forEach(event =>
         Method.onClick(folderId, dispatchFunc, event)
       )
    |> ignore;
  },
  render: self =>
    render(
      (uiState, dispatchFunc),
      (dragImg, effectAllowd, imgSrc, folderId, name, widget, isSelected),
      (isWidget, checkNodeRelation),
      self,
    ),
};