var AssetTool = (function () {
    function computeLoadingPercent(
        loadedIMGUIByteLength,
        totalByteLength
    ) {
        return loadedIMGUIByteLength >= totalByteLength ? 100 : Math.ceil(loadedIMGUIByteLength / totalByteLength * 100);
    }

    function getStreamLoadTextDom() {
        return document.querySelector("#stream-loading #text");
    }

    function getWholeLoadTextDom() {
        return document.querySelector("#whole-loading #text");
    }

    return {
        isSupportStreamLoad: function () {
            return typeof window.ReadableStream !== "undefined";
        },
        showStreamLoading: function () {
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;


            document.querySelector("#stream-loading").style.display = "block";
            document.querySelector("#whole-loading").style.display = "none";



            var dom = document.querySelector("#stream-loading");

            var totalWidth = 250;
            var totalHeight = 360 - 10;

            var top = (windowHeight - totalHeight) / 2;
            var left = (windowWidth - totalWidth) / 2;


            dom.style.cssText = 'display:block;position:absolute;top:' + top + 'px;left:' + left + 'px;color:bisque; text-align: center;';
        },
        showWholeLoading: function () {
            document.querySelector("#stream-loading").style.display = "none";
            document.querySelector("#whole-loading").style.display = "flex";
        },
        showOrCreateLoadingInfo: function (
            loadedIMGUIByteLength,
            totalByteLength,
        ) {
            var loadingPercentStr = String(computeLoadingPercent(

                loadedIMGUIByteLength,
                totalByteLength
            )) + '%';

            getStreamLoadTextDom().innerHTML = loadingPercentStr;
            getWholeLoadTextDom().innerHTML = loadingPercentStr;

        },
        removeLoadingInfo: function () {
            document.querySelector("#stream-loading").remove();
            document.querySelector("#whole-loading").remove();
        },
        loadConfig: function (jsonPathArr, nextFunc, completeFunc) {
            return wd.loadConfig(jsonPathArr).forEach(function (state) {
                if (!!nextFunc) {
                    nextFunc(state)
                }
            }).then(function () {
                if (!!completeFunc) {
                    return completeFunc()
                }
            })
        },
        loadStreamWDB: function (wdbPath, handleWhenLoadingFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc, state) {
            return wd.loadStreamWDB(wdbPath, handleWhenLoadingFunc, handleBeforeStartLoopFunc, handleWhenDoneFunc, handleWhenLoadWholeWDBFunc, state).drain()
        }
    }
})();


function _extend(destination, source) {
    for (let property in source) {
        destination[property] = source[property];
    }
    return destination;
}

function initScriptAPIJob(state) {
    function _getAssetBundlePath() {
        return "AssetBundles/";
    };

    function _initAssetBundleArrayBufferCache() {
        var databaseName = "Wonder_Database";
        var tableName = "Wonder_AssetBundle_Cache";
        var cacheFieldName = "Cache";
        var hashIdFieldName = "HashId";
        var abRelativePathFieldName = "ABRelativePath";

        if (!!window.db) {
            console.log("already init before");

            return new Promise((resolve) => {
                resolve();
            }, (reject) => {
                reject("error");
            })

        };

        var request = window.indexedDB.open(databaseName);

        return new Promise((resolve, reject) => {
            request.onerror = (event) => {
                reject("open database error: ", event.target.errorCode);
            };

            request.onsuccess = (event) => {
                var db = event.target.result;

                console.log("open onsuccess");

                window.db = db;

                resolve();
            };

            request.onupgradeneeded = (event) => {
                var db = event.target.result;

                console.log("open onupgradeneeded");

                if (!db.objectStoreNames.contains(tableName)) {
                    var objectStore = db.createObjectStore(
                        tableName,
                        {
                            keyPath: abRelativePathFieldName,
                            autoIncrement: false
                        }
                    );

                    // objectStore.createIndex(cacheFieldName, cacheFieldName, { unique: false });
                    // objectStore.createIndex(hashIdFieldName, hashIdFieldName, { unique: true });
                    // objectStore.createIndex(abRelativePathFieldName, abRelativePathFieldName, { unique: true });
                }
                else {
                    reject("database->table error: shouldn't exist table: ", tableName);
                }
            };
        })
    };


    function _isAssetBundleArrayBufferCached(abRelativePath, hashId) {
        var databaseName = "Wonder_Database";
        var tableName = "Wonder_AssetBundle_Cache";
        var cacheFieldName = "Cache";
        var hashIdFieldName = "HashId";
        var abRelativePathFieldName = "ABRelativePath";

        var transaction = window.db.transaction([tableName]);
        var objectStore = transaction.objectStore(tableName);
        // var abRelativePath = objectStore.index(abRelativePathFieldName);
        var request = objectStore.get(abRelativePath);



        return new Promise((resolve, reject) => {
            request.onerror = (event) => {
                reject("error: ", event.target.errorCode);
            };

            request.onsuccess = (event) => {
                if (request.result) {

                    console.log("is cached: ", abRelativePath, request.result[hashIdFieldName] === hashId);

                    resolve(request.result[hashIdFieldName] === hashId);
                } else {
                    console.log("get no data");

                    resolve(false);
                }
            };
        })

    };


    function _getAssetBundleArrayBufferCache(abRelativePath) {
        var databaseName = "Wonder_Database";
        var tableName = "Wonder_AssetBundle_Cache";
        var cacheFieldName = "Cache";
        var hashIdFieldName = "HashId";
        var abRelativePathFieldName = "ABRelativePath";

        var transaction = window.db.transaction([tableName]);
        var objectStore = transaction.objectStore(tableName);
        // var abRelativePath = objectStore.index(abRelativePathFieldName);
        // var request = abRelativePath.get(abRelativePath);
        // var abRelativePath = objectStore.index(abRelativePathFieldName);
        var request = objectStore.get(abRelativePath);



        return new Promise((resolve, reject) => {
            request.onerror = (event) => {
                reject("error: ", event.target.errorCode);
            };

            request.onsuccess = (event) => {
                if (request.result) {

                    console.log("get cached data:", abRelativePath, request.result[cacheFieldName]);

                    resolve(request.result[cacheFieldName]);
                } else {
                    reject("get no cache")
                }
            };
        })
    };


    function _cacheAssetBundleArrayBuffer(abRelativePath, ab, hashId) {
        var databaseName = "Wonder_Database";
        var tableName = "Wonder_AssetBundle_Cache";
        var cacheFieldName = "Cache";
        var hashIdFieldName = "HashId";
        var abRelativePathFieldName = "ABRelativePath";

        var transaction = window.db.transaction([tableName], "readwrite");
        var objectStore = transaction.objectStore(tableName);
        // var abRelativePath = objectStore.index(abRelativePathFieldName);
        // var request = abRelativePath.get(abRelativePath);
        // var request = objectStore.get(abRelativePath);
        var data = {};
        data[abRelativePathFieldName] = abRelativePath;
        data[cacheFieldName] = ab;
        data[hashIdFieldName] = hashId;

        var request =
            objectStore.put(
                data
            );


        return new Promise((resolve, reject) => {
            request.onerror = (event) => {
                reject("cache fail: ", event.target.errorCode);
            };

            request.onsuccess = (event) => {
                console.log("cache success: ", abRelativePath);

                resolve();
            };
        })
    };

    var state = wd.setScriptAPIJsObj(
        _extend(
            wd.getScriptAPIJsObj(state),
            {
                "getAssetBundlePath": _getAssetBundlePath,
                "initAssetBundleArrayBufferCache": _initAssetBundleArrayBufferCache,
                "isAssetBundleArrayBufferCached": _isAssetBundleArrayBufferCached,
                "getAssetBundleArrayBufferCache": _getAssetBundleArrayBufferCache,
                "cacheAssetBundleArrayBuffer": _cacheAssetBundleArrayBuffer,
            }
        ),
        state
    );

    return state;
}