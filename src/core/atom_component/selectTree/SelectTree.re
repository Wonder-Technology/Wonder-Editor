open SelectTreeType;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let _hasChildren = node =>
    FolderNodeSelectTreeService.isFolderNode(node) ?
      FolderNodeSelectTreeService.getChildren(node) |> Js.Array.length > 0 :
      false;

  let _isSelected = node =>
    switch (node) {
    | FolderNode(_, nodeData, _) => nodeData.isSelect
    | ValueNode(_, nodeData) => nodeData.isSelect
    };

  let _toggleSelect = (event, node, (uiState, dispatchFunc)) => {
    let checked =
      ReactDOMRe.domElementToObj(ReactEventRe.Mouse.target(event))##checked;

    let rec _toggle = (isSelect, node, uiState) =>
      switch (node) {
      | FolderNode(nodeId, nodeData, children) =>
        let uiState =
          FolderNodeSelectTreeUIService.setNodeData(
            nodeId,
            FolderNodeSelectTreeService.setIsSelect(isSelect, nodeData),
            children,
            uiState,
          );

        children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. uiState, node) => _toggle(isSelect, node, uiState),
             uiState,
           );
      | ValueNode(nodeId, nodeData) =>
        ValueNodeSelectTreeUIService.setNodeData(
          nodeId,
          ValueNodeSelectTreeService.setIsSelect(isSelect, nodeData),
          uiState,
        )
      };

    let uiState =
      switch (node) {
      | FolderNode(_, nodeData, _) => _toggle(checked, node, uiState)
      | ValueNode(nodeId, nodeData) =>
        ValueNodeSelectTreeUIService.setNodeData(
          nodeId,
          ValueNodeSelectTreeService.setIsSelect(checked, nodeData),
          uiState,
        )
      };

    dispatchFunc(AppStore.ReplaceState(uiState));
  };

  let _getIcon = (node, getValueNodeIconFunc) =>
    switch (node) {
    | FolderNode(_, _, _) => Some("./public/img/package.png")
    | ValueNode(_, nodeData) => getValueNodeIconFunc(nodeData.type_)
    };

  let _getNodeName = node =>
    switch (node) {
    | FolderNode(_, nodeData, _) => nodeData.name
    | ValueNode(_, nodeData) => nodeData.name
    };

  let rec _build = (allNodes, getValueNodeIconFunc, (uiState, dispatchFunc)) =>
    allNodes
    /* |> _sortByName */
    |> Js.Array.map(node =>
         <ul className="wonder-tree-node">
           <li>
             {
               _hasChildren(node) ?
                 <div className="item-triangle">
                   <img src="./public/img/down.png" />
                 </div> :
                 <div className="item-triangle" />
             }
             <div className="select-box">
               <input
                 type_="checkbox"
                 defaultChecked={_isSelected(node)}
                 onClick={
                   e => _toggleSelect(e, node, (uiState, dispatchFunc))
                 }
               />
             </div>
             {
               switch (_getIcon(node, getValueNodeIconFunc)) {
               | None => ReasonReact.null
               | Some(icon) => <img src=icon className="treeNode-icon" />
               }
             }
             <span> {DomHelper.textEl(_getNodeName(node))} </span>
           </li>
           {
             ReasonReact.array(
               _build(
                 _hasChildren(node) ?
                   FolderNodeSelectTreeService.getChildren(node) : [||],
                 getValueNodeIconFunc,
                 (uiState, dispatchFunc),
               ),
             )
           }
         </ul>
       );

  let buildTreeArray = (getValueNodeIconFunc, (uiState, dispatchFunc)) =>
    _build(
      [|RootSelectTreeUIService.getRootNode(uiState)|],
      getValueNodeIconFunc,
      (uiState, dispatchFunc),
    );
};

let component = ReasonReact.statelessComponentWithRetainedProps("SelectTree");

let render = (getValueNodeIconFunc, (uiState, dispatchFunc), _self) => {
  let editorState = StateEditorService.getState();

  <article key="selectTreeRoot" className="wonder-selectTree">
    {
      ReasonReact.array(
        Method.buildTreeArray(getValueNodeIconFunc, (uiState, dispatchFunc)),
      )
    }
  </article>;
};

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.SelectTree);

let make = (~uiState, ~dispatchFunc, ~getValueNodeIconFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(uiState),
  },
  shouldUpdate,
  render: self =>
    render(getValueNodeIconFunc, (uiState, dispatchFunc), self),
};