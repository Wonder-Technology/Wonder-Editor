open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "panel extension component",
    (_) => {
      test(
        "accord to user json data, build component",
        (_) => {
          let component =
            ReactTestRenderer.create(
              ExtensionTool.buildSpecificExtesion("App", ExtensionTool.extensionText, 0)
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "the extensionText specific parent is App,if not, don't render",
        (_) => {
          let component =
            ReactTestRenderer.create(
              ExtensionTool.buildSpecificExtesion("MainEditor", ExtensionTool.extensionText, 0)
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
    }
  );