open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "PanelExtension ui component",
    (_) => {
      test(
        "accord to user json data, build component",
        (_) => {
          let component =
            ReactTestRenderer.create(
              ExtensionToolUI.buildSpecificExtesion("App", ExtensionToolUI.extensionText, 0)
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      test(
        "if the parent is different from the one specified in extensionText, don't render",
        (_) => {
          let component =
            ReactTestRenderer.create(
              ExtensionToolUI.buildSpecificExtesion("MainEditor", ExtensionToolUI.extensionText, 0)
            );
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      )
    }
  );