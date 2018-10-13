open Wonder_jest;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open AssetTreeNodeType;

open AssetNodeType;

open MainEditorBottomComponents;

let _ =
  describe("MainEditorBottomComponents", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
      ();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test should update", () => {
      test("if reatinedProps updateTypeArr include All, should update", () =>
        shouldUpdate(
          OldNewSelfTool.buildNewSelf({
            updateTypeArr: [|UpdateStore.All|] |> Obj.magic,
          }),
        )
        |> expect == true
      );
      test(
        "else if reatinedProps updateTypeArr include BottomComponent, should update", () =>
        shouldUpdate(
          OldNewSelfTool.buildNewSelf({
            updateTypeArr: [|UpdateStore.BottomComponent|] |> Obj.magic,
          }),
        )
        |> expect == true
      );
      test("else, should not update", () =>
        shouldUpdate(
          OldNewSelfTool.buildNewSelf({
            updateTypeArr: [|UpdateStore.SceneTree|] |> Obj.magic,
          }),
        )
        |> expect == false
      );
    });
  });