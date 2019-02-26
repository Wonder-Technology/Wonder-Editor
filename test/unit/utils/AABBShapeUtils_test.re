open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Typed_array;

open ShapeType;

let _ =
  describe("AABBShapeUtils", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("setFromAllPointsAndLocalToWolrdMatrices", () =>
      test("build aabb of all points", () => {
        let aabb =
          AABBShapeUtils.setFromAllPointsAndLocalToWolrdMatrices([|
            (
              Float32Array.make([|1., 1., 1.|]),
              Wonderjs.Matrix4Service.createIdentityMatrix4()
              |> Wonderjs.Matrix4Service.fromTranslation((2., 0., 0.)),
            ),
            (
              Float32Array.make([|(-1.), 1., 1.|]),
              Wonderjs.Matrix4Service.createIdentityMatrix4()
              |> Wonderjs.Matrix4Service.fromTranslation(((-2.), 0., 0.)),
            ),
          |]);

        aabb |> expect == {min: ((-3.), 1., 1.), max: (3., 1., 1.)};
      })
    );
  });