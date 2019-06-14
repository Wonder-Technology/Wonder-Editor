open TreeAssetType;

open NodeAssetType;

let getNewAttributeName = () => "New Script Attribute";

let getNewFieldName = () => "New Script Attribute Field";

let isTreeScriptAttributeNodesHasTargetName = (name, tree) =>
  IterateTreeAssetService.find(
    ~tree,
    ~predScriptAttributeNodeFunc=
      node => ScriptAttributeNodeAssetService.getNodeName(node) === name,
    (),
  )
  |> Js.Option.isSome;

let rename = (~name, ~nodeData): scriptAttributeNodeData => {
  ...nodeData,
  name,
};