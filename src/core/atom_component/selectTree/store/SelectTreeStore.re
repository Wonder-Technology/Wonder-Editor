open SelectTreeType;

/* type selectTreeAction('a) =
  | UpdateTree('a); */

type selectTreeState = {tree: option(tree)};

/* let selectTreeReducer =
    (state: selectTreeState, action: selectTreeAction(tree)): selectTreeState =>
  switch (action) {
  | UpdateTree(tree) => {...state, tree: Some(tree)}
  }; */