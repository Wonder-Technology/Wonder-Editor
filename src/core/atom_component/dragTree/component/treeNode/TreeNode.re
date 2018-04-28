Css.importCss("./css/treeNode.css");

type state = {style: ReactDOMRe.Style.t};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | DragEnd
  | DragStart;

module Method = {
  let handleDragStart = (uid, sign, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    DragUtils.setDataTransferEffectIsMove(e);
    DragUtils.setdragedUid(uid, e);
    CurrentTreeEditorService.setCurrentTree(sign) |> StateLogicService.getAndSetEditorState;
    DragStart
  };
  let handleDragEnter = (sign, _event) =>
    StateEditorService.getState() |> CurrentTreeEditorService.getCurrenttree == sign ?
      DragEnter : Nothing;
  let handleDragLeave = (sign, _event) =>
    StateEditorService.getState() |> CurrentTreeEditorService.getCurrenttree == sign ?
      DragLeave : Nothing;
  let handleDragOver = (event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e)
  };
  let handleDrop = (uid, sign, onDrop, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    CurrentTreeEditorService.clearCurrentTree |> StateLogicService.getAndSetEditorState;
    onDrop((uid, DragUtils.getdragedUid(e)))
  };
  let handleDrageEnd = (sign, _event) => {
    CurrentTreeEditorService.clearCurrentTree |> StateLogicService.getAndSetEditorState;
    WonderLog.Log.print("end") |> ignore;
    DragEnd
  };
};

let component = ReasonReact.reducerComponent("TreeNode");

let reducer = (action, state) =>
  switch action {
  | DragStart =>
    ReasonReact.Update({...state, style: ReactUtils.addStyleProp("opacity", "0.2", state.style)})
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "2px dashed blue", state.style)
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style: ReactUtils.addStyleProp("border", "1px solid red", state.style)
    })
  | DragEnd =>
    ReasonReact.Update({...state, style: ReactUtils.addStyleProp("opacity", "1", state.style)})
  | Nothing => ReasonReact.NoUpdate
  };

let render =
    (
      attributeTuple,
      eventHandleTuple,
      sign,
      icon,
      dragable,
      treeChildren,
      {state, reduce}: ReasonReact.self('a, 'b, 'c)
    ) => {
  let (uid, name, _isSelected) = attributeTuple;
  let (onSelect, onDrop) = eventHandleTuple;
  let _buildNotDragableUl = (content) =>
    <ul className="wonder-tree-node">
      content
      (
        switch treeChildren {
        | None => ReasonReact.nullElement
        | Some(trees) => ReasonReact.arrayToElement(trees)
        }
      )
    </ul>;
  let _buildDragableUl = (content) =>
    <ul
      className="wonder-tree-node"
      draggable=Js.true_
      onDragStart=(reduce(Method.handleDragStart(uid, sign)))
      onDragEnd=(reduce(Method.handleDrageEnd(sign)))>
      content
      (
        switch treeChildren {
        | None => ReasonReact.nullElement
        | Some(trees) => ReasonReact.arrayToElement(trees)
        }
      )
    </ul>;
  let _getContent = () =>
    <li
      style=state.style
      onDragEnter=(reduce(Method.handleDragEnter(sign)))
      onDragLeave=(reduce(Method.handleDragLeave(sign)))
      onDragOver=Method.handleDragOver
      onDrop=(Method.handleDrop(uid, sign, onDrop))
      onClick=((_event) => onSelect(uid))>
      (
        switch icon {
        | None => ReasonReact.nullElement
        | Some(icon) => <img src=icon />
        }
      )
      (DomHelper.textEl(name))
    </li>;
  switch dragable {
  | None => _buildDragableUl(_getContent())
  | Some(dragable) =>
    dragable ? _buildDragableUl(_getContent()) : _buildNotDragableUl(_getContent())
  }
};

let make =
    (
      ~attributeTuple,
      ~eventHandleTuple,
      ~sign: string,
      ~icon: option(string)=?,
      ~dragable: option(bool)=?,
      ~treeChildren: option(array(ReasonReact.reactElement))=?,
      _children
    ) => {
  ...component,
  initialState: () => {
    let (_uid, _name, isSelected) = attributeTuple;
    isSelected ?
      {style: ReactDOMRe.Style.make(~background="red", ())} :
      {style: ReactDOMRe.Style.make(~opacity="1", ())}
  },
  reducer,
  render: (self) =>
    render(attributeTuple, eventHandleTuple, sign, icon, dragable, treeChildren, self)
};