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
      describe("not rewrited api should exist", () =>
        test("test", () =>
          InitScriptJobTool.createRewritedScriptAPIJsObj()##setTransformLocalPosition
          |> Js.Nullable.toOption
          |> Js.Option.isSome
          |> expect == true
        )
      );

      describe("disposeGameObject", () => {
        describe("handle engine state", () =>
          test("dispose gameObject", () => {
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, gameObject, _) =
              GameObjectToolEngine.createGameObject(engineState);

            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);

            GameObjectToolEngine.isAlive(gameObject, engineState)
            |> expect == false;
          })
        );

        describe("handle editor state", () =>
          test("clear current data", () => {
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;
            let engineState = StateEngineService.unsafeGetState();
            let (engineState, gameObject, _) =
              GameObjectToolEngine.createGameObject(engineState);
            engineState |> StateEngineService.setState |> ignore;
            GameObjectTool.setCurrentSceneTreeNode(gameObject);

            let engineState = StateEngineService.unsafeGetState();
            let engineState =
              disposeGameObjectFunc(. gameObject, engineState);
            engineState |> StateEngineService.setState |> ignore;

            GameObjectTool.getCurrentSceneTreeNode()
            |> Js.Option.isNone
            |> expect == true;
          })
        );
      });

      describe("test asset bundle api", () => {
        beforeEach(() => {
          MainEditorSceneTool.prepareScene(sandbox);
          MainEditorAssetTool.buildFakeFileReader();
        });

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
      });
    });
  });