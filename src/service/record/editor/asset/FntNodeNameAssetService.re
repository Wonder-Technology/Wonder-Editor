open TreeAssetType;

open NodeAssetType;

let getNewName = () => "New Fnt";

let isTreeFntNodesHasTargetName = (name, tree) =>
  IterateTreeAssetService.find(
    ~tree,
    ~predIMGUISkinNodeFunc=
      node => FntNodeAssetService.getNodeName(node) === name,
    (),
  )
  |> Js.Option.isSome;

let rename = (~name, ~nodeData): fntNodeData => {...nodeData, name};