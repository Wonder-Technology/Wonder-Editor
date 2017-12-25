Css.importCss("./css/treeNode.css");

external toDomObj : ReactEventRe.Mouse.t => Js.t({..}) = "%identity";

type state = {currentStyle: ReactDOMRe.Style.t};

type action =
  | DragEnter
  | DragLeave
  | Drop
  | DragEnd
  | DragStart;

module Method = {
  let handleClick = (onSelect, uid, event) => onSelect(uid);
  let handleDragStart = (uid, event) => {
    let e = toDomObj(event);
    e##dataTransfer##effectAllowed#="move";
    e##dataTransfer##setData("dragedId", uid);
    DragStart
  };
  let handleDragEnter = (_event) => DragEnter;
  let handleDragLeave = (_event) => DragLeave;
  let handleDragOver = (event) => {
    let e = toDomObj(event);
    e##preventDefault()
  };
  let handleDragEnd = (_event) => DragEnd;
  let handleDrop = (event) => {
    let e = toDomObj(event);
    let uid = e##dataTransfer##getData("dragedId");
    Js.log(uid);
    Drop
  };
};

let component = ReasonReact.reducerComponent("TreeNode");

let make =
    (
      ~uid: int,
      ~name: string,
      ~onSelect: int => unit,
      ~onDropFinish: (int, int) => unit,
      ~dragEnd: unit => unit,
      ~treeChildren: option(array(ReasonReact.reactElement))=?,
      _children
    ) => {
  ...component,
  initialState: () => {currentStyle: ReactDOMRe.Style.make(~opacity="1", ())},
  reducer: (action, state) =>
    switch action {
    | DragStart =>
      Js.log({j|$uid start|j});
      let style = ReactUtils.styleAddProp("opacity", "0.2", state.currentStyle);
      ReasonReact.Update({...state, currentStyle: style})
    | DragEnter =>
      Js.log({j|$uid enter|j});
      let style = ReactUtils.styleAddProp("border", "2px dashed blue", state.currentStyle);
      ReasonReact.Update({...state, currentStyle: style})
    | DragLeave =>
      Js.log({j|$uid leave|j});
      ReasonReact.Update({
        ...state,
        currentStyle: ReactDOMRe.Style.unsafeAddProp(state.currentStyle, "border", "0")
      })
      
    | DragEnd =>
      Js.log({j|$uid end|j});
      ReasonReact.UpdateWithSideEffects(
        {
          ...state,
          currentStyle: ReactDOMRe.Style.unsafeAddProp(state.currentStyle, "opacity", "1")
        },
        ((_self) => dragEnd())
      )
    | Drop =>
      Js.log({j|$uid drop|j});
      ReasonReact.UpdateWithSideEffects(
        {
          ...state,
          currentStyle: ReactDOMRe.Style.unsafeAddProp(state.currentStyle, "border", "6px")
        },
        ((_self) => onDropFinish(1, 2))
      )
    },
  render: ({state, reduce}) =>
    <ul
      style=state.currentStyle
      className="wonder-tree-node"
      draggable=(Js.Boolean.to_js_boolean(true))
      onDragStart=(reduce(Method.handleDragStart(uid)))
      onDragEnter=(reduce(Method.handleDragEnter))
      onDragLeave=(reduce(Method.handleDragLeave))
      onDragEnd=(reduce(Method.handleDragEnd))
      onDragOver=(reduce(Method.handleDragOver))
      onDrop=(reduce(Method.handleDrop))>
      <li onClick=((e) => Method.handleClick(onSelect, uid, e))> (DomHelper.textEl(name)) </li>
      (
        switch treeChildren {
        | None => ReasonReact.nullElement
        | Some(trees) =>
          /* <div className="tree-child" draggable=(Js.Boolean.to_js_boolean(true))> */
          ReasonReact.arrayToElement(trees)
        /* </div> */
        }
      )
    </ul>
};