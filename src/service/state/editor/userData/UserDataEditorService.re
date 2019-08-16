open EditorType;

let unsafeGetUserDataRecord = state =>
  state.userDataRecord |> OptionService.unsafeGet;

let getUserId = state =>
  unsafeGetUserDataRecord(state) |> UserDataService.getUserId;

let setUserId = (value, state) => {
  ...state,
  userDataRecord:
    Some(
      unsafeGetUserDataRecord(state) |> UserDataService.setUserId(value),
    ),
};

let getUserName = state =>
  unsafeGetUserDataRecord(state) |> UserDataService.getUserName;

let setUserName = (value, {userDataRecord} as state) => {
  ...state,
  userDataRecord:
    Some(
      unsafeGetUserDataRecord(state) |> UserDataService.setUserName(value),
    ),
};

let getHashCode = state =>
  unsafeGetUserDataRecord(state) |> UserDataService.getHashCode;

let setHashCode = (value, {userDataRecord} as state) => {
  ...state,
  userDataRecord:
    Some(
      unsafeGetUserDataRecord(state) |> UserDataService.setHashCode(value),
    ),
};

let getEmail = state =>
  unsafeGetUserDataRecord(state) |> UserDataService.getEmail;

let setEmail = (value, {userDataRecord} as state) => {
  ...state,
  userDataRecord:
    Some(unsafeGetUserDataRecord(state) |> UserDataService.setEmail(value)),
};

let getCurrentRepo = state =>
  unsafeGetUserDataRecord(state) |> UserDataService.getCurrentRepo;

let setCurrentRepo = (value, {userDataRecord} as state) => {
  ...state,
  userDataRecord:
    Some(
      unsafeGetUserDataRecord(state) |> UserDataService.setCurrentRepo(value),
    ),
};

let getUserRepos = state =>
  unsafeGetUserDataRecord(state) |> UserDataService.getUserRepos;

let setUserRepos = (value, {userDataRecord} as state) => {
  ...state,
  userDataRecord:
    Some(
      unsafeGetUserDataRecord(state) |> UserDataService.setUserRepos(value),
    ),
};