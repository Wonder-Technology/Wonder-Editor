open DragEventUtils;

type state = {style: ReactDOMRe.Style.t};

module Method = {
  let onDoubleClick = (dispatchFunc, nodeType, nodeId) => {
    let editorState = StateEditorService.getState();

    let editorState =
      switch (
        FolderNodeMapAssetEditorService.getFolderParentId(
          nodeId,
          FolderNodeMapAssetEditorService.getFolderNodeMap(editorState),
        )
      ) {
      | None => editorState
      | Some(parentFolderNodeId) =>
        AssetTreeUtils.setSpecificAssetTreeNodeIsShowChildrenFromEditorState(
          parentFolderNodeId,
          true,
          editorState,
        )
      };

    editorState |> StateEditorService.setState |> ignore;

    AssetTreeUtils.enterFolder(dispatchFunc, nodeType, nodeId);
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
      (isWidget, handleRelationError),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let id = "folder-" ++ string_of_int(folderId);
  let className = "item-text " ++ (isSelected ? "item-active" : "");

  <article className="wonder-asset-folderBox" id style=state.style>
    <div
      className="item-ground"
      draggable=true
      onDragStart=(
        _e =>
          send(
            DragEventUtils.handleDragStart(
              folderId,
              widget,
              dragImg,
              effectAllowd,
              _e,
            ),
          )
      )
      onDragEnd=(_e => send(DragEventUtils.handleDrageEnd(_e)))
      onDragEnter=(
        _e =>
          send(
            DragEventUtils.handleDragEnter(
              folderId,
              isWidget,
              handleRelationError,
              _e,
            ),
          )
      )
      onDragLeave=(
        _e =>
          send(
            DragEventUtils.handleDragLeave(
              folderId,
              isWidget,
              handleRelationError,
              _e,
            ),
          )
      )
      onDragOver=(e => DragEventUtils.handleDragOver("move", e))
      onDrop=(
        _e =>
          send(
            DragEventUtils.handleDrop(
              folderId,
              isWidget,
              handleRelationError,
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
      ~store,
      ~dispatchFunc,
      ~dragImg,
      ~effectAllowd,
      ~imgSrc,
      ~folderId,
      ~fileType,
      ~name,
      ~isSelected,
      ~widget,
      ~debounceTime,
      ~onDrop,
      ~isWidget,
      ~handleRelationError,
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
         Method.onDoubleClick(dispatchFunc, fileType, folderId)
       )
    |> ignore;

    clickStream
    |> ClickStreamUtils.bindClickStream(~isSingleClick=true, debounceTime)
    |> WonderBsMost.Most.forEach(event =>
         Method.onClick(folderId, fileType, dispatchFunc, event)
       )
    |> ignore;
  },
  render: self =>
    render(
      (store, dispatchFunc),
      (dragImg, effectAllowd, imgSrc, folderId, name, widget, isSelected),
      (isWidget, handleRelationError),
      self,
    ),
};