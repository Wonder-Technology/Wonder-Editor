open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("Progress component", () => {
    let sandbox = getSandboxDefaultVal();

    let _buildProgressComponent = () =>
      ReactTestRenderer.create(<Progress />);

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test progress component", () => {
      let _buildFakeProgressDom = (~display="flex", ()) => {
        "style": {
          "display": display,
        },
      };

      test("test snapshot", () =>
        _buildProgressComponent() |> ReactTestTool.createSnapshotAndMatch
      );

      describe("operate progress visible", () => {
        let progressDom = ref(Obj.magic(-1));

        beforeEach(() => {
          _buildProgressComponent();
          progressDom := _buildFakeProgressDom(~display="flex", ());
          DomTool.stubFakeDomForQuerySelector(
            sandbox,
            "wonder-progress",
            progressDom^,
          );
        });

        describe("show progress", () =>
          test("show progress dom", () => {
            ProgressUtils.hide |> StateLogicService.getAndSetEngineState;
            ProgressUtils.show |> StateLogicService.getAndSetEngineState;

            (progressDom^)##style##display |> expect == "flex";
          })
        );

        describe("hide progress", () =>
          test("hide progress dom", () => {
            ProgressUtils.hide |> StateLogicService.getAndSetEngineState;

            (progressDom^)##style##display |> expect == "none";
          })
        );

        test("if percent === 100, hide progress", () => {
          ProgressUtils.changePercent(100)
          |> StateLogicService.getAndSetEngineState;

          (progressDom^)##style##display |> expect == "none";
        });
        test("if finish, hide progress", () => {
          ProgressUtils.finish |> StateLogicService.getAndSetEngineState;

          (progressDom^)##style##display |> expect == "none";
        });
      });

      describe("test off custom global event in willUnmount", () => {
        let progressDom = ref(Obj.magic(-1));

        beforeEach(() => {
          _buildProgressComponent();
          progressDom := _buildFakeProgressDom(~display="flex", ());
          DomTool.stubFakeDomForQuerySelector(
            sandbox,
            "wonder-progress",
            progressDom^,
          );
        });

        test("test off hide event", () => {
          _buildProgressComponent();

          Progress.Method.willUnmount();

          ProgressUtils.hide |> StateLogicService.getAndSetEngineState;

          (progressDom^)##style##display |> expect == "flex";
        });
      });
    });
  });