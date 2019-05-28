open WonderBsMost;

open Wonderjs;

open EventType;

type action =
  | ChangePercent(int);

type state = {
  percent: int,
  style: ReactDOMRe.Style.t,
};

module Method = {
  let buildWidthPercentStr = percent => (percent |> string_of_int) ++ "%";

  let willUnmount = () => {
    let engineState =
      ManageEventEngineService.offCustomGlobalEventByEventName(
        ~eventName=
          ProgressUtils.getProgressChangePercentCustomGlobalEventName(),
        ~state=StateEngineService.unsafeGetState(),
      );
    let engineState =
      ManageEventEngineService.offCustomGlobalEventByEventName(
        ~eventName=ProgressUtils.getProgressShowCustomGlobalEventName(),
        ~state=engineState,
      );
    let engineState =
      ManageEventEngineService.offCustomGlobalEventByEventName(
        ~eventName=ProgressUtils.getProgressHideCustomGlobalEventName(),
        ~state=engineState,
      );
    let engineState =
      ManageEventEngineService.offCustomGlobalEventByEventName(
        ~eventName=ProgressUtils.getProgressFinishCustomGlobalEventName(),
        ~state=engineState,
      );

    engineState |> StateEngineService.setState |> ignore;
  };

  let showProgress = () => DomUtils.showDomFlex("wonder-progress");

  let hideProgress = () => DomUtils.hideDom("wonder-progress");

  let finish = () => hideProgress();
};

let component = ReasonReact.reducerComponent("Progress");

let reducer = (action, state) =>
  switch (action) {
  | ChangePercent(value) =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp(
          "width",
          Method.buildWidthPercentStr(value),
          state.style,
        ),
      percent: value,
    })
  };

let render = ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article
    id="wonder-progress" className="wonder-progress" key="WonderProgress">
    <div className="progress-content">
      <div className="content-percent" style={state.style}>
        {DomHelper.textEl(Method.buildWidthPercentStr(state.percent))}
      </div>
    </div>
    <div className="progress-bg" />
  </article>;

let make = _children => {
  ...component,
  initialState: () => {
    percent: 0,
    style: ReactDOMRe.Style.make(~width=Method.buildWidthPercentStr(0), ()),
  },
  reducer,
  render: _self => render(_self),
  didUpdate: ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, 'b, 'c)) =>
    newSelf.state.percent === 100 ? Method.finish() : (),
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) => {
    let engineState = StateEngineService.unsafeGetState();

    let engineState =
      ManageEventEngineService.onCustomGlobalEvent(
        ~eventName=
          ProgressUtils.getProgressChangePercentCustomGlobalEventName(),
        ~handleFunc=
          (. event, engineState) => {
            send(
              ChangePercent(
                event.userData
                |> OptionService.unsafeGet
                |> WonderEditor.EventType.convertUserDataToInt,
              ),
            );

            (engineState, event);
          },
        ~state=engineState,
        (),
      );

    let engineState =
      ManageEventEngineService.onCustomGlobalEvent(
        ~eventName=ProgressUtils.getProgressShowCustomGlobalEventName(),
        ~handleFunc=
          (. event, engineState) => {
            Method.showProgress();

            (engineState, event);
          },
        ~state=engineState,
        (),
      );

    let engineState =
      ManageEventEngineService.onCustomGlobalEvent(
        ~eventName=ProgressUtils.getProgressHideCustomGlobalEventName(),
        ~handleFunc=
          (. event, engineState) => {
            Method.hideProgress();

            (engineState, event);
          },
        ~state=engineState,
        (),
      );

    let engineState =
      ManageEventEngineService.onCustomGlobalEvent(
        ~eventName=ProgressUtils.getProgressFinishCustomGlobalEventName(),
        ~handleFunc=
          (. event, engineState) => {
            Method.finish();

            (engineState, event);
          },
        ~state=engineState,
        (),
      );

    engineState |> StateEngineService.setState |> ignore;
  },
  willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    Method.willUnmount(),
};