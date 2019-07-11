let _prepareForTestRefreshEngineState = sandbox => {
  open Wonder_jest;
  open Expect;
  open Sinon;

  MainEditorSceneTool.initStateWithJob(
    ~sandbox,
    ~isBuildFakeDom=false,
    ~noWorkerJobRecord=
      NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
        ~loopPipelines=
          {|
                   [
                       {
                           "name": "default",
                           "jobs": [
            {
                "name": "clear_buffer"
            }
                           ]
                       }
                   ]
               |},
        (),
      ),
    (),
  );

  MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

  let clear = createEmptyStubWithJsObjSandbox(sandbox);

  StateEngineService.unsafeGetState()
  |> FakeGlToolEngine.setFakeGl(
       FakeGlToolEngine.buildFakeGl(~sandbox, ~clear, ()),
     )
  |> StateEngineService.setState
  |> ignore;

  clear;
};

let testRefreshEngineState = (sandbox, execFunc) => {
  open Wonder_jest;
  open Expect;
  open Sinon;

  let clear = _prepareForTestRefreshEngineState(sandbox);

  execFunc();

  clear |> expect |> toCalledOnce;
};

let testRefreshEngineStatePromise = (sandbox, execFunc) => {
  open Wonder_jest;
  open Expect;
  open Sinon;

  let clear = _prepareForTestRefreshEngineState(sandbox);

  execFunc()
  |> Js.Promise.then_(_ =>
       clear |> expect |> toCalledOnce |> Js.Promise.resolve
     );
};