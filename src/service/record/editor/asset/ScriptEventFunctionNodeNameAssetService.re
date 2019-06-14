open TreeAssetType;

open NodeAssetType;

let getNewName = () => "New Script EventFunction";

let isTreeScriptEventFunctionNodesHasTargetName = (name, tree) =>
  IterateTreeAssetService.find(
    ~tree,
    ~predScriptEventFunctionNodeFunc=
      node => ScriptEventFunctionNodeAssetService.getNodeName(node) === name,
    (),
  )
  |> Js.Option.isSome;

let rename = (~name, ~nodeData): scriptEventFunctionNodeData => {
  ...nodeData,
  name,
};