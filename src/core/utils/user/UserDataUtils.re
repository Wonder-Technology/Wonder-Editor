open WonderBsMost;

open UserDataType;

let showErrorMsgAndGoToHostPlatform = (msg, editorState) => {
  ConsoleUtils.error(msg, editorState);

  Most.just(-1)
  |> Most.delay(6000)
  |> Most.tap(_ =>
       DomHelper.setLocationHref(ClientConfig.getHostPlatformPath())
     )
  |> Most.drain
  |> ignore;
};

let _setUserDataToEditorState =
    ((loginUser, userInfo, userRepos), userId, repoId, code, editorState) => {
  let userRepoRecordArray =
    userRepos
    |> Js.Array.map(repoItem =>
         {
           id: repoItem##id |> int_of_string,
           name: repoItem##name,
           description: repoItem##description,
           filePath: repoItem##file_path,
         }
       );

  editorState
  |> UserDataEditorService.setUserDataRecord({
       userId,
       userName: loginUser##user_name,
       hashCode: code,
       email: loginUser##email,
       currentRepo:
         userRepoRecordArray
         |> Js.Array.filter(repoItem => repoItem.id === repoId)
         |> ArrayService.unsafeGetFirst,
       userRepos: userRepoRecordArray,
     });
};

let _fetchUserDataStoreEditorState = (userId, repoId, code, editorState) =>
  Fetch.fetch(
    ClientConfig.getServerPath()
    ++ "/graphql?query="
    ++ UserDataGraphQL.getUserData(userId),
  )
  |> Most.fromPromise
  |> Most.flatMap(response =>
       response |> Fetch.Response.json |> Most.fromPromise
     )
  |> Most.flatMap(result => {
       let resultObjData = JsonType.convertToJsObj(result)##data;

       switch (
         resultObjData##loginUser |> ArrayService.getFirst,
         resultObjData##userInfo |> ArrayService.getFirst,
       ) {
       | (Some(loginUser), Some(userInfo)) =>
         ValueService.isValueEqual(
           ValueType.String,
           userInfo##hash_code,
           code,
         ) ?
           _setUserDataToEditorState(
             (loginUser, userInfo, resultObjData##userRepos),
             userId,
             repoId |> int_of_string,
             code,
             editorState,
           )
           |> StateEditorService.setState
           |> Most.just
           |> MostUtils.ignore :
           MostUtils.throwErrorWithString(
             {j|用户验证码错误，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
           )

       | _ =>
         MostUtils.throwErrorWithString(
           {j|用户信息错误，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
         )
       };
     });

let handleFetchUserDataStoreEditorState = editorState => {
  let param = DomHelper.getRequestParams(.);
  let userId = param##userId;
  let repoId = param##repoId;
  let code = param##code;

  switch (
    userId |> ValueService.isValueValid,
    repoId |> ValueService.isValueValid,
    code |> ValueService.isValueValid,
  ) {
  | (true, true, true) =>
    _fetchUserDataStoreEditorState(userId, repoId, code, editorState)
  | _ =>
    MostUtils.throwErrorWithString(
      {j|查询用户信息失败，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
    )
  };
};