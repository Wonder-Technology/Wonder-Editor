let serializeFunction = Wonderjs.SerializeService.serializeFunction;

let deserializeFunction = Wonderjs.SerializeService.deserializeFunction;

let serializeValueWithFunction = Wonderjs.SerializeService.serializeValueWithFunction;

let deserializeValueWithFunction = Wonderjs.SerializeService.deserializeValueWithFunction;

let serializeHashMap = [%raw
  hashMap => {|
    return JSON.stringify(hashMap);
    |}
];

let deserializeHashMap = [%raw
  hashMapStr => {|
    return JSON.parse(hashMapStr);
    |}
];