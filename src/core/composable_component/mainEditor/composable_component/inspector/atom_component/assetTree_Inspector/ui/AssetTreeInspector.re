open AssetTreeNodeType;

open FileType;

open AssetNodeType;

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: string,
  originalName: string,
  postfix: string
};

type action =
  | Blur
  | Change(string);

let setInputNodeRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

module Method = {
  let change = (event) => {
    let inputVal = ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
    Change(inputVal)
  };
  let blur = (_event) => Blur;
  let triggerBlur = (dispatchFunc, value, nodeId) => {
    let editorState = StateEditorService.getState();
    editorState
    |> AssetNodeMapEditorService.setResult(
         nodeId,
         editorState
         |> AssetNodeMapEditorService.unsafeGetNodeMap
         |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
         |> AssetTreeNodeUtils.renameNodeResult(value)
       )
    |> StateEditorService.setState;
    dispatchFunc(AppStore.ReLoad)
  };
  let showFolderInfo = (nodeResult, nodeId, {state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>
    switch nodeResult.type_ {
    | Folder =>
      <div className="">
        <h1> (DomHelper.textEl("Folder")) </h1>
        <hr />
        <span className=""> (DomHelper.textEl("name:")) </span>
        <input
          ref=(handle(setInputNodeRef))
          className="input-component float-input"
          _type="text"
          value=state.inputValue
          disabled=(
            AssetUtils.isIdEqual(
              AssetTreeRootEditorService.getRootTreeNodeId |> StateLogicService.getEditorState,
              nodeId
            ) ?
              Js.true_ : Js.false_
          )
          onChange=(reduce(change))
          onBlur=(reduce(blur))
        />
      </div>
    | Image =>
      <div className="">
        <h1> (DomHelper.textEl("Image")) </h1>
        <hr />
        <span className=""> (DomHelper.textEl("name:")) </span>
        <input
          ref=(handle(setInputNodeRef))
          className="input-component float-input"
          _type="text"
          value=state.inputValue
          onChange=(reduce(change))
          onBlur=(reduce(blur))
        />
      </div>
    | Json =>
      <div>
        <h1> (DomHelper.textEl("Json")) </h1>
        <hr />
        <span className=""> (DomHelper.textEl("name:")) </span>
        <input
          ref=(handle(setInputNodeRef))
          className="input-component float-input"
          _type="text"
          value=state.inputValue
          onChange=(reduce(change))
          onBlur=(reduce(blur))
        />
        <p> (DomHelper.textEl(nodeResult.result |> OptionService.unsafeGet)) </p>
      </div>
    };
};

let component = ReasonReact.reducerComponent("AssetTreeInspector");

let reducer = (dispatchFunc, nodeId, action, state) =>
  switch action {
  | Change(value) => ReasonReact.Update({...state, inputValue: value})
  | Blur =>
    switch state.inputValue {
    | "" => ReasonReact.Update({...state, inputValue: state.originalName})
    | value =>
      ReasonReact.UpdateWithSideEffects(
        {...state, originalName: value},
        ((_self) => Method.triggerBlur(dispatchFunc, value ++ state.postfix, nodeId))
      )
    }
  };

let render = (nodeResult, nodeId, self) =>
  <article key="AssetTreeInspector" className="inspector-component">
    (Method.showFolderInfo(nodeResult, nodeId, self))
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, ~nodeId, ~nodeResult, _children) => {
  ...component,
  initialState: () => {
    let (fileName, postfix) = AssetFileInspectorUtils.handleFileName(nodeResult.name);
    {inputValue: fileName, inputField: ref(None), originalName: fileName, postfix}
  },
  reducer: reducer(dispatchFunc, nodeId),
  render: (self) => render(nodeResult, nodeId, self)
};