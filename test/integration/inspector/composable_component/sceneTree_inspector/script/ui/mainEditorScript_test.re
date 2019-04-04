open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorScript", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
        );

        MainEditorInspectorAddComponentTool.addScriptComponent();
      });

      describe("test add script event function", () => {
        test("if has no script event function asset, warn", () => {
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "warn",
            );

          MainEditorScriptTool.addScriptEventFunction(
            ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
            ~send=SinonTool.createOneLengthStub(sandbox^),
            (),
          );

          warn |> expect |> toCalledOnce;
        });
        test("if has no unused script event function asset, warn", () => {
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              ConsoleTool.console,
              "warn",
            );
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
          let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

          MainEditorScriptTool.addScriptEventFunction(
            ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
            ~send=SinonTool.createOneLengthStub(sandbox^),
            (),
          );
          MainEditorScriptTool.addScriptEventFunction(
            ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
            ~send=SinonTool.createOneLengthStub(sandbox^),
            (),
          );

          warn |> expect |> toCalledOnce;
        });

        describe("show script event function group for add", () =>
          test("show all unused ones", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

            let state =
              MainEditorScriptTool.getUpdateState(
                ~state=
                  MainEditorScriptTool.buildState(
                    ~currentScript=
                      GameObjectTool.getCurrentSceneTreeNodeScript(),
                    (),
                  ),
                ~func=
                  MainEditorScriptTool.addScriptEventFunction(
                    ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
                    (),
                  ),
              );

            BuildComponentTool.renderScriptComponent(~state, ~sandbox, ())
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test remove script event function", () => {
          let _prepare = () => {
            let script = GameObjectTool.getCurrentSceneTreeNodeScript();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

            MainEditorScriptTool.addScriptEventFunction(
              ~script,
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            let eventFunctionName =
              ScriptEventFunctionInspectorTool.getEventFunctionName(
                addedNodeId,
              )
              |> StateLogicService.getEditorState;

            (script, eventFunctionName);
          };

          test("remove from script", () => {
            let (script, eventFunctionName) = _prepare();

            MainEditorScriptTool.removeScriptEventFunction(
              ~script,
              ~eventFunctionName,
              (),
            );

            ScriptEngineService.hasScriptEventFunctionData(
              script,
              eventFunctionName,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == false;
          });
          test("dispatch inspector", () => {
            let (script, eventFunctionName) = _prepare();
            let dispatchFunc = SinonTool.createOneLengthStub(sandbox^);

            MainEditorScriptTool.removeScriptEventFunction(
              ~script,
              ~eventFunctionName,
              ~dispatchFunc,
              (),
            );

            let dispatchedAction =
              dispatchFunc |> getCall(0) |> getArgs |> List.hd;
            ReactTool.getDispatchUpdateActionArr(dispatchedAction)
            |> expect == [|UpdateStore.Inspector|];
          });
        });
      });

      describe("test change script event function", () => {
        describe("show script event function group for change", () =>
          test("should contain self and all unused ones", () => {
            let script = GameObjectTool.getCurrentSceneTreeNodeScript();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

            MainEditorScriptTool.addScriptEventFunction(
              ~script,
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            let state =
              MainEditorScriptTool.getUpdateState(
                ~state=
                  MainEditorScriptTool.buildState(~currentScript=script, ()),
                ~func=
                  MainEditorScriptTool.sendShowScriptEventFunctionGroupForChange(
                    ~scriptEventFunctionNodeId=
                      MainEditorScriptTool.getScriptAllEventFunctionNodeIds(
                        script,
                      )
                      |> StateLogicService.getStateToGetData
                      |> ArrayService.unsafeGetFirst,
                    ~script,
                    (),
                  ),
              );

            BuildComponentTool.renderScriptComponent(~state, ~sandbox, ())
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        describe("test change", () =>
          test("script event function group should be sorted", () => {
            let script = GameObjectTool.getCurrentSceneTreeNodeScript();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
            MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

            MainEditorScriptTool.addScriptEventFunction(
              ~script,
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            let targetScriptEventFunctionNodeId =
              MainEditorScriptTool.getUnUsedScriptEventFunctionNodeIds(script)
              |> StateLogicService.getStateToGetData
              |> ArrayService.unsafeGetFirst;

            let state =
              MainEditorScriptTool.getUpdateState(
                ~state=
                  MainEditorScriptTool.buildState(~currentScript=script, ()),
                ~func=
                  MainEditorScriptTool.handleChangeScriptEventFunction(
                    ~script,
                    ~currentScriptEventFunctionNodeId=
                      MainEditorScriptTool.getScriptAllEventFunctionNodeIds(
                        script,
                      )
                      |> StateLogicService.getStateToGetData
                      |> ArrayService.unsafeGetFirst,
                    ~targetScriptEventFunctionNodeId,
                  ),
              );

            let state =
              MainEditorScriptTool.getUpdateState(
                ~state=
                  MainEditorScriptTool.buildState(~currentScript=script, ()),
                ~func=
                  MainEditorScriptTool.sendShowScriptEventFunctionGroupForChange(
                    ~scriptEventFunctionNodeId=targetScriptEventFunctionNodeId,
                    ~script,
                    (),
                  ),
              );

            BuildComponentTool.renderScriptComponent(~state, ~sandbox, ())
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
    });
  });