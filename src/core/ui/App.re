open DomHelper;

open WonderBsMost;

open UserDataType;

module Method = {
  let setUserDataToEditorState =
      ((loginUser, userInfo, userRepos), userId, repoId: int, editorState) => {
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
    |> UserDataEditorService.setProfilePath(userInfo##profile_picture)
    |> UserDataEditorService.setCurrentRepo(
         userRepoRecordArray
         |> Js.Array.filter(repoItem => repoItem.id === repoId)
         |> ArrayService.unsafeGetFirst,
       )
    |> UserDataEditorService.setUserRepos(userRepoRecordArray);
  };

  let showErrorMsgAndGoToHostPlatform = (msg, editorState) => {
    ConsoleUtils.error(msg, editorState);

    Most.just(1)
    |> Most.delay(6000)
    |> Most.tap(_ => DomHelper.locationHref("https://server.wonder-3d.com"))
    |> Most.drain
    |> ignore;
  };
};

let component = ReasonReact.statelessComponent("App");

let render =
    (
      (uiState: AppStore.appState, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <article key="app" className="wonder-app-component">
    <div className="wonder-app-message" id="appMessage" />
    {
      uiState.isInitEngine ?
        <>
          <Header uiState dispatchFunc />
          <Controller uiState dispatchFunc />
        </> :
        <AppShell />
    }
    {
      uiState.isUserLogin ?
        <MainEditor uiState dispatchFunc /> : ReasonReact.null
    }
  </article>;

let make = (~state as uiState: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: self => render((uiState, dispatch), self),
  didMount: _self => {
    ServiceWorker.registerServiceWorker();

    WonderLog.Wonder_Console.makeObjInToWindow();

    let editorState = StateEditorService.getState();

    StateEditorService.getIsUserLogin() ?
      {
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
                     Method.setUserDataToEditorState(
                       (loginUser, userInfo, resultObjData##userRepos),
                       userId,
                       repoId |> int_of_string,
                       editorState,
                     )
                     |> StateEditorService.setState;

                     dispatch(AppStore.CheckUserLoginAction);
                   } :
                   Method.showErrorMsgAndGoToHostPlatform(
                     {j|用户验证码错误，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
                     editorState,
                   )

               | _ =>
                 Method.showErrorMsgAndGoToHostPlatform(
                   {j|查询用户信息失败，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
                   editorState,
                 )
               };
             })
          |> WonderBsMost.Most.drain
          |> ignore
        | _ =>
          Method.showErrorMsgAndGoToHostPlatform(
            {j|用户信息错误，无法进入编辑器，请从托管平台打开项目，即将跳转到托管平台...|j},
            editorState,
          )
        };
      } :
      dispatch(AppStore.CheckUserLoginAction);
  },
};