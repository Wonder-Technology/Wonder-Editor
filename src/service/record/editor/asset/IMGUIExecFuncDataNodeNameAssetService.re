open TreeAssetType;

open NodeAssetType;

let getNewName = () => "New IMGUIExecFuncData";

let isTreeIMGUIExecFuncDataNodesHasTargetName = (name, tree) =>
  IterateTreeAssetService.find(
    ~tree,
    ~predIMGUIExecFuncDataNodeFunc=
      node => IMGUIExecFuncDataNodeAssetService.getNodeName(node) === name,
    (),
  )
  |> Js.Option.isSome;

let rename = (~name, ~nodeData): imguiExecFuncDataNodeData => {
  ...nodeData,
  name,
  execFuncData: {
    ...nodeData.execFuncData,
    name,
  },
};