let make = array => array;

let isNotEmpty = [%bs.raw
  {|
        function (item ){
            return item != undefined && item != null;
        }
    |}
];