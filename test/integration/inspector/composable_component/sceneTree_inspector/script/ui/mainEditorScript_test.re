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

            MainEditorScriptEventFunctionTool.addScriptEventFunction(
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

            MainEditorScriptEventFunctionTool.addScriptEventFunction(
              ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );
            MainEditorScriptEventFunctionTool.addScriptEventFunction(
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
                MainEditorScriptEventFunctionTool.getUpdateState(
                  ~state=
                    MainEditorScriptEventFunctionTool.buildState(
                      ~currentScript=
                        GameObjectTool.getCurrentSceneTreeNodeScript(),
                      (),
                    ),
                  ~func=
                    MainEditorScriptEventFunctionTool.addScriptEventFunction(
                      ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
                      (),
                    ),
                );

              BuildComponentTool.renderScriptEventFunctionComponent(
                ~state,
                ~sandbox,
                (),
              )
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

              MainEditorScriptEventFunctionTool.addScriptEventFunction(
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

              MainEditorScriptEventFunctionTool.removeScriptEventFunction(
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

              MainEditorScriptEventFunctionTool.removeScriptEventFunction(
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

              MainEditorScriptEventFunctionTool.addScriptEventFunction(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let state =
                MainEditorScriptEventFunctionTool.getUpdateState(
                  ~state=
                    MainEditorScriptEventFunctionTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptEventFunctionTool.sendShowScriptEventFunctionGroupForChange(
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

              BuildComponentTool.renderScriptEventFunctionComponent(
                ~state,
                ~sandbox,
                (),
              )
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

              MainEditorScriptEventFunctionTool.addScriptEventFunction(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let targetScriptEventFunctionNodeId =
                MainEditorScriptEventFunctionTool.getUnUsedScriptEventFunctionNodeIds(
                  script,
                )
                |> StateLogicService.getStateToGetData
                |> ArrayService.unsafeGetFirst;

              let state =
                MainEditorScriptEventFunctionTool.getUpdateState(
                  ~state=
                    MainEditorScriptEventFunctionTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptEventFunctionTool.handleChangeScriptEventFunction(
                      ~script,
                      ~currentScriptEventFunctionNodeId=
                        MainEditorScriptTool.getScriptAllEventFunctionNodeIds(
                          script,
                        )
                        |> StateLogicService.getStateToGetData
                        |> ArrayService.unsafeGetFirst,
                      ~targetScriptEventFunctionNodeId,
                      (),
                    ),
                );

              let state =
                MainEditorScriptEventFunctionTool.getUpdateState(
                  ~state=
                    MainEditorScriptEventFunctionTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptEventFunctionTool.sendShowScriptEventFunctionGroupForChange(
                      ~scriptEventFunctionNodeId=targetScriptEventFunctionNodeId,
                      ~script,
                      (),
                    ),
                );

              BuildComponentTool.renderScriptEventFunctionComponent(
                ~state,
                ~sandbox,
                (),
              )
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

            MainEditorScriptAttributeTool.addScriptAttribute(
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

            MainEditorScriptAttributeTool.addScriptAttribute(
              ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
              ~send=SinonTool.createOneLengthStub(sandbox^),
              (),
            );
            MainEditorScriptAttributeTool.addScriptAttribute(
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
                MainEditorScriptAttributeTool.getUpdateState(
                  ~state=
                    MainEditorScriptAttributeTool.buildState(
                      ~currentScript=
                        GameObjectTool.getCurrentSceneTreeNodeScript(),
                      (),
                    ),
                  ~func=
                    MainEditorScriptAttributeTool.addScriptAttribute(
                      ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
                      (),
                    ),
                );

              BuildComponentTool.renderScriptAttributeComponent(
                ~state,
                ~sandbox,
                (),
              )
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

              MainEditorScriptAttributeTool.addScriptAttribute(
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

              MainEditorScriptAttributeTool.removeScriptAttribute(
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

              MainEditorScriptAttributeTool.removeScriptAttribute(
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

              MainEditorScriptAttributeTool.addScriptAttribute(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let state =
                MainEditorScriptAttributeTool.getUpdateState(
                  ~state=
                    MainEditorScriptAttributeTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptAttributeTool.sendShowScriptAttributeGroupForChange(
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

              BuildComponentTool.renderScriptAttributeComponent(
                ~state,
                ~sandbox,
                (),
              )
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

              MainEditorScriptAttributeTool.addScriptAttribute(
                ~script,
                ~send=SinonTool.createOneLengthStub(sandbox^),
                (),
              );

              let targetScriptAttributeNodeId =
                MainEditorScriptTool.getUnUsedScriptAttributeNodeIds(script)
                |> StateLogicService.getStateToGetData
                |> ArrayService.unsafeGetFirst;

              let state =
                MainEditorScriptAttributeTool.getUpdateState(
                  ~state=
                    MainEditorScriptAttributeTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptAttributeTool.handleChangeScriptAttributeForChange(
                      ~script,
                      ~currentScriptAttributeNodeId=
                        MainEditorScriptTool.getScriptAllAttributeNodeIds(
                          script,
                        )
                        |> StateLogicService.getStateToGetData
                        |> ArrayService.unsafeGetFirst,
                      ~targetScriptAttributeNodeId,
                      (),
                    ),
                );

              let state =
                MainEditorScriptAttributeTool.getUpdateState(
                  ~state=
                    MainEditorScriptAttributeTool.buildState(
                      ~currentScript=script,
                      (),
                    ),
                  ~func=
                    MainEditorScriptAttributeTool.sendShowScriptAttributeGroupForChange(
                      ~scriptAttributeNodeId=targetScriptAttributeNodeId,
                      ~script,
                      (),
                    ),
                );

              BuildComponentTool.renderScriptAttributeComponent(
                ~state,
                ~sandbox,
                (),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
        });

        describe("test script attribute field", () => {
          describe("show attribute's fields", () => {
            test("test float type", () => {
              let (script, addedNodeId, fieldName) =
                ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
                  sandbox,
                );

              let script = GameObjectTool.getCurrentSceneTreeNodeScript();
              BuildComponentTool.buildScriptComponent(~script, ())
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("test int type", () => {
              let (script, addedNodeId, fieldName) =
                ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
                  sandbox,
                );

              ScriptAttributeInspectorTool.updateScriptAttributeNodeByReplaceFieldData(
                addedNodeId,
                (
                  fieldName,
                  ScriptAttributeInspectorTool.buildFieldJsObj(
                    ~type_="int",
                    ~defaultValue=0,
                  ),
                ),
              );

              let script = GameObjectTool.getCurrentSceneTreeNodeScript();
              BuildComponentTool.buildScriptComponent(~script, ())
              |> ReactTestTool.createSnapshotAndMatch;
            });
          });

          describe("test set field's defaultValue", () => {
            describe("test float type", () => {
              let _prepare = () => {
                let (script, addedNodeId, fieldName) =
                  ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
                    sandbox,
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

                engineState |> StateEngineService.setState |> ignore;

                MainEditorScriptAttributeTool.changeScriptAttributeFieldDefaultValueFloat(
                  script,
                  attributeName,
                  fieldName,
                  attribute,
                  newDefaultValue,
                );

                (
                  addedNodeId,
                  script,
                  attributeName,
                  fieldName,
                  attribute,
                  newDefaultValue,
                  StateEngineService.unsafeGetState(),
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

                ScriptAttributeFieldTool.unsafeGetScriptAttributeFieldDefaultValue(
                  script,
                  attributeName,
                  fieldName,
                  engineState,
                )
                |> expect
                == (
                     newDefaultValue |> ScriptAttributeFieldTool.buildFloatValue
                   );
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

                ScriptAttributeInspectorTool.unsafeGetScriptAttributeFieldDefaultValue(
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

            describe("test int type", () => {
              let _prepare = () => {
                let (script, addedNodeId, fieldName) =
                  ScriptAttributeInspectorTool.TestUpdateScriptAttributeInAllScriptComponents.prepareForOneScriptComponent(
                    sandbox,
                  );

                ScriptAttributeInspectorTool.updateScriptAttributeNodeByReplaceFieldData(
                  addedNodeId,
                  (
                    fieldName,
                    ScriptAttributeInspectorTool.buildFieldJsObj(
                      ~type_="int",
                      ~defaultValue=0,
                    ),
                  ),
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

                let newDefaultValue = 2;

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

                engineState |> StateEngineService.setState |> ignore;

                MainEditorScriptAttributeTool.changeScriptAttributeFieldDefaultValueInt(
                  script,
                  attributeName,
                  fieldName,
                  attribute,
                  newDefaultValue,
                );

                (
                  addedNodeId,
                  script,
                  attributeName,
                  fieldName,
                  attribute,
                  newDefaultValue,
                  StateEngineService.unsafeGetState(),
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

                ScriptAttributeFieldTool.unsafeGetScriptAttributeFieldDefaultValue(
                  script,
                  attributeName,
                  fieldName,
                  engineState,
                )
                |> expect
                == (newDefaultValue |> ScriptAttributeFieldTool.buildIntValue);
              });
            });
          });
        });
      });
    });
  });