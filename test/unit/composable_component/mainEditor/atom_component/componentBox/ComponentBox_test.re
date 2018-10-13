open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("componentBox", () => {
    let sandbox = getSandboxDefaultVal();

    let _buildComponentBoxComponent =
        (header, type_, isDisposable, gameObject) =>
      ReactTestRenderer.create(
        <ComponentBox
          reduxTuple=(TestTool.buildEmptyAppState(), TestTool.getDispatch())
          header
          isDisposable
          isShowComponent=true
          type_
          gameObject
          gameObjectUIComponent={
            <div> (DomHelper.textEl("simulate div component")) </div>
          }
        />,
      );
    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test component arguments", () => {
      test(
        "build componentBox component which can't be disposed should has no 'x'",
        () =>
        _buildComponentBoxComponent(
          "newBox",
          InspectorComponentType.Transform,
          false,
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      test("build disposable componentBox component should has 'x'", () =>
        _buildComponentBoxComponent(
          "newBox",
          InspectorComponentType.Transform,
          true,
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
    });

    describe("test show component workflow", () =>
      describe(
        "test click triangle once to hide the common type component", () =>
        test(
          "test click close first box transform component, the component should be close",
          () => {
            open ComponentBox;

            let dispatchFunc = createEmptyStubWithJsObjSandbox(sandbox);

            let state = {isShowComponent: true, triangleDirection: ""};

            let componentType = InspectorComponentType.Transform;

            ComponentBox.reducer(
              (TestTool.buildEmptyAppState(), dispatchFunc),
              componentType,
              ToggleShowComponent,
              state,
            );

            let dispatchedAction =
              dispatchFunc |> getCall(0) |> getArgs |> List.hd;

            switch (dispatchedAction) {
            | AppStore.InspectorAction(action) =>
              switch (action) {
              | SetShowComponent(type_, value) =>
                (type_, value)
                |>
                expect == (
                            componentType
                            |> InspectorComponentType.convertComponentTypeToInt,
                            false,
                          )
              }
            };
          },
        )
      )
    );
  });