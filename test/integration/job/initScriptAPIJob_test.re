open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

open WonderBsMost;

let _ =
  describe("init script api job", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test api", () => {
      let _addGeometry = (gameObject, engineState) => {
        let (engineState, geometry) =
          GeometryEngineService.create(engineState);
        let engineState =
          engineState
          |> GameObjectComponentEngineService.addGeometryComponent(
               gameObject,
               geometry,
             );

        (engineState, geometry);
      };

      let _setSphereShape = (geometry, editorState) =>
        editorState
        |> PickingEditorService.setSphereShape(
             geometry,
             {radius: 0.1, center: (0., 0., 0.)}: ShapeType.sphereShape,
           );

      describe("not rewrited api should exist", () =>
        test("test", () =>
          InitScriptJobTool.createRewritedScriptAPIJsObj()##setTransformLocalPosition
          |> Js.Nullable.toOption
          |> Js.Option.isSome
          |> expect == true
        )
      );

      describe("disposeGameObject", () => {
        let _prepare = () => {
          let engineState = StateEngineService.unsafeGetState();
          let (engineState, gameObject, _) =
            GameObjectToolEngine.createGameObject(engineState);

          (engineState, gameObject);
        };

        describe("handle engine state", () =>
          test("dispose gameObject", () => {
            let (engineState, gameObject) = _prepare();
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;

            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);

            GameObjectToolEngine.isAlive(gameObject, engineState)
            |> expect == false;
          })
        );

        describe("handle editor state", () => {
          test(
            "if gameObject has geometry component, remove its picking->sphere shape data",
            () => {
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;
            let (engineState, gameObject) = _prepare();
            let (engineState, geometry) =
              _addGeometry(gameObject, engineState);
            _setSphereShape(geometry)
            |> StateLogicService.getAndSetEditorState;

            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);

            let editorState = StateEditorService.getState();
            PickingEditorService.getSphereShape(geometry, editorState)
            |> Js.Option.isNone
            |> expect == true;
          });
          test(
            "if gameObject->basicCameraView is active, remove it from editorState",
            () => {
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;
            let (engineState, gameObject) = _prepare();
            let (engineState, basicCameraView) =
              BasicCameraViewEngineService.create(engineState);
            let engineState =
              engineState
              |> GameObjectComponentEngineService.addBasicCameraViewComponent(
                   gameObject,
                   basicCameraView,
                 )
              |> BasicCameraViewEngineService.activeBasicCameraView(
                   basicCameraView,
                 );
            let editorState = StateEditorService.getState();
            let editorState =
              editorState
              |> GameViewEditorService.setActivedBasicCameraView(
                   basicCameraView,
                 );
            editorState |> StateEditorService.setState |> ignore;

            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);

            let editorState = StateEditorService.getState();
            GameViewEditorService.isActiveBasicCameraView(
              basicCameraView,
              editorState,
            )
            |> expect == false;
          });
          test("clear current data", () => {
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;
            let (engineState, gameObject) = _prepare();
            engineState |> StateEngineService.setState |> ignore;
            GameObjectTool.setCurrentSceneTreeNode(gameObject);

            let engineState = StateEngineService.unsafeGetState();
            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);
            engineState |> StateEngineService.setState |> ignore;

            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          });
          test("dispatch scene tree and inspector", () => {
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            let (engineState, gameObject) = _prepare();

            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);
            engineState |> StateEngineService.setState |> ignore;

            dispatchFuncStub
            |> expect
            |> toCalledWith([|
                 AppStore.UpdateAction(
                   Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
                 ),
               |]);
          });
        });
      });

      describe("test asset bundle api", () => {
        beforeEach(() => {
          MainEditorSceneTool.prepareScene(sandbox);
          MainEditorAssetTool.buildFakeFileReader();
        });

        describe("test cache api", () =>
          describe("not cache", () => {
            describe("initAssetBundleArrayBufferCache", () =>
              test("return empty promise", () => {
                let initAssetBundleArrayBufferCache =
                  InitScriptJobTool.createRewritedScriptAPIJsObj()##initAssetBundleArrayBufferCache;

                initAssetBundleArrayBufferCache(.)
                |> expect
                == Js.Promise.make((~resolve, ~reject) =>
                     (Wonderjs.PromiseType.convertResolveToUnit(resolve))(.)
                   );
              })
            );

            describe("isAssetBundleArrayBufferCached", () =>
              test("return resolve(false)", () => {
                let isAssetBundleArrayBufferCached =
                  InitScriptJobTool.createRewritedScriptAPIJsObj()##isAssetBundleArrayBufferCached;

                isAssetBundleArrayBufferCached(.)
                |> expect
                == Js.Promise.make((~resolve, ~reject) => resolve(. false));
              })
            );
          })
        );

        describe("getAssetBundlePath", () =>
          test("return empty str", () => {
            let getAssetBundlePath =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##getAssetBundlePath;

            getAssetBundlePath(.) |> expect == "";
          })
        );

        describe("test load api", () => {
          let _isArrayBufferEqual = (a1, a2) =>
            Js.Typed_array.(
              JudgeTool.isEqual(
                a1 |> ArrayBuffer.byteLength,
                a2 |> ArrayBuffer.byteLength,
              )
            );

          describe("loadAssetBundle", () =>
            describe("get asset bundle from asset tree->asset bundle node", () => {
              let _judge =
                  (
                    abRelativePath,
                    uploadedAssetBundleNodeId,
                    loadAssetBundleFunc,
                  ) => {
                let loadedAssetBundle = ref(Obj.magic(-1));

                loadAssetBundleFunc(. abRelativePath)
                |> Most.forEach(assetBundle =>
                     loadedAssetBundle := assetBundle
                   )
                |> then_(() =>
                     _isArrayBufferEqual(
                       loadedAssetBundle^,
                       MainEditorAssetAssetBundleNodeTool.getAssetBundle(
                         uploadedAssetBundleNodeId,
                       )
                       |> StateLogicService.getEditorState,
                     )
                     |> expect == true
                     |> resolve
                   );
              };

              testPromise("test load one asset bundle asset", () =>
                MainEditorAssetUploadTool.loadOneAssetBundle(
                  ~fileName="A.rab",
                  (),
                )
                |> then_(uploadedAssetBundleNodeId => {
                     let loadAssetBundle =
                       InitScriptJobTool.createRewritedScriptAPIJsObj()##loadAssetBundle;

                     _judge(
                       "A.rab",
                       uploadedAssetBundleNodeId,
                       loadAssetBundle,
                     );
                   })
              );
              testPromise(
                "test load one asset bundle asset in added folder", () => {
                let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addFolder();

                MainEditorAssetTreeTool.Select.selectFolderNode(
                  ~nodeId=addedFolderNodeId1,
                  (),
                );

                MainEditorAssetUploadTool.loadOneAssetBundle(
                  ~fileName="A.rab",
                  (),
                )
                |> then_(uploadedAssetBundleNodeId => {
                     let loadAssetBundle =
                       InitScriptJobTool.createRewritedScriptAPIJsObj()##loadAssetBundle;
                     let editorState = StateEditorService.getState();

                     _judge(
                       MainEditorAssetFolderNodeTool.getFolderName(
                         addedFolderNodeId1,
                         editorState,
                       )
                       ++ "/"
                       ++ "A.rab",
                       uploadedAssetBundleNodeId,
                       loadAssetBundle,
                     );
                   });
              });
              testPromise(
                "test load one asset bundle asset in added-two-layer  folder",
                () => {
                let addedFolderNodeId1 = MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addFolder();

                let addedFolderNodeId2 = MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addFolder();

                MainEditorAssetTreeTool.Select.selectFolderNode(
                  ~nodeId=addedFolderNodeId2,
                  (),
                );

                let addedFolderNodeId3 = MainEditorAssetIdTool.getNewAssetId();
                MainEditorAssetHeaderOperateNodeTool.addFolder();

                MainEditorAssetTreeTool.Select.selectFolderNode(
                  ~nodeId=addedFolderNodeId3,
                  (),
                );

                MainEditorAssetUploadTool.loadOneAssetBundle(
                  ~fileName="A.rab",
                  (),
                )
                |> then_(uploadedAssetBundleNodeId => {
                     let loadAssetBundle =
                       InitScriptJobTool.createRewritedScriptAPIJsObj()##loadAssetBundle;
                     let editorState = StateEditorService.getState();

                     _judge(
                       MainEditorAssetFolderNodeTool.getFolderName(
                         addedFolderNodeId2,
                         editorState,
                       )
                       ++ "/"
                       ++ MainEditorAssetFolderNodeTool.getFolderName(
                            addedFolderNodeId3,
                            editorState,
                          )
                       ++ "/"
                       ++ "A.rab",
                       uploadedAssetBundleNodeId,
                       loadAssetBundle,
                     );
                   });
              });
            })
          );
        });

        describe("addSABSceneGameObjectChildrenToScene", () => {
          let _prepare = () => {
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, gameObject1, _) =
              GameObjectToolEngine.createGameObject(engineState);
            let (engineState, gameObject2, _) =
              GameObjectToolEngine.createGameObject(engineState);
            let engineState =
              engineState |> GameObjectTool.addChild(gameObject1, gameObject2);

            let engineState =
              engineState
              |> GameObjectEngineService.setGameObjectName(
                   "gameObject1",
                   gameObject1,
                 )
              |> GameObjectEngineService.setGameObjectName(
                   "gameObject2",
                   gameObject2,
                 );

            (engineState, (gameObject1, gameObject2));
          };

          let _prepareAndExec = () => {
            let (engineState, (gameObject1, gameObject2)) = _prepare();
            let addSABSceneGameObjectChildrenToScene =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##addSABSceneGameObjectChildrenToScene;

            let engineState =
              addSABSceneGameObjectChildrenToScene(.
                gameObject1,
                engineState,
              );

            (engineState, (gameObject1, gameObject2));
          };

          describe("handle engine state", () =>
            test("add sab->scene gameObject->children to scene", () => {
              let (engineState, (gameObject1, gameObject2)) =
                _prepareAndExec();

              GameObjectTool.getChildren(
                SceneEngineService.getSceneGameObject(engineState),
                engineState,
              )
              |> expect == [|gameObject2|];
            })
          );

          describe("handle editor state", () => {
            test("add to scene tree", () => {
              let (engineState, (gameObject1, gameObject2)) =
                _prepareAndExec();
              engineState |> StateEngineService.setState |> ignore;

              BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("dispatch scene tree", () => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);
              let (engineState, (gameObject1, gameObject2)) =
                _prepareAndExec();
              engineState |> StateEngineService.setState |> ignore;

              dispatchFuncStub
              |> expect
              |> toCalledWith([|
                   AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])),
                 |]);
            });
            test("test show scene tree inspector", () => {
              let (engineState, (gameObject1, gameObject2)) =
                _prepareAndExec();
              engineState |> StateEngineService.setState |> ignore;

              MainEditorSceneTreeTool.Select.selectGameObject(
                ~gameObject=gameObject2,
                (),
              );

              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });
        });

        describe("setSABSceneGameObjectToBeScene", () => {
          let _prepare = () => {
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, gameObject1, _) =
              GameObjectToolEngine.createGameObject(engineState);
            let (engineState, gameObject2, _) =
              GameObjectToolEngine.createGameObject(engineState);
            let engineState =
              engineState |> GameObjectTool.addChild(gameObject1, gameObject2);

            let engineState =
              engineState
              |> GameObjectEngineService.setGameObjectName(
                   "gameObject1",
                   gameObject1,
                 )
              |> GameObjectEngineService.setGameObjectName(
                   "gameObject2",
                   gameObject2,
                 );

            (engineState, (gameObject1, gameObject2));
          };

          let _prepareAndExec = () => {
            let (engineState, (gameObject1, gameObject2)) = _prepare();
            let setSABSceneGameObjectToBeScene =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##setSABSceneGameObjectToBeScene;

            let engineState =
              setSABSceneGameObjectToBeScene(. gameObject1, engineState);

            (engineState, (gameObject1, gameObject2));
          };

          describe("handle engine state", () =>
            test("set sab scene gameObject->isRoot to false", () => {
              let (engineState, (gameObject1, gameObject2)) = _prepare();
              let engineState =
                engineState
                |> GameObjectEngineService.setGameObjectIsRoot(
                     gameObject1,
                     true,
                   );
              let setSABSceneGameObjectToBeScene =
                InitScriptJobTool.createRewritedScriptAPIJsObj()##setSABSceneGameObjectToBeScene;

              let engineState =
                setSABSceneGameObjectToBeScene(. gameObject1, engineState);

              GameObjectEngineService.unsafeGetGameObjectIsRoot(
                SceneEngineService.getSceneGameObject(engineState),
                engineState,
              )
              |> expect == false;
            })
          );

          describe("handle editor state", () => {
            test("clear picking->sphere shape data", () => {
              let geometry = 0;
              _setSphereShape(geometry)
              |> StateLogicService.getAndSetEditorState;
              let (engineState, (gameObject1, gameObject2)) =
                _prepareAndExec();

              let editorState = StateEditorService.getState();
              PickingEditorService.getSphereShape(geometry, editorState)
              |> Js.Option.isNone
              |> expect == true;
            });

            describe("set active basic camera view", () => {
              test(
                "if sab scene gameObject->children has active camera, set it to editorState",
                () => {
                let (engineState, (gameObject1, gameObject2)) = _prepare();
                let (engineState, basicCameraView) =
                  BasicCameraViewEngineService.create(engineState);
                let engineState =
                  engineState
                  |> GameObjectComponentEngineService.addBasicCameraViewComponent(
                       gameObject2,
                       basicCameraView,
                     )
                  |> BasicCameraViewEngineService.activeBasicCameraView(
                       basicCameraView,
                     );
                let setSABSceneGameObjectToBeScene =
                  InitScriptJobTool.createRewritedScriptAPIJsObj()##setSABSceneGameObjectToBeScene;

                let engineState =
                  setSABSceneGameObjectToBeScene(. gameObject1, engineState);

                let editorState = StateEditorService.getState();
                GameViewEditorService.getActivedBasicCameraView(editorState)
                |> OptionService.unsafeGet
                |> expect == basicCameraView;
              });
              test("else, remove it to editorState", () => {
                let (engineState, (gameObject1, gameObject2)) =
                  _prepareAndExec();

                let editorState = StateEditorService.getState();
                GameViewEditorService.getActivedBasicCameraView(editorState)
                |> Js.Option.isNone
                |> expect == true;
              });
            });

            test("update scene tree", () => {
              let (engineState, (gameObject1, gameObject2)) =
                _prepareAndExec();
              engineState |> StateEngineService.setState |> ignore;

              BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("dispatch scene tree and inspector", () => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);
              let (engineState, (gameObject1, gameObject2)) =
                _prepareAndExec();
              engineState |> StateEngineService.setState |> ignore;

              dispatchFuncStub
              |> expect
              |> toCalledWith([|
                   AppStore.UpdateAction(
                     Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
                   ),
                 |]);
            });

            describe("test show scene tree inspector", () => {
              test("test show scene gameObject->inspector", () => {
                let (engineState, (gameObject1, gameObject2)) =
                  _prepareAndExec();
                engineState |> StateEngineService.setState |> ignore;

                MainEditorSceneTreeTool.Select.selectGameObject(
                  ~gameObject=gameObject1,
                  (),
                );

                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              });
              test("test show scene gameObject->child->inspector", () => {
                let (engineState, (gameObject1, gameObject2)) =
                  _prepareAndExec();
                engineState |> StateEngineService.setState |> ignore;

                MainEditorSceneTreeTool.Select.selectGameObject(
                  ~gameObject=gameObject2,
                  (),
                );

                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              });
            });
          });
        });

        describe("disposeSceneAllChildren", () => {
          let _prepareAndExec = () => {
            let engineState = StateEngineService.unsafeGetState();
            let disposeSceneAllChildren =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeSceneAllChildren;

            let engineState = disposeSceneAllChildren(. engineState);

            engineState;
          };

          beforeEach(() =>
            MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox)
          );

          describe("handle engine state", () =>
            test("dispose all scene children", () => {
              let engineState = _prepareAndExec();

              GameObjectTool.getChildren(
                SceneEngineService.getSceneGameObject(engineState),
                engineState,
              )
              |> expect == [||];
            })
          );

          describe("handle editor state", () => {
            test("clear picking->sphere shape data", () => {
              let geometry = 0;
              _setSphereShape(geometry)
              |> StateLogicService.getAndSetEditorState;
              let engineState = _prepareAndExec();

              let editorState = StateEditorService.getState();
              PickingEditorService.getSphereShape(geometry, editorState)
              |> Js.Option.isNone
              |> expect == true;
            });
            test("scene tree should has no node", () => {
              let engineState = _prepareAndExec();

              BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test(
              "if scene->children has active camera, remove it from editorState",
              () => {
              MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
              let basicCameraView =
                GameObjectTool.getCurrentSceneTreeNodeBasicCameraView();
              MainEditorCameraViewTool.setCurrentCamera(
                ~cameraView=basicCameraView,
                (),
              );
              let engineState = _prepareAndExec();

              let editorState = StateEditorService.getState();
              GameViewEditorService.isActiveBasicCameraView(
                basicCameraView,
                editorState,
              )
              |> expect == false;
            });
            test("clear current data", () => {
              MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

              let engineState = _prepareAndExec();

              GameObjectTool.getCurrentSceneTreeNode()
              |> Js.Option.isNone
              |> expect == true;
            });
            test("dispatch scene tree", () => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);
              let engineState = _prepareAndExec();
              engineState |> StateEngineService.setState |> ignore;

              (
                dispatchFuncStub |> getCallCount,
                dispatchFuncStub
                |> SinonTool.calledWith(
                     _,
                     AppStore.UpdateAction(
                       Update([|
                         UpdateStore.SceneTree,
                         UpdateStore.Inspector,
                       |]),
                     ),
                   ),
              )
              |> expect == (1, true);
            });
          });
        });
      });
    });
  });