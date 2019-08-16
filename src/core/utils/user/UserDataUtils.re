open WonderBsMost;

open UserDataType;

  let _showErrorMsgAndGoToHostPlatform = (msg, editorState) => {
    ConsoleUtils.error(msg, editorState);

    Most.just(-1)
    |> Most.delay(6000)
    |> Most.tap(_ =>
         DomHelper.locationHref("https://hostPlatform.wonder-3d.com")
       )
    |> Most.drain
    |> ignore
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
  |> UserDataEditorService.setUserId(userId)
  |> UserDataEditorService.setUserName(loginUser##user_name)
  |> UserDataEditorService.setEmail(loginUser##email)
  |> UserDataEditorService.setHashCode(code)
  |> UserDataEditorService.setCurrentRepo(
       userRepoRecordArray
       |> Js.Array.filter(repoItem => repoItem.id === repoId)
       |> ArrayService.unsafeGetFirst,
     )
  |> UserDataEditorService.setUserRepos(userRepoRecordArray);
        };

  let fetchUserDataStoreEditorState = (editorState,dispatch) => {
    let param = DomHelper.locationSearch(.);
    let userId = param##userId;
    let repoId = param##repoId;
    let code = param##code;

    switch (
      userId |> ValueService.isValueValid,
      repoId |> ValueService.isValueValid,
      code |> ValueService.isValueValid,
    ) {
    | (true, true, true) =>
      Fetch.fetch(
        ClientConfig.getServerPath()
        ++ "/graphql?query="
        ++ UserDataGraphQL.getUserData(userId),
      )
      |> Most.fromPromise
      |> Most.flatMap(response =>
           response |> Fetch.Response.json |> Most.fromPromise
         )
      /* TODO use flatMap */
      |> Most.tap(result => {
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
               {
                 _setUserDataToEditorState(
                   (loginUser, userInfo, resultObjData##userRepos),
                   userId,
                   repoId |> int_of_string,
                   code,
                   editorState,
                 )
                 |> StateEditorService.setState
                 |> ignore

               } :
               _showErrorMsgAndGoToHostPlatform(
                 {j|用户验证码错误，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
                 editorState,
               )

           | _ =>
             _showErrorMsgAndGoToHostPlatform(
               {j|查询用户信息失败，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
               editorState,
             )
           };
         })
      |> WonderBsMost.Most.drain
      |> ignore
    | _ =>
      _showErrorMsgAndGoToHostPlatform(
        {j|用户信息错误，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
        editorState,
      )
    };
};