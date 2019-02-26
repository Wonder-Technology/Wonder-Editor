let isString = [%bs.raw
  str => {|
    return Object.prototype.toString.call(str).toLowerCase() === "[object string]";
    |}
];