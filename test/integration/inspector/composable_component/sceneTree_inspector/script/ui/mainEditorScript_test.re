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

      describe("test script event function", () => {
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
                    MainEditorScriptTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
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
                MainEditorScriptTool.getUnUsedScriptEventFunctionNodeIds(
                  script,
                )
                |> StateLogicService.getStateToGetData
                |> ArrayService.unsafeGetFirst;

              let state =
                MainEditorScriptTool.getUpdateState(
                  ~state=
                    MainEditorScriptTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
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
                    MainEditorScriptTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
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

      describe("test script attribute", () => {
        describe("test add script attribute", () => {
          test("if has no script attribute asset, warn", () => {
            let warn =
              createMethodStubWithJsObjSandbox(
                sandbox,
                ConsoleTool.console,
                "warn",
              );

            MainEditorScriptTool.addScriptAttribute(
              ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            warn |> expect |> toCalledOnce;
          });
          test("if has no unused script attribute asset, warn", () => {
            let warn =
              createMethodStubWithJsObjSandbox(
                sandbox,
                ConsoleTool.console,
                "warn",
              );
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

            MainEditorScriptTool.addScriptAttribute(
              ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );
            MainEditorScriptTool.addScriptAttribute(
              ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            warn |> expect |> toCalledOnce;
          });

          describe("show script attribute group for add", () =>
            test("show all unused ones", () => {
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

              let state =
                MainEditorScriptTool.getUpdateState(
                  ~state=
                    MainEditorScriptTool.buildState(
                      ~currentScript=
                        GameObjectTool.getCurrentSceneTreeNodeScript(),
                      (),
                    ),
                  ~func=
                    MainEditorScriptTool.addScriptAttribute(
                      ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
                      (),
                    ),
                );

              BuildComponentTool.renderScriptComponent(~state, ~sandbox, ())
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );

          describe("test remove script attribute", () => {
            let _prepare = () => {
              let script = GameObjectTool.getCurrentSceneTreeNodeScript();
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

              MainEditorScriptTool.addScriptAttribute(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let attributeName =
                ScriptAttributeInspectorTool.getAttributeName(addedNodeId)
                |> StateLogicService.getEditorState;

              (script, attributeName);
            };

            test("remove from script", () => {
              let (script, attributeName) = _prepare();

              MainEditorScriptTool.removeScriptAttribute(
                ~script,
                ~attributeName,
                (),
              );

              ScriptEngineService.hasScriptAttributeData(
                script,
                attributeName,
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == false;
            });
            test("dispatch inspector", () => {
              let (script, attributeName) = _prepare();
              let dispatchFunc = SinonTool.createOneLengthStub(sandbox^);

              MainEditorScriptTool.removeScriptAttribute(
                ~script,
                ~attributeName,
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

        describe("test change script attribute", () => {
          describe("show script attribute group for change", () =>
            test("should contain self and all unused ones", () => {
              let script = GameObjectTool.getCurrentSceneTreeNodeScript();
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

              MainEditorScriptTool.addScriptAttribute(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let state =
                MainEditorScriptTool.getUpdateState(
                  ~state=
                    MainEditorScriptTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptTool.sendShowScriptAttributeGroupForChange(
                      ~scriptAttributeNodeId=
                        MainEditorScriptTool.getScriptAllAttributeNodeIds(
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
            test("script attribute group should be sorted", () => {
              let script = GameObjectTool.getCurrentSceneTreeNodeScript();
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();

              MainEditorScriptTool.addScriptAttribute(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let targetScriptAttributeNodeId =
                MainEditorScriptTool.getUnUsedScriptAttributeNodeIds(script)
                |> StateLogicService.getStateToGetData
                |> ArrayService.unsafeGetFirst;

              let state =
                MainEditorScriptTool.getUpdateState(
                  ~state=
                    MainEditorScriptTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptTool.handleChangeScriptAttribute(
                      ~script,
                      ~currentScriptAttributeNodeId=
                        MainEditorScriptTool.getScriptAllAttributeNodeIds(
                          script,
                        )
                        |> StateLogicService.getStateToGetData
                        |> ArrayService.unsafeGetFirst,
                      ~targetScriptAttributeNodeId,
                    ),
                );

              let state =
                MainEditorScriptTool.getUpdateState(
                  ~state=
                    MainEditorScriptTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptTool.sendShowScriptAttributeGroupForChange(
                      ~scriptAttributeNodeId=targetScriptAttributeNodeId,
                      ~script,
                      (),
                    ),
                );

              BuildComponentTool.renderScriptComponent(~state, ~sandbox, ())
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
        });

        describe("test script attribute field", () => {
          test("show attribute's fields", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
            let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
            ScriptAttributeInspectorTool.addDefaultField(
              ~sandbox,
              ~nodeId=addedNodeId,
              (),
            );

            MainEditorScriptTool.addScriptAttribute(
              ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );

            let script = GameObjectTool.getCurrentSceneTreeNodeScript();
            BuildComponentTool.buildScriptComponent(~script, ())
            |> ReactTestTool.createSnapshotAndMatch;
          });

          describe("test set field's defaultValue", () => {
            let _prepare = () => {
              let script = GameObjectTool.getCurrentSceneTreeNodeScript();
              let assetTreeData =
                MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();
              let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
              MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
              ScriptAttributeInspectorTool.addDefaultField(
                ~sandbox,
                ~nodeId=addedNodeId,
                (),
              );

              MainEditorScriptTool.addScriptAttribute(
                ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let engineState = StateEngineService.unsafeGetState();
              let attributeName =
                ScriptAttributeInspectorTool.getAttributeName(
                  addedNodeId,
                  engineState,
                );
              let attribute =
                ScriptAttributeInspectorTool.getAttribute(
                  addedNodeId,
                  engineState,
                );
              let (fieldName, field) =
                ScriptAttributeInspectorTool.getAttributeEntries(addedNodeId)
                |> StateLogicService.getEditorState
                |> ArrayService.unsafeGetFirst;

              let newDefaultValue = 1.1;

              (
                addedNodeId,
                script,
                attributeName,
                fieldName,
                attribute,
                newDefaultValue,
                engineState,
              );
            };

            let _prepareAndExec = () => {
              let (
                addedNodeId,
                script,
                attributeName,
                fieldName,
                attribute,
                newDefaultValue,
                engineState,
              ) =
                _prepare();

              let engineState =
                MainEditorScriptTool.changeScriptAttributeFieldDefaultValue(
                  script,
                  attributeName,
                  fieldName,
                  attribute,
                  newDefaultValue,
                  engineState,
                );
              engineState |> StateEngineService.setState |> ignore;

              (
                addedNodeId,
                script,
                attributeName,
                fieldName,
                attribute,
                newDefaultValue,
                engineState,
              );
            };

            test("update script->attribute->field->defaultValue", () => {
              let (
                addedNodeId,
                script,
                attributeName,
                fieldName,
                attribute,
                newDefaultValue,
                engineState,
              ) =
                _prepareAndExec();

              ScriptAttributeFieldTool.getScriptAttributeFieldDefaultValue(
                script,
                attributeName,
                fieldName,
                engineState,
              )
              |> expect
              == (newDefaultValue |> ScriptAttributeFieldTool.buildFloatValue);
            });
            test(
              "shouldn't update script attribute asset->field->defaultValue",
              () => {
              let (
                addedNodeId,
                script,
                attributeName,
                fieldName,
                attribute,
                newDefaultValue,
                engineState,
              ) =
                _prepareAndExec();

              ScriptAttributeInspectorTool.getScriptAttributeFieldDefaultValue(
                addedNodeId,
                fieldName,
              )
              |> StateLogicService.getEditorState
              |> expect == (0. |> ScriptAttributeFieldTool.buildFloatValue);
            });
            test("test show attribute's fields", () => {
              let (
                addedNodeId,
                script,
                attributeName,
                fieldName,
                attribute,
                newDefaultValue,
                engineState,
              ) =
                _prepareAndExec();

              BuildComponentTool.buildScriptComponent(~script, ())
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });
        });
      });
    });
  });