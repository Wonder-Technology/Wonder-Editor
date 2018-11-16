open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test Store->SceneGraph", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test(
      {|
            1.add cube;

            store->sceneGraphData should only has one cube
            |},
      () => {
        let newGameObject = GameObjectTool.getNewGameObjectUid();
        let store = TestTool.buildAppStateSceneGraphFromEngine();

        MainEditorSceneTreeHeaderTool.addCube(~store, ());

        let engineState = StateEngineService.unsafeGetState();
        let store =
          store
          |> StoreTool.setSceneGraphData(
               SceneGraphUtils.buildTreeNode(newGameObject, engineState)
               |> SceneGraphUtils.addTreeNodeSceneGraphData(
                    _,
                    SceneEngineService.getSceneGameObject(engineState),
                    store |> StoreUtils.unsafeGetSceneGraphDataFromStore,
                    engineState,
                  ),
             );

        let {children}: SceneGraphType.sceneTreeNodeType =
          StoreTool.unsafeGetSceneGraphData(store)
          |> ArrayService.unsafeGetFirst;

        children |> Js.Array.length |> expect == 1;
      },
    );
  });