open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller run and stop->script", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareWithNoWorkerJobRecord = noWorkerJobRecord => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord,
        (),
      );

      StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

      StateEngineService.unsafeGetState()
      |> FakeGlToolEngine.setFakeGl(
           FakeGlToolEngine.buildFakeGl(~sandbox, ()),
         )
      |> StateEngineService.setState
      |> ignore;

      MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
      MainEditorInspectorAddComponentTool.addScriptComponent();
    };

    let _buildNoWorkerJobConfigOnlyWithUpdateScript = () =>
      NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "init_editor" },
{"name": "init_script_api" }
           ]
         }
       ]
             |},
        ~initJobs=
          {|
             [
{"name": "init_editor" },
{"name": "init_script_api" }
             ]
             |},
        ~loopPipelines=
          {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "update_script" }
           ]
         }
       ]
             |},
        ~loopJobs=
          {|
             [
{"name": "update_script" }
             ]
             |},
        (),
      );

    let _buildNoWorkerJobConfigWithDispose = () =>
      NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "init_editor" },
{"name": "init_script_api" }
           ]
         }
       ]
             |},
        ~initJobs=
          {|
             [
{"name": "init_editor" },
{"name": "init_script_api" }
             ]
             |},
        ~loopPipelines=
          {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "update_script" },
{"name": "dispose" }
           ]
         }
       ]
             |},
        ~loopJobs=
          {|
             [
{"name": "update_script" },
{"name": "dispose" }
             ]
             |},
        (),
      );

    let _prepareOneScriptEventFunction = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

      let addedNodeId = MainEditorAssetIdTool.getNewAssetId();
      MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();
      let editorState = StateEditorService.getState();
      let eventFunctionName =
        ScriptEventFunctionInspectorTool.getEventFunctionName(
          addedNodeId,
          editorState,
        );

      let script = GameObjectTool.getCurrentSceneTreeNodeScript();

      let gameObject =
        ScriptEngineService.unsafeGetScriptGameObject(script)
        |> StateLogicService.getEngineStateToGetData;

      MainEditorScriptEventFunctionTool.addScriptEventFunction(
        ~script=GameObjectTool.getCurrentSceneTreeNodeScript(),
        ~send=SinonTool.createOneLengthStub(sandbox^),
        (),
      );

      (script, gameObject, addedNodeId, eventFunctionName);
    };

    let _buildUpdateEventFunctionSetLocalPosition1 = () =>
      Some(
        (. script, api, engineState: Wonderjs.StateDataMainType.state) => {
          let unsafeGetGameObjectTransformComponent =
            api##unsafeGetGameObjectTransformComponent;
          let setTransformLocalPosition = api##setTransformLocalPosition;
          let unsafeGetScriptGameObject = api##unsafeGetScriptGameObject;

          let gameObject = unsafeGetScriptGameObject(. script, engineState);

          let tran =
            unsafeGetGameObjectTransformComponent(. gameObject, engineState);

          let engineState =
            setTransformLocalPosition(. tran, (1., 0., 0.), engineState);

          engineState;
        },
      );

    let _buildUpdateEventFunctionSetLocalPosition2 = () =>
      Some(
        (. script, api, engineState: Wonderjs.StateDataMainType.state) => {
          let unsafeGetGameObjectTransformComponent =
            api##unsafeGetGameObjectTransformComponent;
          let setTransformLocalPosition = api##setTransformLocalPosition;
          let unsafeGetScriptGameObject = api##unsafeGetScriptGameObject;

          let gameObject = unsafeGetScriptGameObject(. script, engineState);

          let tran =
            unsafeGetGameObjectTransformComponent(. gameObject, engineState);

          let engineState =
            setTransformLocalPosition(. tran, (2., 0., 0.), engineState);

          engineState;
        },
      );

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.closeContractCheck();
    });
    afterEach(() => {
      TestTool.openContractCheck();
      restoreSandbox(refJsObjToSandbox(sandbox^));
    });

    describe("test exec event function", () => {
      let _prepareTwoScriptEventFunctions = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree();

        let addedNodeId1 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

        let addedNodeId2 = MainEditorAssetIdTool.getNewAssetId();
        MainEditorAssetHeaderOperateNodeTool.addScriptEventFunction();

        let editorState = StateEditorService.getState();
        let eventFunctionName1 =
          ScriptEventFunctionInspectorTool.getEventFunctionName(
            addedNodeId1,
            editorState,
          );
        let eventFunctionName2 =
          ScriptEventFunctionInspectorTool.getEventFunctionName(
            addedNodeId2,
            editorState,
          );

        let script1 = GameObjectTool.getCurrentSceneTreeNodeScript();

        MainEditorSceneTool.setSecondCubeToBeCurrentSceneTreeNode();
        MainEditorInspectorAddComponentTool.addScriptComponent();

        let script2 = GameObjectTool.getCurrentSceneTreeNodeScript();

        MainEditorScriptEventFunctionTool.addScriptEventFunction(
          ~script=script1,
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );

        MainEditorScriptEventFunctionTool.addScriptEventFunction(
          ~script=script2,
          ~send=SinonTool.createOneLengthStub(sandbox^),
          (),
        );
        MainEditorScriptEventFunctionTool.handleChangeScriptEventFunction(
          ~script=script2,
          ~currentScriptEventFunctionNodeId=Some(addedNodeId1),
          ~targetScriptEventFunctionNodeId=addedNodeId2,
          ~send=SinonTool.createOneLengthStub(sandbox^),
          ()
        );

        let gameObject1 =
          ScriptEngineService.unsafeGetScriptGameObject(script1)
          |> StateLogicService.getEngineStateToGetData;

        let gameObject2 =
          ScriptEngineService.unsafeGetScriptGameObject(script2)
          |> StateLogicService.getEngineStateToGetData;

        (
          (script1, gameObject1, addedNodeId1, eventFunctionName1),
          (script2, gameObject2, addedNodeId2, eventFunctionName2),
        );
      };

      describe("test run", () => {
        test("should exec init event function", () => {
          _prepareWithNoWorkerJobRecord(
            _buildNoWorkerJobConfigOnlyWithUpdateScript(),
          );
          let (script, gameObject, addedNodeId, eventFunctionName) =
            _prepareOneScriptEventFunction();
          ScriptEventFunctionInspectorTool.updateEventFunctionData(
            addedNodeId,
            eventFunctionName,
            ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
              ~initFunc=
                Some(
                  (.
                    script,
                    api,
                    engineState: Wonderjs.StateDataMainType.state,
                  ) => {
                    engineState.arcballCameraControllerRecord = Obj.magic(-1);

                    engineState;
                  },
                ),
              (),
            ),
          );

          ControllerTool.run();

          StateEngineService.unsafeGetState().arcballCameraControllerRecord
          |> expect == Obj.magic(-1);
        });

        describe("test exec update event function", () => {
          test("loopBody should exec update event function", () => {
            _prepareWithNoWorkerJobRecord(
              _buildNoWorkerJobConfigOnlyWithUpdateScript(),
            );
            let (script, gameObject, addedNodeId, eventFunctionName) =
              _prepareOneScriptEventFunction();
            ScriptEventFunctionInspectorTool.updateEventFunctionData(
              addedNodeId,
              eventFunctionName,
              ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
                ~updateFunc=
                  Some(
                    (.
                      script,
                      api,
                      engineState: Wonderjs.StateDataMainType.state,
                    ) => {
                      engineState.arcballCameraControllerRecord =
                        Obj.magic(-1);

                      engineState;
                    },
                  ),
                (),
              ),
            );

            ControllerTool.run();
            LoopTool.getAndRefreshEngineStateForRunLoop();

            StateEngineService.unsafeGetState().arcballCameraControllerRecord
            |> expect == Obj.magic(-1);
          });

          test(
            {|test exec dispose event function:

           create script event function assets sef1, sef2;
           gameObject g1 add script component s1;
           gameObject g2 add script component s2;
           s1 add sef1;
           s2 add sef2;
           sef1->update: dispose g2;
           run;
           loop;

           should exec sef2->dispose;
            |},
            () => {
              _prepareWithNoWorkerJobRecord(
                _buildNoWorkerJobConfigWithDispose(),
              );
              let (
                (script1, gameObject1, addedNodeId1, eventFunctionName1),
                (script2, gameObject2, addedNodeId2, eventFunctionName2),
              ) =
                _prepareTwoScriptEventFunctions();
              let name1 = "gameObject1";
              let name2 = "gameObject2";
              StateEngineService.unsafeGetState()
              |> GameObjectEngineService.setGameObjectName(
                   name1,
                   gameObject1,
                 )
              |> GameObjectEngineService.setGameObjectName(
                   name2,
                   gameObject2,
                 )
              |> StateEngineService.setState
              |> ignore;
              ScriptEventFunctionInspectorTool.updateEventFunctionData(
                addedNodeId1,
                eventFunctionName1,
                ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
                  ~updateFunc=
                    Some(
                      (.
                        script,
                        api,
                        engineState: Wonderjs.StateDataMainType.state,
                      ) => {
                        let disposeGameObject = api##disposeGameObject;
                        let findGameObjectsByName = api##findGameObjectsByName;

                        let gameObject2 =
                          Array.unsafe_get(
                            findGameObjectsByName(.
                              "gameObject2",
                              engineState,
                            ),
                            0,
                          );

                        let engineState =
                          disposeGameObject(. gameObject2, engineState);

                        engineState;
                      },
                    ),
                  (),
                ),
              );
              ScriptEventFunctionInspectorTool.updateEventFunctionData(
                addedNodeId2,
                eventFunctionName2,
                ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
                  ~disposeFunc=
                    Some(
                      (.
                        script,
                        api,
                        engineState: Wonderjs.StateDataMainType.state,
                      ) => {
                        let unsafeGetGameObjectTransformComponent =
                          api##unsafeGetGameObjectTransformComponent;
                        let setTransformLocalPosition =
                          api##setTransformLocalPosition;
                        let findGameObjectsByName = api##findGameObjectsByName;

                        let gameObject1 =
                          Array.unsafe_get(
                            findGameObjectsByName(.
                              "gameObject1",
                              engineState,
                            ),
                            0,
                          );

                        let tran1 =
                          unsafeGetGameObjectTransformComponent(.
                            gameObject1,
                            engineState,
                          );

                        let engineState =
                          setTransformLocalPosition(.
                            tran1,
                            (1., 0., 0.),
                            engineState,
                          );

                        engineState;
                      },
                    ),
                  (),
                ),
              );

              ControllerTool.run();
              LoopTool.getAndRefreshEngineStateForRunLoop();

              let engineState = StateEngineService.unsafeGetState();

              TransformEngineService.getLocalPosition(
                GameObjectComponentEngineService.unsafeGetTransformComponent(
                  gameObject1,
                  engineState,
                ),
                engineState,
              )
              |> expect == (1.0, 0., 0.);
            },
          );
        });

        describe(
          "editor operation which exec loop shouldn't exec script event functions",
          () =>
          test("test leftHeader->dispose gameObject operation", () => {
            _prepareWithNoWorkerJobRecord(
              _buildNoWorkerJobConfigOnlyWithUpdateScript(),
            );
            let (script, gameObject, addedNodeId, eventFunctionName) =
              _prepareOneScriptEventFunction();
            ScriptEventFunctionInspectorTool.updateEventFunctionData(
              addedNodeId,
              eventFunctionName,
              ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
                ~updateFunc=
                  Some(
                    (.
                      script,
                      api,
                      engineState: Wonderjs.StateDataMainType.state,
                    ) => {
                      engineState.arcballCameraControllerRecord =
                        Obj.magic(-1);

                      engineState;
                    },
                  ),
                (),
              ),
            );

            ControllerTool.run();
            GameObjectTool.setCurrentSceneTreeNode(gameObject);
            MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

            StateEngineService.unsafeGetState().arcballCameraControllerRecord
            |> expect != Obj.magic(-1);
          })
        );
      });

      describe("test stop", () =>
        test("loopBody shouldn't exec update event function", () => {
          _prepareWithNoWorkerJobRecord(
            _buildNoWorkerJobConfigOnlyWithUpdateScript(),
          );
          let (script, gameObject, addedNodeId, eventFunctionName) =
            _prepareOneScriptEventFunction();
          ScriptEventFunctionInspectorTool.updateEventFunctionData(
            addedNodeId,
            eventFunctionName,
            ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
              ~updateFunc=
                Some(
                  (.
                    script,
                    api,
                    engineState: Wonderjs.StateDataMainType.state,
                  ) => {
                    engineState.arcballCameraControllerRecord = Obj.magic(-1);

                    engineState;
                  },
                ),
              (),
            ),
          );

          ControllerTool.run();
          ControllerTool.stop();
          DirectorToolEngine.runWithDefaultTimeEngineState();

          StateEngineService.unsafeGetState().arcballCameraControllerRecord
          |> expect !== Obj.magic(-1);
        })
      );

      describe("script api should update editor", () =>
        describe("test disposeGameObject api", () =>
          test("should update scene tree", () => {
            _prepareWithNoWorkerJobRecord(
              _buildNoWorkerJobConfigWithDispose(),
            );
            let (script, gameObject, addedNodeId, eventFunctionName) =
              _prepareOneScriptEventFunction();
            let name = "secondCube";
            let engineState = StateEngineService.unsafeGetState();
            engineState
            |> GameObjectEngineService.setGameObjectName(
                 name,
                 MainEditorSceneTool.getSecondCube(engineState),
               )
            |> StateEngineService.setState
            |> ignore;
            ScriptEventFunctionInspectorTool.updateEventFunctionData(
              addedNodeId,
              eventFunctionName,
              ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
                ~updateFunc=
                  Some(
                    (.
                      script,
                      api,
                      engineState: Wonderjs.StateDataMainType.state,
                    ) => {
                      let disposeGameObject = api##disposeGameObject;
                      let findGameObjectsByName = api##findGameObjectsByName;

                      let gameObjects =
                        findGameObjectsByName(. "secondCube", engineState);

                      let engineState =
                        switch (gameObjects |> Js.Array.length) {
                        | 0 => engineState
                        | _ =>
                          let secondCubeGameObject =
                            Array.unsafe_get(
                              findGameObjectsByName(.
                                "secondCube",
                                engineState,
                              ),
                              0,
                            );

                          disposeGameObject(.
                            secondCubeGameObject,
                            engineState,
                          );
                        };

                      engineState;
                    },
                  ),
                (),
              ),
            );
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);

            ControllerTool.run();
            LoopTool.getAndRefreshEngineStateForRunLoop();

            let engineState = StateEngineService.unsafeGetState();

            dispatchFuncStub
            |> withOneArg(
                 AppStore.UpdateAction(
                   Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
                 ),
               )
            |> getCallCount
            |> expect == 1;
          })
        )
      );
    });

    describe("test redo/undo engine engineState", () =>
      test(
        "stop should undo to the engineState which is copied before run", () => {
        _prepareWithNoWorkerJobRecord(
          _buildNoWorkerJobConfigOnlyWithUpdateScript(),
        );
        let (script, gameObject, addedNodeId, eventFunctionName) =
          _prepareOneScriptEventFunction();
        ScriptEventFunctionInspectorTool.updateEventFunctionData(
          addedNodeId,
          eventFunctionName,
          ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
            ~updateFunc=_buildUpdateEventFunctionSetLocalPosition1(),
            (),
          ),
        );

        ControllerTool.run();
        LoopTool.getAndRefreshEngineStateForRunLoop();
        ControllerTool.stop();

        let engineState = StateEngineService.unsafeGetState();
        TransformEngineService.getLocalPosition(
          GameObjectComponentEngineService.unsafeGetTransformComponent(
            gameObject,
            engineState,
          ),
          engineState,
        )
        |> expect == (0., 0., 0.);
      })
    );

    describe("hot reloading", () => {
      describe("support operate event function", () => {
        let _prepare = () => {
          _prepareWithNoWorkerJobRecord(
            _buildNoWorkerJobConfigOnlyWithUpdateScript(),
          );
          let (script, gameObject, addedNodeId, eventFunctionName) =
            _prepareOneScriptEventFunction();
          ScriptEventFunctionInspectorTool.updateEventFunctionData(
            addedNodeId,
            eventFunctionName,
            ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
              ~updateFunc=_buildUpdateEventFunctionSetLocalPosition1(),
              (),
            ),
          );

          (script, gameObject, addedNodeId, eventFunctionName);
        };

        describe("support change event function when run", () =>
          test("test", () => {
            let (script, gameObject, addedNodeId, eventFunctionName) =
              _prepare();

            ControllerTool.run();
            LoopTool.getAndRefreshEngineStateForRunLoop();
            ScriptEventFunctionInspectorTool.updateEventFunctionData(
              addedNodeId,
              eventFunctionName,
              ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
                ~updateFunc=_buildUpdateEventFunctionSetLocalPosition2(),
                (),
              ),
            );
            LoopTool.getAndRefreshEngineStateForRunLoop();

            let engineState = StateEngineService.unsafeGetState();
            TransformEngineService.getLocalPosition(
              GameObjectComponentEngineService.unsafeGetTransformComponent(
                gameObject,
                engineState,
              ),
              engineState,
            )
            |> expect == (2., 0., 0.);
          })
        );

        describe("support remove event function when run", () =>
          test("test", () => {
            let (script, gameObject, addedNodeId, eventFunctionName) =
              _prepare();

            ControllerTool.run();
            LoopTool.getAndRefreshEngineStateForRunLoop();
            MainEditorAssetHeaderOperateNodeTool.removeScriptEventFunctionNode(
              ~scriptEventFunctionNodeId=addedNodeId,
              (),
            );
            LoopTool.getAndRefreshEngineStateForRunLoop();

            let engineState = StateEngineService.unsafeGetState();
            TransformEngineService.getLocalPosition(
              GameObjectComponentEngineService.unsafeGetTransformComponent(
                gameObject,
                engineState,
              ),
              engineState,
            )
            |> expect == (1., 0., 0.);
          })
        );
      });

      describe("support operate attribute", () => {
        let _prepare = () => {
          _prepareWithNoWorkerJobRecord(
            _buildNoWorkerJobConfigOnlyWithUpdateScript(),
          );
          let (
            script,
            gameObject,
            addedEventFunctionNodeId,
            eventFunctionName,
          ) =
            _prepareOneScriptEventFunction();

          let addedAttributeNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addScriptAttribute();
          ScriptAttributeInspectorTool.addDefaultField(
            ~sandbox,
            ~nodeId=addedAttributeNodeId,
            (),
          );
          let (fieldName, field) =
            ScriptAttributeInspectorTool.getAttributeEntries(
              addedAttributeNodeId,
            )
            |> StateLogicService.getEditorState
            |> ArrayService.unsafeGetFirst;
          let newFieldName = "speed";
          ScriptAttributeInspectorTool.renameField(
            ~sandbox,
            ~nodeId=addedAttributeNodeId,
            ~oldName=fieldName,
            ~newName=newFieldName,
            (),
          );
          let attributeName =
            ScriptAttributeInspectorTool.getAttributeName(
              addedAttributeNodeId,
            )
            |> StateLogicService.getEngineStateToGetData;
          let attribute =
            ScriptAttributeInspectorTool.getAttribute(addedAttributeNodeId)
            |> StateLogicService.getEngineStateToGetData;

          MainEditorScriptAttributeTool.addScriptAttribute(
            ~script,
            ~send=SinonTool.createOneLengthStub(sandbox^),
            (),
          );

          ScriptEventFunctionInspectorTool.updateEventFunctionData(
            addedEventFunctionNodeId,
            eventFunctionName,
            ScriptEventFunctionInspectorTool.buildEventFunctionDataJsObjStr(
              ~updateFunc=
                Some(
                  (.
                    script,
                    api,
                    engineState: Wonderjs.StateDataMainType.state,
                  ) => {
                    let unsafeGetGameObjectTransformComponent =
                      api##unsafeGetGameObjectTransformComponent;
                    let setTransformLocalPosition =
                      api##setTransformLocalPosition;
                    let unsafeGetScriptGameObject =
                      api##unsafeGetScriptGameObject;

                    let unsafeGetScriptAttribute =
                      api##unsafeGetScriptAttribute;

                    let scriptAttributeName = "New Script Attribute";

                    let scriptAttribute =
                      unsafeGetScriptAttribute(.
                        script,
                        scriptAttributeName,
                        engineState,
                      );

                    let unsafeGetScriptAttributeFieldValue =
                      api##unsafeGetScriptAttributeFieldValue;

                    let speed =
                      unsafeGetScriptAttributeFieldValue(.
                        "speed",
                        scriptAttribute,
                      )
                      |> Obj.magic;

                    let gameObject =
                      unsafeGetScriptGameObject(. script, engineState);

                    let tran =
                      unsafeGetGameObjectTransformComponent(.
                        gameObject,
                        engineState,
                      );

                    let engineState =
                      setTransformLocalPosition(.
                        tran,
                        (speed, 0., 0.),
                        engineState,
                      );

                    engineState;
                  },
                ),
              (),
            ),
          );

          (
            script,
            attributeName,
            newFieldName,
            attribute,
            gameObject,
            addedAttributeNodeId,
          );
        };

        describe(
          "support change attribute->default value(will change value too) when run",
          () =>
          test("test", () => {
            let (
              script,
              attributeName,
              newFieldName,
              attribute,
              gameObject,
              addedAttributeNodeId,
            ) =
              _prepare();

            ControllerTool.run();
            LoopTool.getAndRefreshEngineStateForRunLoop();
            let newDefaultValue = 10.0;
            MainEditorScriptAttributeTool.changeScriptAttributeFieldDefaultValue(
              script,
              attributeName,
              newFieldName,
              attribute,
              newDefaultValue,
            )
            |> StateLogicService.getAndSetEngineState;

            LoopTool.getAndRefreshEngineStateForRunLoop();

            let engineState = StateEngineService.unsafeGetState();
            TransformEngineService.getLocalPosition(
              GameObjectComponentEngineService.unsafeGetTransformComponent(
                gameObject,
                engineState,
              ),
              engineState,
            )
            |> expect == (newDefaultValue, 0., 0.);
          })
        );

        describe("support remove attribute when run", () =>
          test("if event function used attribute is removed, error", () => {
            let errorStub = ConsoleTool.stubError(~sandbox, ());
            let (
              script,
              attributeName,
              newFieldName,
              attribute,
              gameObject,
              addedAttributeNodeId,
            ) =
              _prepare();

            ControllerTool.run();
            LoopTool.getAndRefreshEngineStateForRunLoop();
            MainEditorAssetHeaderOperateNodeTool.removeScriptAttributeNode(
              ~scriptAttributeNodeId=addedAttributeNodeId,
              (),
            );

            LoopTool.getAndRefreshEngineStateForRunLoop();

            ConsoleTool.judgeError(
              "expect data exist(get by getExn), but actual not",
              errorStub,
            );
          })
        );
      });
    });
  });