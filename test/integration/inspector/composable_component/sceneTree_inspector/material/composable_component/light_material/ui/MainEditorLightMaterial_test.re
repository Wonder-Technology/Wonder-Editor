open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorBasicMaterialMap;

let _ =
  describe("MainEditorLightMaterial", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareWithEmptyJob = () => {
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () =>
      describe("test change color should set current gameObject color", () => {
        describe("test snapshot", () => {
          beforeEach(() => {
            _prepareWithEmptyJob();

            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
            );
          });

          test("show color picker component for change color", () => {
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;

            let component =
              BuildComponentTool.buildLightMaterial(
                GameObjectTool.getCurrentGameObjectLightMaterial(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MaterialEventTool.triggerShowColorPickEvent,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("close color picker component", () => {
            let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

            let createElementStub = ColorPickTool.documentToJsObj(
                                      ColorPickTool.document,
                                    )##createElement;

            createElementStub
            |> withOneArg("canvas")
            |> returns(canvasDom)
            |> ignore;

            let component =
              BuildComponentTool.buildLightMaterial(
                GameObjectTool.getCurrentGameObjectLightMaterial(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MaterialEventTool.triggerShowColorPickEvent,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MaterialEventTool.triggerShowColorPickEvent,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () => {
          let _prepareDefaultSceneAndInit = () => {
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
            );
            DirectorToolEngine.prepareAndInitAllEnginState();
          };

          let _prepareWithJob = () => {
            MainEditorSceneTool.initStateAndGlWithJob(
              ~sandbox,
              ~noWorkerJobRecord=
                NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(),
              (),
            );
            EventListenerTool.buildFakeDom()
            |> EventListenerTool.stubGetElementByIdReturnFakeDom;
          };

          test("material->diffuseColor should be changed", () => {
            _prepareWithJob();
            _prepareDefaultSceneAndInit();

            let currentGameObjectMaterial =
              GameObjectTool.getCurrentGameObjectLightMaterial();
            let newColor = {
              "hex": "#7df1e8",
              "rgb": {
                "r": 125,
                "g": 241,
                "b": 232,
              },
            };

            MaterialEventTool.triggerChangeLightColor(
              currentGameObjectMaterial,
              newColor,
            );

            LightMaterialEngineService.getLightMaterialDiffuseColor(
              currentGameObjectMaterial,
            )
            |> StateLogicService.getEngineStateToGetData
            |> Color.getHexString
            |> expect == newColor##hex;
          });
        });
      })
    );
  });