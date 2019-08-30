open TreeAssetType;

open NodeAssetType;

let getNewName = () => "New IMGUISkin";

let isTreeIMGUISkinNodesHasTargetName = (name, tree) =>
  IterateTreeAssetService.find(
    ~tree,
    ~predIMGUISkinNodeFunc=
      node => IMGUISkinNodeAssetService.getNodeName(node) === name,
    (),
  )
  |> Js.Option.isSome;

let rename = (~name, ~nodeData): imguiSkinNodeData => {...nodeData, name};