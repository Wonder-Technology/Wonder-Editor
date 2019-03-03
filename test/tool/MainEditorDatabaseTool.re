type window;

[@bs.val] external window: Js.t({..}) = "global";

let buildFakeLocalStorage = () => {
  let fakeLocalStorage = WonderCommonlib.MutableHashMapService.createEmpty();

  window##_localStorage #= fakeLocalStorage;
};

let getExtensionTestKey = () => "databaseTest";