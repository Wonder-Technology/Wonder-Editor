type uiState('children) =
  | Show('children)
  | Hide('children);

type changeState =
  | NotChange
  | ChangeToShow
  | ChangeToHide;