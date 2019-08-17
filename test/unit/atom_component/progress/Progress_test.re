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
      test("test snapshot", () =>
        _buildProgressComponent() |> ReactTestTool.createSnapshotAndMatch
      );

      describe("test didMount", () => {
        test("bind change percent event", () => {
          let send = ProgressTool.didMount(sandbox);

          StateEditorService.getEventEngineState()
          |> ProgressUtils.changePercent(10)
          |> StateEditorService.setEventEngineState
          |> ignore;

          send |> expect |> toCalledWith([|Progress.ChangePercent(10)|]);
        });
        test("bind show event", () => {
          let send = ProgressTool.didMount(sandbox);

          StateEditorService.getEventEngineState()
          |> ProgressUtils.show
          |> StateEditorService.setEventEngineState
          |> ignore;

          send |> expect |> toCalledWith([|Progress.Show|]);
        });
        test("bind hide event", () => {
          let send = ProgressTool.didMount(sandbox);

          StateEditorService.getEventEngineState()
          |> ProgressUtils.show
          |> StateEditorService.setEventEngineState
          |> ignore;

          send |> expect |> toCalledWith([|Progress.Show|]);
        });
      });

      describe("test willUnmount", () =>
        describe("off custom global event", () =>
          test("test off hide event", () => {
            let send = ProgressTool.didMount(sandbox);
            ProgressTool.willUnmount();

            StateEditorService.getEventEngineState()
            |> ProgressUtils.show
            |> StateEditorService.setEventEngineState
            |> ignore;

            send |> expect |> not_ |> toCalledWith([|Progress.Show|]);
          })
        )
      );
    });
  });