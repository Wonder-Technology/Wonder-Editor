let testRefreshEngineState = (sandbox, execFunc) => {
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

  execFunc();

  clear |> expect |> toCalledOnce;
};