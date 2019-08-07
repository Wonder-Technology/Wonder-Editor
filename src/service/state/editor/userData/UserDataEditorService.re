open EditorType;

let unsafeGetUserName = ({userDataRecord}) =>
  UserDataService.unsafeGetUserName(userDataRecord);

let setUserName = (value, {userDataRecord} as editorState) => {
  ...editorState,
  userDataRecord: UserDataService.setUserName(value, userDataRecord),
};

let unsafeGetProfilePath = ({userDataRecord}) =>
  UserDataService.unsafeGetProfilePath(userDataRecord);

let setProfilePath = (value, {userDataRecord} as editorState) => {
  ...editorState,
  userDataRecord: UserDataService.setProfilePath(value, userDataRecord),
};

let unsafeGetEmail = ({userDataRecord}) =>
  UserDataService.unsafeGetEmail(userDataRecord);

let setEmail = (value, {userDataRecord} as editorState) => {
  ...editorState,
  userDataRecord: UserDataService.setEmail(value, userDataRecord),
};

let unsafeGetCurrentRepo = ({userDataRecord}) =>
  UserDataService.unsafeGetCurrentRepo(userDataRecord);

let setCurrentRepo = (value, {userDataRecord} as editorState) => {
  ...editorState,
  userDataRecord: UserDataService.setCurrentRepo(value, userDataRecord),
};

let unsafeGetUserRepos = ({userDataRecord}) =>
  UserDataService.unsafeGetUserRepos(userDataRecord);

let setUserRepos = (value, {userDataRecord} as editorState) => {
  ...editorState,
  userDataRecord: UserDataService.setUserRepos(value, userDataRecord),
};