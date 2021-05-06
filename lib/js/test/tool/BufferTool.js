'use strict';


var buildFakeAtob = (
             function (param){
               window.atob = function(){
                 return []
               }
             }
        );

exports.buildFakeAtob = buildFakeAtob;
/* buildFakeAtob Not a pure module */
