/* open WonderBsMost;

open JustgageReasonCookie;

open WonderBsJson;

type state = {
  username: string,
  password: string,
  logMsg: string,
  retrievelogMsg: string,
  isSednRetrieveEmail: bool,
  isShowRetrievePassword: bool,
  retrieveUserName: string,
};

type action =
  | ChangeUserName(string)
  | ChangePassword(string)
  | ChangeLogMsg(string)
  | ChangeRetrieveLogMsg(string)
  | ChangeRetrieveUserName(string)
  | ChangeIsSendRetrieveEmail(bool)
  | ShowRetrievePassword
  | HideRetrievePassword;

module Method = {
  let _checkUserIsActive = (user, send) =>
    user##is_active === 1 ?
      {
        Cookie.setJson(
          "userData",
          Json.Encode.object_([
            ("userId", Json.Encode.int(user##id)),
            ("username", Json.Encode.string(user##username)),
          ]),
        );

        DomHelper.locationHref("/");
      } :
      send(
        ChangeLogMsg(
          {j|用户名未完成邮箱验证，我们已经发送邮件到您的邮箱，请进行验证。|j},
        ),
      );

  let submit = (username, password, send) =>
    Fetch.fetch(
      "http://www.wonder-3d.com:8080/graphql?query="
      ++ UserGraphql.getLoginUserByUserName(username),
    )
    |> Most.fromPromise
    |> Most.flatMap(response =>
         response
         |> Fetch.Response.json
         |> Most.fromPromise
         |> Most.tap(jsonResult => {
              let user =
                JsonType.convertJsonToJsObj(jsonResult)##data##loginUser
                |> ArrayUtils.getFirst;

              switch (user) {
              | None => send(ChangeLogMsg({j|用户名不存在|j}))
              | Some(user) =>
                user##password === password ?
                  _checkUserIsActive(user, send) :
                  send(ChangeLogMsg({j|密码错误|j}))
              };
            })
       )
    |> Most.drain
    |> ignore;

  let retrievePassword = (username, send) => {
    send(ChangeIsSendRetrieveEmail(true));

    Fetch.fetch(
      "http://www.wonder-3d.com:8080/graphql?query="
      ++ UserGraphql.getLoginUserByUserName(username),
    )
    |> Most.fromPromise
    |> Most.flatMap(response =>
         response
         |> Fetch.Response.json
         |> Most.fromPromise
         |> Most.map(jsonResult =>
              switch (
                JsonType.convertJsonToJsObj(jsonResult)##data##loginUser
                |> ArrayUtils.getFirst
              ) {
              | None => None
              | Some(user) => Some(user##email)
              }
            )
       )
    |> Most.flatMap(email =>
         switch (email) {
         | None =>
           send(ChangeIsSendRetrieveEmail(false));
           send(
             ChangeRetrieveLogMsg(
               {j|发送邮箱失败, 找不到该用户名.|j},
             ),
           )
           |> WonderBsMost.Most.just;
         | Some(email) =>
           Fetch.fetch(
             {j|http://www.wonder-3d.com:8080/sendEmailToRetrievePassword?name=$username&email=$email|j},
           )
           |> WonderBsMost.Most.fromPromise
           |> WonderBsMost.Most.flatMap(response =>
                response
                |> Fetch.Response.json
                |> WonderBsMost.Most.fromPromise
                |> WonderBsMost.Most.map(jsonResult =>
                     JsonType.convertJsonToJsObj(jsonResult)##data##sendEmail
                     === "success" ?
                       send(
                         ChangeRetrieveLogMsg(
                           {j|我们已经发送邮件到$email， 请到邮箱进行验证.|j},
                         ),
                       ) :
                       {
                         send(ChangeIsSendRetrieveEmail(false));

                         send(
                           ChangeRetrieveLogMsg(
                             {j|发送邮箱失败, 找不到该用户名.|j},
                           ),
                         );
                       }
                   )
              )
         }
       )
    |> Most.drain
    |> ignore;
  };
};

let component = ReasonReact.reducerComponent("UserLogin");

let reducer = (action, state) =>
  switch (action) {
  | ChangeUserName(value) => ReasonReact.Update({...state, username: value})
  | ChangePassword(value) => ReasonReact.Update({...state, password: value})
  | ChangeLogMsg(value) => ReasonReact.Update({...state, logMsg: value})
  | ChangeRetrieveLogMsg(value) =>
    ReasonReact.Update({...state, retrievelogMsg: value})
  | ChangeRetrieveUserName(value) =>
    ReasonReact.Update({...state, retrieveUserName: value})
  | ChangeIsSendRetrieveEmail(value) =>
    ReasonReact.Update({...state, isSednRetrieveEmail: value})
  | ShowRetrievePassword =>
    ReasonReact.Update({...state, isShowRetrievePassword: true})
  | HideRetrievePassword =>
    ReasonReact.Update({...state, isShowRetrievePassword: false})
  };

let render = (hideUserLoginFunc,showUserRegisterFunc,{state, send}: ReasonReact.self('a, 'b, 'c)) =>
  state.isShowRetrievePassword ?
    <div className="header-retrievePsw">
      <div className="retrieve-title">
        <div className="title-text">
          ({j|找回密码|j} |> DomHelper.textEl)
        </div>
        <div className="title-close"> <img src="/img/close.png" 
        onClick=(_e => hideUserLoginFunc() )
        /> </div>
      </div>
      <div className="retrieve-content">
        (
          state.retrievelogMsg === "" ?
            <div className="content-logWhite" /> :
            <div className="content-logMsg">
              (DomHelper.textEl(state.retrievelogMsg))
            </div>
        )
        <FormItem
          value=state.retrieveUserName
          label={j|输入你的用户名，我们会发送密码重置邮件给你。|j}
          onChange=(value => send(ChangeRetrieveUserName(value)))
        />
      </div>
      <button
        className="retrieve-submit"
        disabled=(state.retrieveUserName === "" || state.isSednRetrieveEmail)
        onClick=(_e => Method.retrievePassword(state.retrieveUserName, send))>
        (DomHelper.textEl({j|确定|j}))
      </button>
    </div> :
    <div className="header-login">
      <div className="login-title">
        <div className="title-text"> ({j|登录|j} |> DomHelper.textEl) </div>
        <div className="title-close"> <img src="/img/close.png" 
        onClick=(_e => hideUserLoginFunc() )
        /> </div>
      </div>
      <div className="login-content">
        (
          state.logMsg === "" ?
            <div className="content-logWhite" /> :
            <div className="content-logMsg">
              (DomHelper.textEl(state.logMsg))
            </div>
        )
        <FormItem
          value=state.username
          label={j|用户名|j}
          onChange=(value => send(ChangeUserName(value)))
        />
        <FormItem
          value=state.password
          label={j|密码|j}
          onChange=(value => send(ChangePassword(value)))
          inputType="password"
        />
        <div
          className="content-password"
          onClick=(_e => send(ShowRetrievePassword))>
          (DomHelper.textEl({j|忘记登录密码？|j}))
        </div>
      </div>
      <button
        className="login-submit"
        disabled=(state.username === "" || state.password === "")
        onClick=(_e => Method.submit(state.username, state.password, send))>
        ({j|登录|j} |> ReasonReact.string)
      </button>
      <button
        className="login-submit login-register"
        onClick=(_e => showUserRegisterFunc())>
        ({j|注册|j} |> ReasonReact.string)
      </button>
    </div>;

let make = (~hideUserLoginFunc,~showUserRegisterFunc, _children) => {
  ...component,
  render: self => render(hideUserLoginFunc,showUserRegisterFunc, self),
  initialState: () => {
    username: "",
    password: "",
    logMsg: "",
    retrievelogMsg: "",
    retrieveUserName: "",
    isShowRetrievePassword: false,
    isSednRetrieveEmail: false,
  },
  reducer,
}; */