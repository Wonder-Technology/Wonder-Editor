let setTimeout = [%bs.raw
  {|
    function(func, time){
        setTimeout(func, time)
    }
  |}
];