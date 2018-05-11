open AssetTreeNodeType;

type state = {
  inputField: ref(option(Dom.element)),
  inputValue: string
};

type action =
  | Blur
  | Change(string);

let setInputFolderdRef = (value, {ReasonReact.state}) => state.inputField := Js.Null.to_opt(value);

module Method = {
  let change = (event) => {
    let inputVal = ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;
    Change(inputVal)
  };
  let blur = (_event) => Blur;
  let triggerBlur = (dispatch, value, folderId) => {
    WonderLog.Log.print(("blur", folderId)) |> ignore;
    AssetEditorService.setAsseTree(
      StateEditorService.getState()
      |> AssetEditorService.unsafeGetAssetTree
      |> AssetUtils.renameSpecificTreeNode(folderId, value)
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad)
  };
  let showFolderInfo = ({state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>
    <div className="">
      <h1> (DomHelper.textEl("Folder")) </h1>
      <hr />
      <span className=""> (DomHelper.textEl("name:")) </span>
      <input
        ref=(handle(setInputFolderdRef))
        className="input-component float-input"
        _type="text"
        value=state.inputValue
        onChange=(reduce(change))
        onBlur=(reduce(blur))
      />
    </div>;
};

let component = ReasonReact.reducerComponent("AssetTreeInspector");

let reducer = (dispatch, folderId, action, state) =>
  switch action {
  | Change(value) => ReasonReact.Update({...state, inputValue: value})
  | Blur =>
    Method.triggerBlur(dispatch, state.inputValue, folderId);
    ReasonReact.NoUpdate
  };

let render = (self) =>
  <article key="AssetTreeInspector" className="inspector-component">
    (Method.showFolderInfo(self))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, ~folderId, ~treeNode, _children) => {
  ...component,
  initialState: () => {inputValue: treeNode.name, inputField: ref(None)},
  reducer: reducer(dispatch, folderId),
  render: (self) => render(self)
};