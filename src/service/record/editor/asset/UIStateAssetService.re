open UIStateAssetType;

let get = uiState =>
  switch (uiState) {
  | Show(children) => children
  | Hide(children) => children
  };

let map = (func, uiState) =>
  switch (uiState) {
  | Show(children) => Show(children |> func)
  | Hide(children) => Hide(children |> func)
  };

let mapChildren = (seqMapFunc, func, uiState) =>
  map(seqMapFunc(func), uiState);

let build = (~children=[||], ~isShowChildren=true, ()) =>
  isShowChildren ? Show(children) : Hide(children);

let buildByChangeStateType = (changeStateType, children) =>
  switch (changeStateType) {
  | NotChange => children
  | ChangeToShow => get(children) |. Show
  | ChangeToHide => get(children) |. Hide
  };

let getIsShowChildrenByState = uiState =>
  switch (uiState) {
  | Show(_) => true
  | Hide(_) => false
  };

let hasChildren = uiState => get(uiState) |> Js.Array.length > 0;

let fold = (seqFoldFunc, func, acc, uiState) =>
  switch (uiState) {
  | Show(children)
  | Hide(children) =>
    seqFoldFunc((. acc, children) => func(acc, children), acc, children)
  };

let filter = (seqFilterFunc, func, uiState) =>
  switch (uiState) {
  | Show(children) => children |> seqFilterFunc(func) |. Show
  | Hide(children) => children |> seqFilterFunc(func) |. Hide
  };

let find = (seqFindFunc, func, uiState) =>
  switch (uiState) {
  | Show(children) => children |> seqFindFunc(func)
  | Hide(children) => children |> seqFindFunc(func)
  };