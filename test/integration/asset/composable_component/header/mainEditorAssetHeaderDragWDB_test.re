open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("MainEditorAssetHeader->drag wdb", () => {
    let sandbox = getSandboxDefaultVal();

    let directionPointLightsAndCubeWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      directionPointLightsAndCubeWDBArrayBuffer :=
        WDBTool.generateDirectionPointLightsAndCubeWDB()
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
            ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
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
              "DirectionPointLightsAndCube",
              directionPointLightsAndCubeWDBArrayBuffer^,
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

        describe("should reinit origin gameObjects", () =>
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
            ShaderToolEngine.isInitShaderCacheClear(
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
                ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
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
                      PrimitiveLogicService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveLogicService.createDirectionLight(
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
                      PrimitiveLogicService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveLogicService.createDirectionLight(
                        editorState,
                        engineState,
                      );

                    let (editorState, engineState, directionLight3) =
                      PrimitiveLogicService.createDirectionLight(
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
                      PrimitiveLogicService.createDirectionLight(
                        editorState,
                        engineState,
                      );
                    let (editorState, engineState, directionLight2) =
                      PrimitiveLogicService.createDirectionLight(
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

      describe("test drag wdb to be target gameObject sib", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree,
          )
          |> ignore
        );
        describe("test drag gameObject before target gameObject", () => {
          describe("test target gameObject isn't scene gameObject", () =>
            testPromise("test snapshot", () =>
              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let engineState = StateEngineService.unsafeGetState();

                   MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     ~targetGameObject=
                       MainEditorSceneTool.getFirstCube(engineState),
                     ~dragPosition=SceneTreeNodeType.DragBeforeTarget,
                     (),
                   );

                   BuildComponentTool.buildSceneTree(
                     TestTool.buildEmptyAppState(),
                   )
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve;
                 })
            )
          );
          /* testPromise("test scene children", () => {
               let engineState = StateEngineService.unsafeGetState();
               let (scene, (camera, cube1, cube2, directionLight)) =
                 MainEditorSceneTool.getDefaultGameObjects(engineState);

               MainEditorAssetUploadTool.loadOneWDB(
                 ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
                 (),
               )
               |> then_(uploadedWDBNodeId => {
                    let wdbGameObject =
                      StateEditorService.getState()
                      |> OperateTreeAssetEditorService.unsafeFindNodeById(
                           uploadedWDBNodeId,
                         )
                      |> WDBNodeAssetService.getWDBGameObject;

                    Js.log(wdbGameObject);

                    MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                      ~wdbNodeId=uploadedWDBNodeId,
                      ~targetGameObject=
                        MainEditorSceneTool.getFirstCube(engineState),
                      ~dragPosition=SceneTreeNodeType.DragBeforeTarget,
                      (),
                    );

                    HierarchyGameObjectEngineService.getChildren(
                      scene,
                      engineState,
                    )
                    |>
                    expect == [|
                                camera,
                                wdbGameObject,
                                cube1,
                                cube2,
                                directionLight,
                              |]
                    |> resolve;
                  });
             }); */

          describe("test target gameObject is scene gameObject", () =>
            describe("set dragged gameobject to be scene first child", () =>
              testPromise("test snapshot", () =>
                MainEditorAssetUploadTool.loadOneWDB(
                  ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
                  (),
                )
                |> then_(uploadedWDBNodeId => {
                     let engineState = StateEngineService.unsafeGetState();

                     MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                       ~wdbNodeId=uploadedWDBNodeId,
                       ~targetGameObject=
                         SceneEngineService.getSceneGameObject
                         |> StateLogicService.getEngineStateToGetData,
                       ~dragPosition=SceneTreeNodeType.DragBeforeTarget,
                       (),
                     );

                     BuildComponentTool.buildSceneTree(
                       TestTool.buildEmptyAppState(),
                     )
                     |> ReactTestTool.createSnapshotAndMatch
                     |> resolve;
                   })
              )
            )
          );
        });
        describe("test drag gameObject into target gameObject", () => {
          describe("test target gameObject isn't scene gameObject", () =>
            testPromise("test snapshot", () =>
              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let engineState = StateEngineService.unsafeGetState();

                   MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     ~targetGameObject=
                       MainEditorSceneTool.getFirstCube(engineState),
                     ~dragPosition=SceneTreeNodeType.DragIntoTarget,
                     (),
                   );

                   BuildComponentTool.buildSceneTree(
                     TestTool.buildEmptyAppState(),
                   )
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve;
                 })
            )
          );

          describe("test target gameObject is scene gameObject", () =>
            describe("set dragged gameobject to be scene last child", () =>
              testPromise("test snapshot", () =>
                MainEditorAssetUploadTool.loadOneWDB(
                  ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
                  (),
                )
                |> then_(uploadedWDBNodeId => {
                     let engineState = StateEngineService.unsafeGetState();

                     MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                       ~wdbNodeId=uploadedWDBNodeId,
                       ~targetGameObject=
                         SceneEngineService.getSceneGameObject
                         |> StateLogicService.getEngineStateToGetData,
                       ~dragPosition=SceneTreeNodeType.DragIntoTarget,
                       (),
                     );

                     BuildComponentTool.buildSceneTree(
                       TestTool.buildEmptyAppState(),
                     )
                     |> ReactTestTool.createSnapshotAndMatch
                     |> resolve;
                   })
              )
            )
          );
        });
        describe("test drag gameObject after target gameObject", () => {
          describe("test target gameObject isn't scene gameObject", () =>
            testPromise("test snapshot", () =>
              MainEditorAssetUploadTool.loadOneWDB(
                ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
                (),
              )
              |> then_(uploadedWDBNodeId => {
                   let engineState = StateEngineService.unsafeGetState();

                   MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                     ~wdbNodeId=uploadedWDBNodeId,
                     ~targetGameObject=
                       MainEditorSceneTool.getFirstCube(engineState),
                     ~dragPosition=SceneTreeNodeType.DragAfterTarget,
                     (),
                   );

                   BuildComponentTool.buildSceneTree(
                     TestTool.buildEmptyAppState(),
                   )
                   |> ReactTestTool.createSnapshotAndMatch
                   |> resolve;
                 })
            )
          );

          describe("test target gameObject is scene gameObject", () =>
            describe("set dragged gameobject to be scene first child", () =>
              testPromise("test snapshot", () =>
                MainEditorAssetUploadTool.loadOneWDB(
                  ~arrayBuffer=directionPointLightsAndCubeWDBArrayBuffer^,
                  (),
                )
                |> then_(uploadedWDBNodeId => {
                     let engineState = StateEngineService.unsafeGetState();

                     MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
                       ~wdbNodeId=uploadedWDBNodeId,
                       ~targetGameObject=
                         SceneEngineService.getSceneGameObject
                         |> StateLogicService.getEngineStateToGetData,
                       ~dragPosition=SceneTreeNodeType.DragAfterTarget,
                       (),
                     );

                     BuildComponentTool.buildSceneTree(
                       TestTool.buildEmptyAppState(),
                     )
                     |> ReactTestTool.createSnapshotAndMatch
                     |> resolve;
                   })
              )
            )
          );
        });
      });
      /* describe("fix bug", () =>
           describe(
             "should remain other scene tree node's isShowChildren not change", () =>
             test("test scene graph data", () => {
               let (scene, (cube1, cube4), cube2, cube3) =
                 SceneTreeTool.buildThreeLayerSceneGraphToEngine(sandbox);

               let editorState = StateEditorService.getState();
               let engineState = StateEngineService.unsafeGetState();

               let editorState =
                 editorState
                 |> SceneTreeEditorService.setIsShowChildren(cube1, true)
                 |> SceneTreeEditorService.setIsShowChildren(cube4, true)
                 |> SceneTreeEditorService.setIsShowChildren(cube2, false);

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

               SceneTreeEditorService.getIsShowChildrenMap(
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