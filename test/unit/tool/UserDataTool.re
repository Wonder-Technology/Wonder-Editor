open UserDataType;

let getUserId = () => 1;

let getUserName = () => "amy";

let getEmail = () => "340606700@qq.com";

let getProfilePath = () => "/image/default.png";

let getUserRepoArray = () => [|
  {
    id: 1,
    name: "fist demo",
    description: "this is demo",
    filePath: "/wpk/default.wpk",
  },
  {
    id: 2,
    name: "second demo",
    description: "this is demo",
    filePath: "/wpk/default.wpk",
  },
  {
    id: 3,
    name: "third demo",
    description: "this is demo",
    filePath: "/wpk/default.wpk",
  },
|];

let setUserData = editorState =>
  editorState
  |> UserDataEditorService.setUserId(getUserId())
  |> UserDataEditorService.setUserName(getUserName())
  |> UserDataEditorService.setEmail(getEmail())
  |> UserDataEditorService.setProfilePath(getProfilePath())
  |> UserDataEditorService.setCurrentRepo(
       getUserRepoArray()
       |> Js.Array.filter(repoItem => repoItem.id === 1)
       |> ArrayService.unsafeGetFirst,
     )
  |> UserDataEditorService.setUserRepos(getUserRepoArray());