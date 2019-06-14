type state = {
  name: string,
  useWorker: bool,
  useAssetBundle: bool,
  selectTreeForAssetBundle: SelectTreeType.tree,
};

type action =
  | ChangeName(string)
  | ChangeUseWorker(bool)
  | ChangeUseAssetBundle(bool)
  | UpdateSelectTreeForAssetBundle(SelectTreeType.tree);

module Method = {
  let changeName = event => {
    let inputVal =
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;

    ChangeName(inputVal);
  };

  let changeUseWorker = event => {
    let checked =
      ReactDOMRe.domElementToObj(ReactEventRe.Mouse.target(event))##checked;

    ChangeUseWorker(checked);
  };

  let changeUseAssetBundle = event => {
    let checked =
      ReactDOMRe.domElementToObj(ReactEventRe.Mouse.target(event))##checked;

    ChangeUseAssetBundle(checked);
  };

  let _convertAssetPathToAssetBundlePath = (assetNodeData, assetPath) =>
    Js.String.replace(
      "Assets/",
      "AssetBundles/",
      assetPath
      ++ "/"
      ++ AssetBundleNodeAssetService.getNodeName(assetNodeData)
      ++ "."
      ++ (
        AssetBundleNodeAssetService.getTypeStr(assetNodeData)
        |> Js.String.toLowerCase
      ),
    );

  let buildSelectTreeForAssetBundle = ((editorState, engineState)) =>
    SelectTreeUtils.buildSelectTreeForAssetBundle(
      _convertAssetPathToAssetBundlePath,
      (editorState, engineState),
    );

  let _toggleSelect = (tree, send, isSelect, node) => {
    let tree = SelectTreeUtils.setSelectForSelectTree(tree, isSelect, node);

    send(UpdateSelectTreeForAssetBundle(tree));
  };

  let _renderConfig = (state, send) =>
    <>
      <div className="content-field">
        <div className="field-title"> {DomHelper.textEl("useWorker")} </div>
        <div className="field-content">
          <input
            type_="checkbox"
            defaultChecked={state.useWorker}
            onClick={e => send(changeUseWorker(e))}
          />
        </div>
      </div>
      <div className="content-field">
        <div className="field-title">
          {DomHelper.textEl("useAssetBundle")}
        </div>
        <div className="field-content">
          <input
            type_="checkbox"
            defaultChecked={state.useAssetBundle}
            onClick={e => send(changeUseAssetBundle(e))}
          />
        </div>
      </div>
    </>;

  let renderContent = (state, send) =>
    <div className="modal-item-content">
      <div className="content-field">
        <div className="field-title"> {DomHelper.textEl("name")} </div>
        <div className="field-content">
          <input
            className="input-component"
            type_="text"
            value={state.name}
            onChange={_e => send(changeName(_e))}
          />
        </div>
      </div>
      {_renderConfig(state, send)}
      {
        state.useAssetBundle ?
          <SelectTree
            key={DomHelper.getRandomKey()}
            tree={state.selectTreeForAssetBundle}
            toggleSelectFunc={
              _toggleSelect(state.selectTreeForAssetBundle, send)
            }
            getValueNodeIconFunc={
              (type_, value, editorState) =>
                switch (type_) {
                | "assetBundle" => Some("./public/img/assetBundle.png")
                | _ => None
                }
            }
          /> :
          ReasonReact.null
      }
    </div>;
};

let component = ReasonReact.reducerComponent("PublishLocalModal");

let reducer = (action, state) =>
  switch (action) {
  | ChangeName(value) => ReasonReact.Update({...state, name: value})
  | ChangeUseWorker(value) =>
    ReasonReact.Update({...state, useWorker: value})
  | ChangeUseAssetBundle(value) =>
    ReasonReact.Update({...state, useAssetBundle: value})
  | UpdateSelectTreeForAssetBundle(selectTree) =>
    ReasonReact.Update({...state, selectTreeForAssetBundle: selectTree})
  };

let render =
    (
      title,
      (closeFunc, submitFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-singleInput-modal">
    <div className="modal-item">
      <div className="modal-item-header">
        {DomHelper.textEl(title)}
        <img src="./public/img/close.png" onClick={_e => closeFunc()} />
      </div>
      {Method.renderContent(state, send)}
      <div className="modal-item-footer">
        <button
          className="footer-submit"
          onClick={
            _e =>
              submitFunc(
                state.name,
                state.useWorker,
                (state.useAssetBundle, state.selectTreeForAssetBundle),
              )
          }>
          {DomHelper.textEl("Submit")}
        </button>
      </div>
    </div>
  </article>;

let make =
    (
      ~closeFunc,
      ~title,
      ~submitFunc,
      ~defaultName: string="",
      ~defaultUseWorker: bool=false,
      ~defaultUseAssetBundle: bool=false,
      _children,
    ) => {
  ...component,
  initialState: () => {
    name: defaultName,
    useWorker: defaultUseWorker,
    useAssetBundle: defaultUseAssetBundle,
    selectTreeForAssetBundle:
      Method.buildSelectTreeForAssetBundle
      |> StateLogicService.getStateToGetData,
  },
  reducer,
  render: _self => render(title, (closeFunc, submitFunc), _self),
};