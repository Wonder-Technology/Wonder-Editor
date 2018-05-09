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
    EventUtils.dragStart(uid, sign, event);
    DragStart
  };
  let handleDragEnter = (handleSign, _event) =>
    handleSign(StateEditorService.getState() |> CurrentSignEditorService.getCurrentSign) ?
      DragEnter : Nothing;
  let handleDragLeave = (handleSign, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.stopPropagation(e);
    handleSign(StateEditorService.getState() |> CurrentSignEditorService.getCurrentSign) ?
      DragLeave : Nothing
  };
  let handleDragOver = (event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    DomHelper.preventDefault(e)
  };
  let handleDrop = (uid, onDrop, event) => {
    let e = ReactEvent.convertReactMouseEventToJsEvent(event);
    onDrop((
      uid,
      DragUtils.getdragedUid(e),
      StateEditorService.getState() |> CurrentSignEditorService.getCurrentSign
    ))
  };
  let handleDrageEnd = (_event) => {
    CurrentSignEditorService.clearCurrentSign |> StateLogicService.getAndSetEditorState;
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
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("opacity", "1", state.style)
        |> ReactUtils.addStyleProp("border", "1px solid red")
    })
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
  let (onSelect, onDrop, handleSign) = eventHandleTuple;
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
      onDragEnd=(reduce(Method.handleDrageEnd))>
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
      onDragEnter=(reduce(Method.handleDragEnter(handleSign)))
      onDragLeave=(reduce(Method.handleDragLeave(handleSign)))
      onDragOver=Method.handleDragOver
      onDrop=(Method.handleDrop(uid, onDrop))
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
      {style: ReactDOMRe.Style.make(~border="1px solid red", ())}
  },
  reducer,
  render: (self) =>
    render(attributeTuple, eventHandleTuple, sign, icon, dragable, treeChildren, self)
};