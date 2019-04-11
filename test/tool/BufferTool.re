let buildFakeAtob = [%bs.raw
  {|
             function (param){
               window.atob = function(){
                 return []
               }
             }
        |}
];