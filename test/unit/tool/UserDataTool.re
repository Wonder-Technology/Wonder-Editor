open UserDataType;

let getUserId = () => 1;

let getUserName = () => "amy";

let getEmail = () => "340606700@qq.com";

let getHashCode = () => "KLJHKJHFIUEHIUHEFUILHEFIULHFU";

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
  |> UserDataEditorService.setUserDataRecord({
       userId: getUserId(),
       userName: getUserName(),
       hashCode: getHashCode(),
       email: getEmail(),
       currentRepo:
         getUserRepoArray()
         |> Js.Array.filter(repoItem => repoItem.id === 1)
         |> ArrayService.unsafeGetFirst,
       userRepos: getUserRepoArray(),
     });