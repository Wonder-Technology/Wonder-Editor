open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

open Js.Promise;

let _ =
  describe("MainEditorGeometry component", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode", () => {
      describe("test change geometry", () => {
        describe("test snapshot", () => {
          test("test show select geometry group widget", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            let component =
              BuildComponentTool.buildGeometry(
                TestTool.buildEmptyAppState(),
                currentGameObjectGeometry,
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.triggerClickShowGeometryGroup,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("test hide select geometry group widget", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            let component =
              BuildComponentTool.buildGeometry(
                TestTool.buildEmptyAppState(),
                currentGameObjectGeometry,
              );

            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.triggerClickShowGeometryGroup,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              MainEditorGeometryTool.triggerClickHideGeometryGroup,
            );

            component |> ReactTestTool.createSnapshotAndMatch;
          });
        });

        describe("test logic", () => {
          test("test the current gameObject geometry should is Cube", () => {
            let currentGameObjectGeometry =
              GameObjectTool.getCurrentGameObjectGeometry();

            GeometryEngineService.unsafeGetGeometryName(
              currentGameObjectGeometry,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == MainEditorGeometryTool.getCubeGeometryName();

          });
          test(
            "test change geometry to be Sphere, the current gameObject geometry should is Sphere",
            () => {
              let component =
                BuildComponentTool.buildGeometry(
                  TestTool.buildEmptyAppState(),
                  GameObjectTool.getCurrentGameObjectGeometry(),
                );

              BaseEventTool.triggerComponentEvent(
                component,
                MainEditorGeometryTool.triggerClickShowGeometryGroup,
              );

              BaseEventTool.triggerComponentEvent(
                component,
                MainEditorGeometryTool.getSphereDomIndex()
                |> MainEditorGeometryTool.triggerClickSpecificGeometry,
              );

              let newGameObjectGeometry =
                GameObjectTool.getCurrentGameObjectGeometry();

              GeometryEngineService.unsafeGetGeometryName(
                newGameObjectGeometry,
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == MainEditorGeometryTool.getSphereGeometryName();
            },
          );
        });
      });

      describe("test load asset wdb", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeFileReader();
          MainEditorAssetTool.buildFakeImage();

          MainEditorAssetHeaderWDBTool.buildFakeTextDecoder(
            MainEditorAssetHeaderWDBTool.convertUint8ArrayToBuffer,
          );
          MainEditorAssetHeaderWDBTool.buildFakeURL(sandbox^);

          MainEditorAssetHeaderWDBTool.buildFakeLoadImage(.);
        });

        testPromise(
          "test select geometry group widget should show all geometry", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let fileName = "BoxTextured";
          let newWdbArrayBuffer =
            MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

          MainEditorAssetTool.fileLoad(
            TestTool.getDispatch(),
            BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
          )
          |> then_(_ => {
               let currentGameObjectGeometry =
                 GameObjectTool.getCurrentGameObjectGeometry();

               let component =
                 BuildComponentTool.buildGeometry(
                   TestTool.buildEmptyAppState(),
                   currentGameObjectGeometry,
                 );

               BaseEventTool.triggerComponentEvent(
                 component,
                 MainEditorGeometryTool.triggerClickShowGeometryGroup,
               );

               component |> ReactTestTool.createSnapshotAndMatch |> resolve;
             });
        });
        testPromise("test set new geometry should set into engineState", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let fileName = "BoxTextured";
          let newWdbArrayBuffer =
            MainEditorAssetHeaderWDBTool.getWDBArrayBuffer(fileName);

          MainEditorAssetTool.fileLoad(
            TestTool.getDispatch(),
            BaseEventTool.buildWdbFileEvent(fileName, newWdbArrayBuffer),
          )
          |> then_(_ => {
               let oldGameObjectGeometry =
                 GameObjectTool.getCurrentGameObjectGeometry();

               let component =
                 BuildComponentTool.buildGeometry(
                   TestTool.buildEmptyAppState(),
                   oldGameObjectGeometry,
                 );

               BaseEventTool.triggerComponentEvent(
                 component,
                 MainEditorGeometryTool.triggerClickShowGeometryGroup,
               );

               BaseEventTool.triggerComponentEvent(
                 component,
                 MainEditorGeometryTool.getFirstNewGeometryDomIndex()
                 |> MainEditorGeometryTool.triggerClickSpecificGeometry,
               );

               let newGameObjectGeometry =
                 GameObjectTool.getCurrentGameObjectGeometry();

               GeometryEngineService.unsafeGetGeometryName(
                 newGameObjectGeometry,
               )
               |> StateLogicService.getEngineStateToGetData
               |> expect == MainEditorGeometryTool.getBoxTextureGeometryName()
               |> resolve;
             });
        });
      });
    });
  });