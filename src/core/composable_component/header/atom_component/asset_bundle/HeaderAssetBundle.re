type state = {
  isShowGenerateSingleRABModal: bool,
  selectTreeForGenerateSingleRAB: option(SelectTreeType.tree),
};

type action =
  | ShowGenerateSingleRABModal
  | HideGenerateSingleRABModal
  | UpdateSelectTreeForGenerateSingleRAB(SelectTreeType.tree);

module Method = {
  let buildAssetBundleComponentSelectNav = (send, languageType) =>
    <div className="item-content item-help">
      <div
        className="content-section"
        onClick={_e => send(ShowGenerateSingleRABModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "generate-single-rab",
                languageType,
              ),
            )
          }
        </span>
      </div>
    </div>;

  let buildSelectTreeForGenerateSingleRAB = editorState =>
    /* TODO need finish */
    FolderNodeSelectTreeService.buildNode(
      ~nodeId=0,
      ~name="folder1",
      ~isSelect=false,
      ~children=[|
        ValueNodeSelectTreeService.buildNode(
          ~nodeId=1,
          ~name="value1",
          ~isSelect=false,
          ~type_="material",
          ~value=HeaderAssetBundleType.converMaterialComponentToValue(0),
        ),
      |],
      (),
    );

  let updateSelectTreeForGenerateSingleRAB = ((send, state), selectTree) =>
    send(
      UpdateSelectTreeForGenerateSingleRAB(selectTree),
      /* ReasonReact.null; */
    );

  let _toggleSelect = (tree, send, checked, node) => {
    open SelectTreeType;

    let rec _toggle = (isSelect, node, tree) =>
      switch (node) {
      | FolderNode(nodeId, nodeData, children) =>
        let tree =
          FolderNodeSelectTreeUILocalService.setNodeData(
            nodeId,
            FolderNodeSelectTreeService.setIsSelect(isSelect, nodeData),
            children,
            tree,
          );

        children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. tree, node) => _toggle(isSelect, node, tree),
             tree,
           );
      | ValueNode(nodeId, nodeData) =>
        ValueNodeSelectTreeUILocalService.setNodeData(
          nodeId,
          ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
          tree,
        )
      };

    let tree =
      switch (node) {
      | FolderNode(_, nodeData, _) => _toggle(checked, node, tree)
      | ValueNode(nodeId, nodeData) =>
        ValueNodeSelectTreeUILocalService.setNodeData(
          nodeId,
          ValueNodeSelectTreeService.setIsSelect(checked, nodeData),
          tree,
        )
      };

    send(UpdateSelectTreeForGenerateSingleRAB(tree));
  };

  let buildGenerateSingleRABUI = (send, selectTreeForGenerateSingleRAB) =>
    <SelectTree
      key={DomHelper.getRandomKey()}
      tree=selectTreeForGenerateSingleRAB
      toggleSelectFunc={_toggleSelect(selectTreeForGenerateSingleRAB, send)}
      getValueNodeIconFunc={
        type_ =>
          /* TODO handle more type_ */
          switch (type_) {
          | "material" => Some("./public/img/mat.png")
          | _ => None
          }
      }
    />;

  let generateAndDownloadSingleRAB = selectTreeForGenerateSingleRAB => {
    LogUtils.printJson(( "download single rab", selectTreeForGenerateSingleRAB )) |> ignore;

    /* TODO generate and download */

    ();
  };

  let hideGenerateSingleRABModal = send => send(HideGenerateSingleRABModal);
};

let component = ReasonReact.reducerComponent("HeaderAssetBundle");

let reducer = (action, state) =>
  switch (action) {
  | ShowGenerateSingleRABModal =>
    ReasonReact.Update({...state, isShowGenerateSingleRABModal: true})

  | HideGenerateSingleRABModal =>
    ReasonReact.Update({
      ...state,
      isShowGenerateSingleRABModal: false,
      selectTreeForGenerateSingleRAB: None,
    })
  | UpdateSelectTreeForGenerateSingleRAB(selectTree) =>
    ReasonReact.Update({
      ...state,
      selectTreeForGenerateSingleRAB: Some(selectTree),
    })
  };

let render =
    (
      _,
      (isAssetBundleNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  Js.log("render") |> ignore;

  let className = isAssetBundleNav ? "item-title item-active" : "item-title";
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <div className="header-item">
    <div className="component-item">
      <span
        className
        onClick={e => toggleShowNavFunc()}
        onMouseOver={e => hoverNavFunc()}>
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "header-asset-bundle",
              languageType,
            ),
          )
        }
      </span>
    </div>
    {
      isAssetBundleNav ?
        Method.buildAssetBundleComponentSelectNav(send, languageType) :
        ReasonReact.null
    }
    {
      state.isShowGenerateSingleRABModal ?
        switch (state.selectTreeForGenerateSingleRAB) {
        | None => ReasonReact.null
        | Some(selectTreeForGenerateSingleRAB) =>
          <Modal
            title={
              LanguageUtils.getHeaderLanguageDataByType(
                "generate-single-rab",
                languageType,
              )
            }
            closeFunc=(
              () => {
                Method.generateAndDownloadSingleRAB(
                  selectTreeForGenerateSingleRAB,
                );

                Method.hideGenerateSingleRABModal(send);
              }
            )
            content=[|
              Method.buildGenerateSingleRABUI(
                send,
                selectTreeForGenerateSingleRAB,
              ),
            |]
          />
        } :
        ReasonReact.null
    }
  </div>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~isAssetBundleNav,
      ~toggleShowNavFunc,
      ~hoverNavFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowGenerateSingleRABModal: false,
    selectTreeForGenerateSingleRAB: None,
  },
  reducer,
  didUpdate: ({oldSelf, newSelf}) => {
    Js.log("didUpdate") |> ignore;

    let state = oldSelf.state;
    let send = oldSelf.send;

    state.isShowGenerateSingleRABModal
    && Js.Option.isNone(state.selectTreeForGenerateSingleRAB) ?
      Method.buildSelectTreeForGenerateSingleRAB
      |> StateLogicService.getEditorState
      |> Method.updateSelectTreeForGenerateSingleRAB((send, state)) :
      ();
  },
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isAssetBundleNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};