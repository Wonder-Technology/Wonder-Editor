let serializeFunction = Wonderjs.SerializeService.serializeFunction;

let deserializeFunction = Wonderjs.SerializeService.deserializeFunction;

let serializeValueWithFunction = Wonderjs.SerializeService.serializeValueWithFunction;

let deserializeValueWithFunction = Wonderjs.SerializeService.deserializeValueWithFunction;

let serializeHashMap = hashMap => [%raw
  {|
    return JSON.stringify(hashMap);
    |}
];

let deserializeHashMap = hashMapStr => [%raw
  {|
    return JSON.parse(hashMapStr);
    |}
];