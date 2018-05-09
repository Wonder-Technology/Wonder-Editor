open AssetTreeNodeType;

module Method = {
  let triggerOnBlur = (_event) => WonderLog.Log.print("fck") |> ignore;
  let showFolderInfo = (currentTreeNode) =>
    switch currentTreeNode {
    | None => ReasonReact.nullElement
    | Some(currentTreeNode) =>
      switch (
        StateEditorService.getState()
        |> AssetUtils.getRootTreeNode
        |> AssetUtils.getSpecificTreeNodeById(currentTreeNode)
      ) {
      | Some(treeNode_) =>
        <div className="">
          <span className=""> (DomHelper.textEl("name:")) </span>
          <input
            className="input-component float-input"
            _type="text"
            value=treeNode_.name
            onBlur=triggerOnBlur
          />
        </div>
      | None =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="buildContent",
            ~description={j|the treeNode:$currentTreeNode not exist in assetTree|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j}
          )
        )
      }
    };
};

let component = ReasonReact.statelessComponent("FolderInspector");

let render = (store, dispatch, currentTreeNode, _self) =>
  <article key="folderInspector" className="inspector-component">
    (Method.showFolderInfo(currentTreeNode))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, ~currentTreeNode, _children) => {
  ...component,
  render: (self) => render(store, dispatch, currentTreeNode, self)
};