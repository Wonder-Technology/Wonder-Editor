open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->drag wdb", () => {
    let sandbox = getSandboxDefaultVal();

    let directionPointLightsAndBoxWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      directionPointLightsAndBoxWDBArrayBuffer :=
        WDBTool.generateDirectionPointLightsAndBoxWDB()
    );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorAssetTool.buildFakeFileReader();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test drag wdb to folder node", () =>
      testPromise(
        {|
        1.load wdb asset w1;
        2.add folder f1;
        3.drag w1 to f1;
        4.select f1;

        asset children should show w1
        |},
        () => {
          MainEditorSceneTool.prepareScene(sandbox);

          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
          |> ignore;

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=directionPointLightsAndBoxWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               MainEditorAssetTreeTool.Select.selectFolderNode(
                 ~nodeId=
                   MainEditorAssetTreeTool.getRootNodeId(
                     StateEditorService.getState(),
                   ),
                 (),
               );

               let addedFolderNodeId = MainEditorAssetIdTool.getNewAssetId();

               MainEditorAssetHeaderOperateNodeTool.addFolder();

               MainEditorAssetTreeTool.Drag.dragAssetChildrenNodeIntoAssetTreeNode(
                 ~startNodeId=uploadedWDBNodeId,
                 ~targetNodeId=addedFolderNodeId,
                 (),
               );

               MainEditorAssetTreeTool.Select.selectFolderNode(
                 ~nodeId=addedFolderNodeId,
                 (),
               );
               BuildComponentTool.buildAssetChildrenNode()
               |> ReactTestTool.createSnapshotAndMatch
               |> resolve;
             });
        },
      )
    );

    describe("test drag wdb to scene tree", () => {
      describe("test wdb has direction and point light gameObjects", () => {
        let _test = (sandbox, testFunc) =>
          DragWDBTool.testDragWDB(
            sandbox,
            (
              "DirectionPointLightsAndBox",
              directionPointLightsAndBoxWDBArrayBuffer^,
            ),
            testFunc,
          );

        describe("should init cloned gameObjects", () =>
          testPromise("glsl->direction,point light count should + 1", () =>
            _test(
              sandbox,
              (
                shaderSourceCountBeforeDrag,
                shaderSourceCountAfterDrag,
                glShaderSource,
              ) =>
              (
                GLSLToolEngine.containMultiline(
                  GLSLToolEngine.getVsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag,
                  ),
                  [
                    {|#define DIRECTION_LIGHTS_COUNT 1|},
                    {|#define POINT_LIGHTS_COUNT 1|},
                  ],
                ),
                GLSLToolEngine.containMultiline(
                  GLSLToolEngine.getFsSourceByCount(
                    glShaderSource,
                    shaderSourceCountBeforeDrag,
                  ),
                  [
                    {|#define DIRECTION_LIGHTS_COUNT 1|},
                    {|#define POINT_LIGHTS_COUNT 1|},
                  ],
                ),
              )
              |> expect == (true, true)
              |> resolve
            )
          )
        );

        describe("should reinit origin gameObjects in scene", () =>
          testPromise("glsl->direction,point light count should + 1", () =>
            _test(
              sandbox,
              (
                shaderSourceCountBeforeDrag,
                shaderSourceCountAfterDrag,
                glShaderSource,
              ) =>
              GLSLToolEngine.containMultiline(
                GLSLToolEngine.getFsSourceByCount(
                  glShaderSource,
                  shaderSourceCountBeforeDrag,
                ),
                [
                  {|#define DIRECTION_LIGHTS_COUNT 1|},
                  {|#define POINT_LIGHTS_COUNT 1|},
                ],
              )
              |> expect == true
              |> resolve
            )
          )
        );

        testPromise("should reinit cloned gameObjects", () =>
          _test(
            sandbox,
            (
              shaderSourceCountBeforeDrag,
              shaderSourceCountAfterDrag,
              glShaderSource,
            ) =>
            shaderSourceCountAfterDrag
            - shaderSourceCountBeforeDrag
            |> expect == 1
            |> resolve
          )
        );

        testPromise("should clear shader cache", () =>
          _test(
            sandbox,
            (
              shaderSourceCountBeforeDrag,
              shaderSourceCountAfterDrag,
              glShaderSource,
            ) =>
            ShaderToolEngine.isShaderCacheClear(
              StateEngineService.unsafeGetState(),
            )
            |> expect == true
            |> resolve
          )
        );
      });

      describe("check", () =>
        describe("check light count before drag", () =>
          describe("if light count will exceed max count after drag, warn", () => {
            let _test = (createLightFunc, judgeFunc) => {
              ConsoleTool.notShowMessage();

              let warn =
                createMethodStubWithJsObjSandbox(
                  sandbox,
                  ConsoleTool.console,
                  "warn",
                );

              MainEditorSceneTool.prepareScene(sandbox);

              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree()
              |> ignore;

              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              let (editorState, engineState) =
                createLightFunc(editorState, engineState);

              editorState |> StateEditorService.setState |> ignore;
              engineState |> StateEngineService.setState |> ignore;

              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=directionPointLightsAndBoxWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );
                   MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     (),
                   );

                   judgeFunc(warn);
                 });
            };

            describe("test direction light", () => {
              testPromise("test not exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, directionLight1) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn => warn |> expect |> not_ |> toCalled |> resolve,
                )
              );
              testPromise("test exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, directionLight1) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    let (editorState, engineState, directionLight3) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn =>
                    ConsoleTool.getMessage(warn)
                    |> expect
                    |> toContain(
                         "the direction light count is exceed max count!",
                       )
                    |> resolve,
                )
              );
            });

            describe("test point light", () => {
              testPromise("test not exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, directionLight1) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveEngineService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    let (editorState, engineState, _) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn => warn |> expect |> not_ |> toCalled |> resolve,
                )
              );
              testPromise("test exceed", () =>
                _test(
                  (editorState, engineState) => {
                    let (editorState, engineState, pointLight1) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, pointLight2) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );

                    let (editorState, engineState, pointLight3) =
                      MainEditorPointLightTool.createPointLight(
                        editorState,
                        engineState,
                      );

                    (editorState, engineState);
                  },
                  warn =>
                    ConsoleTool.getMessage(warn)
                    |> expect
                    |> toContain(
                         "the point light count is exceed max count!",
                       )
                    |> resolve,
                )
              );
            });
          })
        )
      );

      describe("test drag wdb to gameObject", () =>
        testPromise("should add to target sceneTree node's children", () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree,
          );

          MainEditorAssetUploadTool.loadOneWDB(
            ~arrayBuffer=directionPointLightsAndBoxWDBArrayBuffer^,
            (),
          )
          |> then_(uploadedWDBNodeId => {
               let engineState = StateEngineService.unsafeGetState();

               MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                 ~wdbNodeId=uploadedWDBNodeId,
                 ~targetGameObject=
                   MainEditorSceneTool.getFirstBox(engineState),
                 (),
               );

               BuildComponentTool.buildSceneTree(
                 TestTool.buildEmptyAppState(),
               )
               |> ReactTestTool.createSnapshotAndMatch
               |> resolve;
             });
        })
      );
      /* describe("fix bug", () =>
           describe(
             "should remain other scene tree node's isShowChildren not change", () =>
             test("test scene graph data", () => {
               let (scene, (box1, box4), box2, box3) =
                 SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

               let editorState = StateEditorService.getState();
               let engineState = StateEngineService.unsafeGetState();

               let editorState =
                 editorState
                 |> SceneEditorService.setIsShowChildren(box1, true)
                 |> SceneEditorService.setIsShowChildren(box4, true)
                 |> SceneEditorService.setIsShowChildren(box2, false);

               let (engineState, newGameObject1, _) =
                 GameObjectToolEngine.createGameObject(engineState);
               let name = "gameObject_0";
               let engineState =
                 GameObjectEngineService.setGameObjectName(
                   name,
                   newGameObject1,
                   engineState,
                 );

               let engineState =
                 engineState |> SceneEngineService.addSceneChild(newGameObject1);

               SceneEditorService.getIsShowChildrenMap(
                 editorState,
               )
               |>
               expect == [|
                           true,
                           Js.Nullable.undefined |> Obj.magic,
                           Js.Nullable.undefined |> Obj.magic,
                           true,
                           false,
                           false,
                           true,
                           false,
                         |];
             })
           )
         ); */
    });
  });