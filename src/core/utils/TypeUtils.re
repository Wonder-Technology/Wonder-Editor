let isString = [%raw
  param => {|
    return Object.prototype.toString.call(param).toLowerCase() === "[object string]";
    |}
];