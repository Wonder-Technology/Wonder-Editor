open Jest;

let _ =
  describe(
    "test hehe",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeAll(() => sandbox := createSandbox());
      afterAll(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "test pass one string to empty stub",
        () => {
          let stub = createEmptyStub(refJsObjToSandbox(sandbox^));
          let func = (f) => [@bs] f("fa");
          func(stub);
          getCall(stub, 0) |> getArgsFromEmptyStub |> expect == ["fa"]
        }
      );
      test(
        "test1",
        () => {
          let stub = createEmptyStub(refJsObjToSandbox(sandbox^));
          /* 这里必须使用[@bs] 包围住高阶函数,不让他进行curry */
          let func = (f) => [@bs] f("fa", "mm");
          func(stub);
          getCall(stub, 0) |> getArgsFromEmptyStub |> expect == ["fa", "mm"]
        }
      );
      test(
        "test2",
        () => {
          let obj = {"func": (x, y) => x + y};
          let stub = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func");
          let func = obj##func;
          func(1, 2);
          getCall(stub, 0) |> getArgs |> expect == [1, 2]
        }
      );
      describe(
        "test extended sinon matcher for jest",
        () => {
          test(
            "test toCalledWith",
            () => {
              let obj = {"func": (x, y) => x + y};
              let stub = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func");
              let func = obj##func;
              func(1, 2);
              func(2, 2);
              getCall(stub, 0) |> expect |> toCalledWith([1, 2]);
              getCall(stub, 1) |> expect |> toCalledWith([2, 2])
            }
          );
          test(
            "test toCalledBefore",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let stub2 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func2");
              let func = obj##func1;
              func(1, 2);
              let func = obj##func2;
              func(2, 3);
              expect(stub1) |> toCalledBefore(stub2)
            }
          );
          test(
            "test toCalledAfter",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let stub2 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func2");
              let func = obj##func1;
              func(1, 2);
              let func = obj##func2;
              func(2, 3);
              expect(stub2) |> toCalledAfter(stub1)
            }
          );
          test(
            "test toCalled",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let func = obj##func1;
              func(1, 2);

              expect(stub1) |> toCalled;
            }
          );
          test(
            "test toCalledOnce",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let func = obj##func1;
              func(1, 2);

              expect(stub1) |> toCalledOnce;
            }
          );
          test(
            "test toCalledTwice",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let func = obj##func1;
              func(1, 2);
              expect(stub1) |> toCalledOnce;

              func(2,3);
              expect(stub1) |> toCalledTwice;
            }
          );
          test(
            "test toCalledCount",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let stub2 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func2");
              let func = obj##func1;
              func(1, 2);
              func(3, 4);
              let func = obj##func2;
              func(2, 3);

              getCallCount(stub1) |> expect == 2;
              getCallCount(stub2) |> expect == 1;
            }
          );
        }
      )
    }
  );