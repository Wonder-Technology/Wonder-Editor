open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("Header", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test operate gameObject", () => {
      beforeEach(() =>
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
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
        )
      );

      describe("test add gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          )
        );
        describe("test add emptyGameObject", () =>
          test(
            "the added emptyGameObject should only has transform component", () => {
            let engineState = StateEngineService.unsafeGetState();

            HeaderTool.triggerAddEmptyGameObject();

            SceneTreeNodeDomTool.OperateDefaultScene.getNewGameObjectDomIndex()
            |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

            (
              engineState
              |> GameObjectComponentEngineService.hasTransformComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
              engineState
              |> GameObjectComponentEngineService.hasMeshRendererComponent(
                   GameObjectTool.unsafeGetCurrentSceneTreeNode(),
                 ),
            )
            |> expect == (true, false);
          })
        );
      });
      describe("test dispose gameObject", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
          )
        );
        test(
          "if not set current gameObject, log error message and continue", () => {
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );
          GameObjectTool.clearCurrentSceneTreeNode();
          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          BaseEventTool.triggerComponentEvent(
            component,
            OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
          );
          LogTool.getMessage(error)
          |> expect
          |> toContain("current gameObject should exist, but actual is None");
        });

        describe("else", () =>
          test("remove current gameObject from editorState", () => {
            let component =
              BuildComponentTool.buildHeader(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
            );
            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          })
        );
      });

      describe("fix bug", () =>
        test(
          "remove gameObject has children;
            the children should be removed together;",
          () => {
            let (box1, box2, box3, box4) =
              SceneTreeTool.buildFourLayerSceneAndGetBox(sandbox);

            let engineState = StateEngineService.unsafeGetState();

            let component =
              BuildComponentTool.buildHeader(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
            );

            (
              engineState |> GameObjectTool.isAlive(box1),
              engineState |> GameObjectTool.isAlive(box3),
              engineState |> GameObjectTool.isAlive(box4),
            )
            |> expect == (false, false, false);
          },
        )
      );
    });

    describe("test ambient light", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
      });
      describe("test snapshot", () =>
        test("show color picker component for change color", () => {
          BuildCanvasTool.buildFakeCanvas(sandbox);

          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );

          BaseEventTool.triggerComponentEvent(
            component,
            OperateComponentEventTool.triggerShowColorPickEvent,
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        })
      );
      test("test change color should set into engine", () => {
        let newColor = {
          "hex": "#7df1e8",
          "rgb": {
            "r": 125,
            "g": 241,
            "b": 232,
          },
        };

        Header.Method.changeColor(newColor);

        SceneEngineService.getAmbientLightColor
        |> StateLogicService.getEngineStateToGetData
        |> Color.getHexString
        |> expect == newColor##hex;
      });
    });

    describe("test export zip", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );

        MainEditorAssetHeaderWDBTool.buildFakeTextEncoder();
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      });

      test(
        "export assets folder's all node;
        first node is folder;
        second node is texture;
        third node is texture;
        fourth node is json;
      ",
        () => {
          MainEditorAssetTool.buildTwoLayerAssetTreeRootTest() |> ignore;

          let obj = HeaderTool.buildFakeJsZipCreateFunc(sandbox^);

          HeaderExportUtils.exportPackage(() => obj);

          let file = obj##file;

          (
            file |> getCall(0) |> getArgs,
            file |> getCall(1) |> getArgs,
            file |> getCall(3) |> getArgs,
          )
          |>
          expect == (
                      [
                        "Assets/newFolder",
                        0 |> Obj.magic,
                        {"dir": true} |> Obj.magic,
                      ],
                      [
                        "Assets/newFolder 1/texture5.tex",
                        "the type: material/texture can't resolve now",
                        {"binary": true} |> Obj.magic,
                      ],
                      [
                        "Assets/newJson.json",
                        "json result",
                        {"binary": true} |> Obj.magic,
                      ],
                    );
        },
      );
      test("export scene.wdb;", () => {
        let assetTreeDomRecord =
          MainEditorAssetTool.buildTwoLayerAssetTreeRootTest();

        let component =
          BuildComponentTool.buildHeader(
            TestTool.buildAppStateSceneGraphFromEngine(),
          );

        let obj = HeaderTool.buildFakeJsZipCreateFunc(sandbox^);

        HeaderExportUtils.exportPackage(() => obj);

        let file = obj##file;

        file
        |> getCall(4)
        |> getArgs
        |> Js.List.hd
        |> OptionService.unsafeGet
        |> expect == "scene.wdb";
      });
    });

    /* TODO add tests */
    describe("test import zip", () =>
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
        MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
          MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
        );
        MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

        MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
      })
    );
    /* test("aaa", () => {
         let path = "Assets/newFolder/newFolder 1";

         HeaderImportUtils._handleImportFolderPath(path);

         HeaderImportUtils._handleImportFolderPath(path);
         /*
          let path = "Assets/newFolder/newFolder 1/newFolder 2/fck123.json";
          HeaderImportUtils._handleImportJson(path); */

         expect(1) == 1;
       }); */
    /* testPromise("aaaa", () => {
         let path = "Assets/newFolder/newFolder 1/scene.wdb";
         let fileName = "BoxTextured";
         let newWDBArrayBuffer =
           MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

         HeaderImportUtils._handleImportWDB(path, newWDBArrayBuffer)
         |> then_(_ => {
              WonderLog.Log.printJson(
                StateEditorService.getState()
                |> AssetTreeRootEditorService.getAssetTreeRoot,
              )
              |> ignore;

              StateEditorService.getState()
              |> AssetWDBNodeMapEditorService.getWDBNodeMap
              |> WonderLog.Log.print;

              expect(1) == 1 |> resolve;
            });
       }); */
    /* test("aaaa", () => {
         let path = "scene.wdb";

         /* HeaderImportUtils._handleImportWDB(path, "qwdqwqd"); */
         expect(1) == 1;
       }); */
  });