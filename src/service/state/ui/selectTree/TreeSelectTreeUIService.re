open AppStore;

let getTree = ({selectTreeState}) => selectTreeState.tree;

let unsafeGetTree = uiState => uiState |> getTree |> OptionService.unsafeGet;

let setTree = (tree, {selectTreeState} as uiState) => {
  ...uiState,
  selectTreeState: {
    ...selectTreeState,
    tree: Some(tree),
  },
};