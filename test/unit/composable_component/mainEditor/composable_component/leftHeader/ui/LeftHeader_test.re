open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Header;

open Js.Promise;

let _ =
  describe("LeftHeader", () => {
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

            let newGameObject = GameObjectTool.getNewGameObjectUid();

            MainEditorLeftHeaderTool.addEmptyGameObject();

            MainEditorSceneTreeTool.Select.selectGameObject(
              ~gameObject=newGameObject,
              (),
            );

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
          ConsoleTool.notShowMessage();
          let error =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "error",
            );
          GameObjectTool.clearCurrentSceneTreeNode();

          MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

          ConsoleTool.getMessage(error)
          |> expect
          |> toContain("current gameObject should exist, but actual is None");
        });

        describe("else", () =>
          test("remove current gameObject from editorState", () => {
            MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          })
        );

        describe("fix bug", () => {
          let _prepareState = () => {
            MainEditorSceneTool.initStateWithJob(
              ~sandbox,
              ~isBuildFakeDom=false,
              ~isInitJob=false,
              ~noWorkerJobRecord=
                NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
                  ~loopPipelines=
                    {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "dispose" },
{"name": "prepare_render_game_view" }
           ]
         }
       ]
             |},
                  ~loopJobs=
                    {|
             [
{"name": "dispose" },
{"name": "prepare_render_game_view" }
             ]
             |},
                  (),
                ),
              (),
            );

            MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
          };

          test(
            "remove actived camera's parent gameObject should dispose camera",
            () => {
            PrepareRenderViewJobTool.prepare(_prepareState);
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();
            let activedCamera =
              MainEditorSceneTool.getCameraInDefaultScene(engineState);
            MainEditorSceneTreeTool.Drag.dragGameObjectIntoGameObject(
              ~sourceGameObject=activedCamera,
              ~targetGameObject=MainEditorSceneTool.getFirstBox(engineState),
              (),
            );

            let engineState = StateEngineService.unsafeGetState();
            MainEditorSceneTreeTool.Select.selectGameObject(
              ~gameObject=MainEditorSceneTool.getFirstBox(engineState),
              (),
            );
            MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

            (
              activedCamera
              |> GameObjectToolEngine.isAlive(
                   _,
                   StateEngineService.unsafeGetState(),
                 ),
              GameViewEditorService.getActivedBasicCameraView(
                StateEditorService.getState(),
              ),
            )
            |> expect == (false, None);
          });
        });
      });

      describe("fix bug", () =>
        test(
          "remove gameObject has children;
            the children should be removed together;",
          () => {
            let (scene, (box1, box3, box4), box2) =
              SceneTreeTool.buildFourLayerSceneGraphToEngine(sandbox);
            GameObjectTool.setCurrentSceneTreeNode(box1);

            let engineState = StateEngineService.unsafeGetState();

            MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

            (
              engineState |> GameObjectTool.isAlive(box1),
              engineState |> GameObjectTool.isAlive(box3),
              engineState |> GameObjectTool.isAlive(box4),
            )
            |> expect == (false, false, false);
          },
        )
      );

      describe("test clone gameObject", () => {
        test(
          "test clone one gameObject, the cloned gameObject should add into its parent children",
          () => {
            let (scene, (box1, box4), box2, box3) =
              SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

            box4 |> GameObjectTool.setCurrentSceneTreeNode;

            MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

            let clonedGameObject = box4 |> succ;

            GameObjectTool.getChildren(box1)
            |> StateLogicService.getEngineStateToGetData
            |> Js.Array.includes(clonedGameObject)
            |> expect == true;
          },
        );
        test("test the cloned gameObject should be currentSceneTreeNode", () => {
          let (scene, (box1, box4), box2, box3) =
            SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

          box4 |> GameObjectTool.setCurrentSceneTreeNode;

          MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

          let clonedGameObject = box4 |> succ;

          StateEditorService.getState()
          |> SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
          |> expect == clonedGameObject;
        });

        describe("test clone gameObject componentMap", () => {
          test(
            "test cloned gameObject rebuild components should add into componentMap",
            () => {
            let (scene, (box1, box4), box2, box3) =
              SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

            box4 |> GameObjectTool.setCurrentSceneTreeNode;

            MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

            let clonedGameObject = box4 |> succ;

            StateEditorService.getState()
            |> InspectorEditorService.getComponentTypeMap
            |> WonderCommonlib.SparseMapService.get(clonedGameObject)
            |> Js.Option.isSome
            |> expect == true;
          });

          test(
            "test cloned gameObject components should === target gameObject components ",
            () => {
            let (scene, (box1, box4), box2, box3) =
              SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

            box4 |> GameObjectTool.setCurrentSceneTreeNode;

            MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

            let editorState = StateEditorService.getState();
            let targetGameObjectComponentArray =
              editorState
              |> InspectorEditorService.getComponentTypeMap
              |> WonderCommonlib.SparseMapService.unsafeGet(box4);

            let clonedGameObject = box4 |> succ;

            let clonedGameObjectComponentArray =
              editorState
              |> InspectorEditorService.getComponentTypeMap
              |> WonderCommonlib.SparseMapService.unsafeGet(clonedGameObject);

            targetGameObjectComponentArray
            |> Js.Array.toString
            |> expect == (clonedGameObjectComponentArray |> Js.Array.toString);
          });
        });
      });
    });

    describe("test ambient light", () => {
      beforeEach(() => {
        MainEditorSceneTool.initState(~sandbox, ());

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
      });

      test("test change color should set into engine", () => {
        let newColor = PickColorTool.buildColor1();

        ControllerTool.changeColor(newColor);

        SceneEngineService.getAmbientLightColor
        |> StateLogicService.getEngineStateToGetData
        |> Color.getHexString
        |> expect == newColor##hex;
      });
    });
  });