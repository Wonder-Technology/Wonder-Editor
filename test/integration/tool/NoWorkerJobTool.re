let initStateWithDisposeJob = (~sandbox, ~isBuildFakeDom=false, ()) =>
  MainEditorSceneTool.initStateWithJob(
    ~sandbox,
    ~isBuildFakeDom,
    ~noWorkerJobRecord=
      NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
        ~loopPipelines=
          {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
        (),
      ),
    (),
  );