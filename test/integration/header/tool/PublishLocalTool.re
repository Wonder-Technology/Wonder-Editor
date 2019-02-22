open Sinon;

open Js.Typed_array;

open Js.Promise;

let getFetchPackageContentWithoutAssetCountWithDefault = () => 12;

let exportScene = (editorState, engineState) =>
  HeaderPublishLocalUtils.Publish._generateSceneWDB(editorState, engineState);