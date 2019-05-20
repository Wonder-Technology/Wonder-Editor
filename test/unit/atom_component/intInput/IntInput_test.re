open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open InputType;

open IntInput;

let _ =
  describe("IntInput", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test IntInput component set int value", () => {
      let _test = (value, onChangeValue, onBlurValue) => {
        let state = {inputValue: Some(value), isDragStart: false};

        let onChangeFunc = SinonTool.createOneLengthStub(sandbox^);
        let onBlurFunc = SinonTool.createOneLengthStub(sandbox^);

        let state =
          IntInput.reducer(
            (onChangeFunc, onBlurFunc),
            Change(Some(value)),
            state,
          )
          |> ReactTool.getUpdateState;

        let state =
          IntInput.reducer((onChangeFunc, onBlurFunc), Blur, state);

        (
          onChangeFunc |> getCallCount,
          onBlurFunc |> getCallCount,
          onChangeFunc |> SinonTool.calledWith(_, onChangeValue),
          onBlurFunc |> SinonTool.calledWith(_, onBlurValue),
        )
        |> expect == (1, 1, true, true);
      };

      test("can set any int value", () =>
        _test("351687", 351687, 351687)
      );
    });

    describe("test drag header to change value", () => {
      let _buildFakeEvent = (~movementX=0, ~movementY=0, ~sandbox, ()) =>
        {
          "target": {
            "requestPointerLock": SinonTool.createOneLengthStub(sandbox^),
          },
          "movementX": movementX,
          "movementY": movementY,
        }
        |> Obj.magic;

      describe("test drag start", () => {
        test("request target pointerLock", () => {
          let send = SinonTool.createOneLengthStub(sandbox^);
          let event = _buildFakeEvent(~sandbox, ());

          IntInput.Method.handleDragStart(event, send);

          event##target##requestPointerLock |> expect |> toCalledOnce;
        });
        describe("send DragStart", () => {
          test("test send", () => {
            let send = SinonTool.createOneLengthStub(sandbox^);
            let event = _buildFakeEvent(~sandbox, ());

            IntInput.Method.handleDragStart(event, send);

            send |> expect |> toCalledWith([|DragStart|]);
          });
          test("set state->isDragStart to true", () => {
            let state = {inputValue: Some("0"), isDragStart: false};

            let state =
              IntInput.reducer((None, None), DragStart, state)
              |> ReactTool.getUpdateState;

            state.isDragStart |> expect == true;
          });
        });
      });

      describe("test drag over", () => {
        test("if not drag start, do nothing", () => {
          let send = SinonTool.createOneLengthStub(sandbox^);
          let event = _buildFakeEvent(~sandbox, ());
          let state = {inputValue: Some("0"), isDragStart: false};

          IntInput.Method.handleDragOver(event, (send, state));

          send |> expect |> not_ |> toCalled;
        });

        describe("else", () => {
          let _getNewValue = send => send |> getCall(0) |> getArgs |> List.hd;

          let _testChangeValue =
              (~movementX, ~movementY, ~targetValue, ~inputValue="0", ()) => {
            let send = SinonTool.createOneLengthStub(sandbox^);
            let event = _buildFakeEvent(~sandbox, ~movementX, ~movementY, ());
            let state = {inputValue: Some(inputValue), isDragStart: true};

            IntInput.Method.handleDragOver(event, (send, state));

            _getNewValue(send) |> expect == Change(Some(targetValue));
          };

          test("if mouse move up, increase value", () =>
            _testChangeValue(
              ~movementX=0,
              ~movementY=-2,
              ~targetValue="2",
              (),
            )
          );
          test("if mouse move right, increase value", () =>
            _testChangeValue(~movementX=2, ~movementY=0, ~targetValue="2", ())
          );
          test("if mouse move down, decrease value", () =>
            _testChangeValue(
              ~movementX=0,
              ~movementY=2,
              ~targetValue="-2",
              (),
            )
          );
          test("if mouse move left, decrease value", () =>
            _testChangeValue(
              ~movementX=-2,
              ~movementY=0,
              ~targetValue="-2",
              (),
            )
          );

          test("if change value to nearly zero", () =>
            _testChangeValue(
              ~movementX=-2,
              ~movementY=0,
              ~inputValue="2",
              ~targetValue="0",
              (),
            )
          );
        });
      });

      describe("test drag drop", () => {
        let _handleDragDrop =
            (
              ~send,
              ~state,
              ~event=_buildFakeEvent(~sandbox, ()),
              ~onDragDrop=SinonTool.createOneLengthStub(sandbox^),
              (),
            ) =>
          IntInput.Method.handleDragDrop(event, (send, state), onDragDrop);

        describe("if not drag start", () =>
          test("not exec onDragDrop", () => {
            let onDragDrop = SinonTool.createOneLengthStub(sandbox^);
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = {inputValue: Some("0"), isDragStart: false};

            _handleDragDrop(~send, ~state, ~onDragDrop, ());

            onDragDrop |> expect |> not_ |> toCalled;
          })
        );

        describe("else", () => {
          let document = ref(Obj.magic(-1));

          let _prepareDocument = [%raw
            sandbox => {|
              document.exitPointerLock = sandbox.stub();

              return document;
            |}
          ];

          beforeEach(() => document := _prepareDocument(sandbox^));

          test("exec onDragDrop", () => {
            let onDragDrop = SinonTool.createOneLengthStub(sandbox^);
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = {inputValue: Some("0"), isDragStart: true};

            _handleDragDrop(~send, ~state, ~onDragDrop, ());

            onDragDrop |> expect |> toCalledOnce;
          });
          test("exit pointer lock", () => {
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = {inputValue: Some("0"), isDragStart: true};

            _handleDragDrop(~send, ~state, ());

            Obj.magic(document^)##exitPointerLock |> expect |> toCalledOnce;
          });
          test("send DragDrop", () => {
            let send = SinonTool.createOneLengthStub(sandbox^);
            let state = {inputValue: Some("0"), isDragStart: true};

            _handleDragDrop(~send, ~state, ());

            send |> expect |> toCalledWith([|DragDrop|]);
          });
        });
      });
    });
  });