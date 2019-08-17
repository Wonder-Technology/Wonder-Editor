let registerServiceWorker: unit => Js.Promise.t(unit) = [%raw
  param => {|
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker
        .register('./service-worker.js')
        .then(function (registration) {
            console.log('Service Worker Registered ! ');
        });
    }
    else{
        return new Promise();
    }
    |}
];