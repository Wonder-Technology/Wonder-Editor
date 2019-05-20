open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("header import package->test light", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      ImportPackageTool.prepareLoad(sandbox);

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

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise(
      {|
        create direction light gameObject g1 to scene tree;
        export;
        import;

        should reInit default basicMaterial's and default lightMaterial's shader when import.
        |},
      () => {
        let gl = FakeGlToolEngine.getEngineStateGl();
        let glShaderSource = gl##shaderSource;

        let newGameObject = GameObjectTool.getNewGameObject();
        MainEditorLeftHeaderTool.addCube();

        GameObjectTool.setCurrentSceneTreeNode(newGameObject);

        MainEditorInspectorAddComponentTool.addDirectionLightComponent();

        let shaderSourceCountBeforeImport =
          GLSLToolEngine.getShaderSourceCallCount(glShaderSource);

        ImportPackageTool.testImportPackage(
          ~testFunc=
            () =>
              (
                GLSLToolEngine.getShaderSourceCallCount(glShaderSource)
                - shaderSourceCountBeforeImport,
                GLSLToolEngine.contain(
                  GLSLToolEngine.getVsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeImport + 1,
                  ),
                  {|#define DIRECTION_LIGHTS_COUNT 1|},
                ),
              )
              |> expect == (2, true)
              |> resolve,
          (),
        );
      },
    );
  });