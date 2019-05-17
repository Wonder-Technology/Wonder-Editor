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

  let _unsafeGetSelectTreeNodeIdFromFolderTreeMap =
      (assetTreeNode, folderTreeMap) =>
    folderTreeMap
    |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(
         NodeAssetService.getNodeId(~node=assetTreeNode),
       );

  let _setToFolderTreeMap = (assetTreeNode, selectTreeNode, folderTreeMap) =>
    folderTreeMap
    |> WonderCommonlib.ImmutableSparseMapService.set(
         NodeAssetService.getNodeId(~node=assetTreeNode),
         NodeSelectTreeService.getNodeId(selectTreeNode),
       );

  let _handleFoldAssetNode =
      (
        parentFolderNode,
        (currentSelectTreeNodeId, folderTreeMap, selectTree),
        (assetNode, type_, value),
        engineState,
      ) => {
    let newNodeId =
      IdSelectTreeService.generateNodeId(currentSelectTreeNodeId);

    let selectTree =
      selectTree
      |> OperateTreeSelectTreeService.insertNode(
           _unsafeGetSelectTreeNodeIdFromFolderTreeMap(
             parentFolderNode,
             folderTreeMap,
           ),
           ValueNodeSelectTreeService.buildNode(
             ~nodeId=newNodeId,
             ~name=
               NodeNameAssetLogicService.getNodeName(assetNode, engineState),
             ~isSelect=false,
             ~type_,
             ~value,
           ),
         );

    (newNodeId, folderTreeMap, selectTree);
  };

  /* let _convertAssetPathToAssetBundlePath = (assetNodeData, assetPath) =>
     Js.String.replace(
       "Assets/",
       "",
       assetPath
       ++ "/"
       ++ AssetBundleNodeAssetService.getNodeName(assetNodeData)
       ++ "."
       ++ (
         AssetBundleNodeAssetService.getTypeStr(assetNodeData)
         |> Js.String.toLowerCase
       ),
     ); */

  /* TODO extract */
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

  let _handleFoldFolderAssetNode =
      (
        parentFolderNode,
        (currentSelectTreeNodeId, folderTreeMap, selectTree),
        nodeId,
        nodeData,
        children,
      ) => {
    let newNodeId =
      IdSelectTreeService.generateNodeId(currentSelectTreeNodeId);

    let newSelectTreeFolderNode =
      FolderNodeSelectTreeService.buildNode(
        ~nodeId=newNodeId,
        ~name=FolderNodeAssetService.getNodeName(nodeData),
        ~isSelect=false,
        ~children=[||],
        (),
      );

    let selectTree =
      selectTree
      |> OperateTreeSelectTreeService.insertNode(
           _unsafeGetSelectTreeNodeIdFromFolderTreeMap(
             parentFolderNode,
             folderTreeMap,
           ),
           newSelectTreeFolderNode,
         );

    (
      newNodeId,
      folderTreeMap
      |> _setToFolderTreeMap(
           FolderNodeAssetService.buildNodeByNodeData(
             ~nodeId,
             ~nodeData,
             ~children,
           ),
           newSelectTreeFolderNode,
         ),
      selectTree,
    );
  };

  let _buildInitAccData = editorState => {
    let initNodeId = 0;
    let rootNode =
      FolderNodeSelectTreeService.buildNode(
        ~nodeId=initNodeId,
        ~name=RootTreeAssetService.getAssetTreeRootName(),
        ~isSelect=false,
        ~children=[||],
        (),
      );
    let selectTree = rootNode;

    (
      initNodeId,
      _setToFolderTreeMap(
        RootTreeAssetEditorService.getRootNode(editorState),
        rootNode,
        WonderCommonlib.ImmutableSparseMapService.createEmpty(),
      ),
      selectTree,
    );
  };

  let buildSelectTreeForAssetBundle = ((editorState, engineState)) => {
    let (_, _, selectTree) =
      IterateTreeAssetService.foldWithParentFolderNodeWithoutRootNode(
        ~acc=_buildInitAccData(editorState),
        ~tree=TreeAssetEditorService.unsafeGetTree(editorState),
        ~folderNodeFunc=_handleFoldFolderAssetNode,
        ~textureNodeFunc=(parentFolderNode, acc, nodeId, nodeData) => acc,
        ~assetBundleNodeFunc=
          (
            parentFolderNode,
            (currentSelectTreeNodeId, folderTreeMap, selectTree),
            nodeId,
            nodeData,
          ) => {
            /* TODO feat: exclude wab?  */
            let assetNode =
              AssetBundleNodeAssetService.buildNodeByNodeData(
                ~nodeId,
                ~nodeData,
              );

            let assetNodeData =
              assetNode |> AssetBundleNodeAssetService.getNodeData;

            _handleFoldAssetNode(
              parentFolderNode,
              (currentSelectTreeNodeId, folderTreeMap, selectTree),
              (
                assetNode,
                "assetBundle",
                (
                  {
                    assetBundle:
                      AssetBundleNodeAssetService.getAssetBundle(assetNode),
                    path:
                      _convertAssetPathToAssetBundlePath(
                        assetNodeData,
                        PathTreeAssetLogicService.getNodePath(
                          assetNode,
                          (editorState, engineState),
                        ),
                      ),
                    type_: AssetBundleNodeAssetService.getType(assetNode),
                  }: HeaderAssetBundleType.assetBundleData
                )
                |> HeaderAssetBundleType.convertAssetBundleDataToValue,
              ),
              engineState,
            );
          },
        ~materialNodeFunc=(parentFolderNode, acc, nodeId, nodeData) => acc,
        ~scriptEventFunctionNodeFunc=
          (parentFolderNode, acc, nodeId, nodeData) => acc,
        ~scriptAttributeNodeFunc=
          (parentFolderNode, acc, nodeId, nodeData) => acc,
        ~wdbNodeFunc=(parentFolderNode, acc, nodeId, nodeData) => acc,
        (),
      );

    selectTree;
  };

  let _toggleSelect = (tree, send, isSelect, node) => {
    let tree =
      /* TODO move out from HeaderAssetBundleUtils? */
      HeaderAssetBundleUtils.GenerateAB.setSelectForSelectTree(
        tree,
        isSelect,
        node,
      );

    send(UpdateSelectTreeForAssetBundle(tree));
  };

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