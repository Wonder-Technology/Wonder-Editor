open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AssetTreeInspector", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare currentSelectSource", () => {
      let _triggerClickAssetNode = (component, index) =>
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeNode(index),
        );
      let _triggerClickAssetChildrenNode = (component, index) =>
        BaseEventTool.triggerComponentEvent(
          component,
          AssetTreeEventTool.clickAssetTreeChildrenNode(index),
        );
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree(
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot,
          ),
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.Asset,
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test component snapshot", () => {
        test("if hasn't current node, show nothing", () =>
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch
        );

        describe("else", () => {
          beforeEach(() =>
            StateAssetService.getState()
            |> CurrentNodeDataAssetService.clearCurrentNodeData
            |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
            |> StateAssetService.setState
            |> ignore
          );
          testPromise("test set folder to be current node", () => {
            let fakeDom =
              EventListenerTool.buildFakeDom()
              |> EventListenerTool.stubGetElementByIdReturnFakeDom;

            BuildComponentTool.buildAssetChildrenNode(10);

            EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
            Js.Promise.make((~resolve, ~reject) =>
              Timeout.setTimeout(
                () => {
                  EventListenerTool.triggerEvent(fakeDom, "mousedown", {});
                  switch (
                    StateAssetService.getState()
                    |> CurrentNodeDataAssetService.getCurrentNodeData
                  ) {
                  | None => reject(. "fail" |> Obj.magic)
                  | Some(file) =>
                    resolve(.
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig(),
                      )
                      |> ReactTestTool.createSnapshotAndMatch,
                    )
                  };
                },
                20,
              )
            );
          });

          test("test set texture to be current node", () => {
            _triggerClickAssetChildrenNode(
              BuildComponentTool.buildAssetComponent(),
              2,
            );
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("test set json to be current node", () => {
            _triggerClickAssetChildrenNode(
              BuildComponentTool.buildAssetComponent(),
              3,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });

      describe("test node rename", () => {
        let _triggerInspectorRenameEvent = (inspectorComponent, newName) => {
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            AssetTreeInspectorTool.triggerRenameChangeEvent(newName),
          );
          BaseEventTool.triggerComponentEvent(
            inspectorComponent,
            AssetTreeInspectorTool.triggerRenameBlurEvent(newName),
          );
        };
        beforeEach(() =>
          StateAssetService.getState()
          |> CurrentNodeDataAssetService.clearCurrentNodeData
          |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
          |> StateAssetService.setState
          |> ignore
        );
        test("test rename to specific name", () => {
          _triggerClickAssetNode(BuildComponentTool.buildAssetComponent(), 2);

          let inspectorComponent =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );

          _triggerInspectorRenameEvent(inspectorComponent, "mickeyFolder");

          inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("test the root folder can't be rename", () =>
          test("the root treeNode->rename-input->disabled should be true", () => {
            BaseEventTool.triggerComponentEvent(
              BuildComponentTool.buildAssetComponent(),
              AssetTreeEventTool.clickRootAssetTreeNode,
            );
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
        describe("test rename asset tree children node", () =>
          describe("if node has ext name", () => {
            test("rename input shouldn't show it", () => {
              _triggerClickAssetChildrenNode(
                BuildComponentTool.buildAssetComponent(),
                3,
              );
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            test("if rename success, the newName should include ext name", () => {
              _triggerClickAssetChildrenNode(
                BuildComponentTool.buildAssetComponent(),
                3,
              );
              _triggerInspectorRenameEvent(
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildEmptyAppState(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                ),
                "mickey_json",
              );

              BuildComponentTool.buildAssetComponent()
              |> ReactTestTool.createSnapshotAndMatch;
            });
          })
        );
        describe("deal with specific case", () =>
          test(
            "key in '', trigger onBlur, the input value should be original name",
            () => {
            _triggerClickAssetNode(
              BuildComponentTool.buildAssetComponent(),
              2,
            );
            let inspectorComponent =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            _triggerInspectorRenameEvent(inspectorComponent, "");

            inspectorComponent |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      });
    });
  });