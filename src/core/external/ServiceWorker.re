let registerServiceWorker = [%raw (param) => "
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
    }
"];

let loadImgs = [%raw
param => "

  let imgs = [
      './public/font/empty.png',
      './public/font/empty.fnt',
      './public/logo/favicon.ico',
      './public/logo/logo.png',
      './public/img/debug.png',
      './public/img/error.png',
      './public/img/info.png',
      './public/img/log.png',
      './public/img/warn.png',
      './public/img/more.png',
      './public/img/null.png',
      './public/img/wdb.png',
      './public/img/mat.png',
      './public/img/assetPackage.png',
      './public/img/close.png',
      './public/img/select.png',
      './public/img/remove.png',
      './public/img/clone.png',
      './public/img/add.png',
      './public/img/right.png',
      './public/img/down.png',
      './public/img/notRemove.png',
      './public/img/notClone.png',
      './public/img/package.png',
      './public/img/load.png',
      './public/img/color.png',
      './public/img/run.png',
      './public/img/stop.png',
      './public/img/sun.png',
      './public/img/camera.png',
      './public/img/texture.png',
      './public/img/point.png',
      './public/img/rotation.png',
      './public/img/scale.png',
      './public/img/translation.png'
  ];

  let len = imgs.length;

  for (let i = 0; i < len; i++) {
      let imgObj = new Image();
      imgObj.src = imgs[i];

      imgObj.addEventListener('load', function () {
          console.log('imgs' + i + '加载完毕');
      }, false);
  }
"
];