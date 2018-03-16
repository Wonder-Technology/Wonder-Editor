type window;

[@bs.val] external window : Js.t({..}) = "global";

let buildFakeLocalStorage = () => {
  let fakeLocalStorage = WonderCommonlib.HashMapService.createEmpty();
  window##localStorage#=fakeLocalStorage
};

let getExtensionTestKey = () => "databaseTest";
