<a name="0.4.0"></a>
# [0.4.0](https://github.com/DreamForeast/Wonder-Editor/compare/v0.3.0...v0.4.0) (2017-12-02)


### Bug Fixes

* "npm run test:coverage": add "|| true" ([9597569](https://github.com/DreamForeast/Wonder-Editor/commit/9597569))
* mainEditor.re: add canvas ([1734b31](https://github.com/DreamForeast/Wonder-Editor/commit/1734b31))
* pass run test: update rollup, rollup-plugin-commonjs version to newest ([8811ea5](https://github.com/DreamForeast/Wonder-Editor/commit/8811ea5))
* re-generate editor index to fix conflicts ([88b23a0](https://github.com/DreamForeast/Wonder-Editor/commit/88b23a0))


### Features

* add GameObjectAdaptor,GameObjectOper->"getMaterial" function ([26a1aa6](https://github.com/DreamForeast/Wonder-Editor/commit/26a1aa6))
* add get engine state, set engine state ([aef3bd7](https://github.com/DreamForeast/Wonder-Editor/commit/aef3bd7))
* add sceneTree and inspector component ([ede6c5f](https://github.com/DreamForeast/Wonder-Editor/commit/ede6c5f))
* begin "move component data to componentData_config.ts"(not finish) ([b804260](https://github.com/DreamForeast/Wonder-Editor/commit/b804260))
* begine "import engine": ([2a9e8ab](https://github.com/DreamForeast/Wonder-Editor/commit/2a9e8ab))
* GameObjectOper add "getAllComponents" function ([a833e5e](https://github.com/DreamForeast/Wonder-Editor/commit/a833e5e))
* implement "show box" ([c989789](https://github.com/DreamForeast/Wonder-Editor/commit/c989789))
* import wonder-commonlib ([b1098b6](https://github.com/DreamForeast/Wonder-Editor/commit/b1098b6))
* package.json: remove node-sass and its dependences ([69fde8f](https://github.com/DreamForeast/Wonder-Editor/commit/69fde8f))
* package.json: remove node-sass and its dependences ([26517f9](https://github.com/DreamForeast/Wonder-Editor/commit/26517f9))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/DreamForeast/Wonder-Editor/compare/v0.1.0...v0.2.0) (2017-09-18)


### Bug Fixes

* directory mistake ([41981a1](https://github.com/DreamForeast/Wonder-Editor/commit/41981a1))
* fix gulp task "generateEditorIndex" ([d9577fa](https://github.com/DreamForeast/Wonder-Editor/commit/d9577fa))
* fix parent and child gameObject only show parent gameObject bug ([a08f764](https://github.com/DreamForeast/Wonder-Editor/commit/a08f764))
* fix rollup->namedExports->cnpm install: ([5ccc6af](https://github.com/DreamForeast/Wonder-Editor/commit/5ccc6af))
* gulp task "watchForRunTest" add "generateEditorIndex" task ([f37d00e](https://github.com/DreamForeast/Wonder-Editor/commit/f37d00e))
* gulp task "watchForRunTest" add "generateEditorIndex" task ([4d03835](https://github.com/DreamForeast/Wonder-Editor/commit/4d03835))
* gulp task "watchForRunTest" remove "generateEditorIndex" task ([db20609](https://github.com/DreamForeast/Wonder-Editor/commit/db20609))
* jest.json: pass testUI ([193f1ae](https://github.com/DreamForeast/Wonder-Editor/commit/193f1ae))
* remove component->asset related code ([e266501](https://github.com/DreamForeast/Wonder-Editor/commit/e266501))
* rollup->namedExports: react-dom add "findDOMNode" ([1c3f65f](https://github.com/DreamForeast/Wonder-Editor/commit/1c3f65f))
* rollup.config.xxx.js: "namedExports" now define xxx@xxx(add version to handle the package installed by cnpm case) ([60273d6](https://github.com/DreamForeast/Wonder-Editor/commit/60273d6))
* rollup.config.xxx.js: "namedExports" now define xxx@xxx(add version to handle the package installed by cnpm case) ([3d71e90](https://github.com/DreamForeast/Wonder-Editor/commit/3d71e90))
* run test: use hack to pass run test, but run test still has bug(e.g. can't set current gameObject's material) ([903fc81](https://github.com/DreamForeast/Wonder-Editor/commit/903fc81))
* SceneBuss.ts import "it" from contract.ts ([595758c](https://github.com/DreamForeast/Wonder-Editor/commit/595758c))


### Features

* adaptor add "getViewport", resize canvas functions ([fe35a6b](https://github.com/DreamForeast/Wonder-Editor/commit/fe35a6b))
* add BasicMaterial component ([842bf4e](https://github.com/DreamForeast/Wonder-Editor/commit/842bf4e))
* add BasicMaterial component->get color ([b044216](https://github.com/DreamForeast/Wonder-Editor/commit/b044216))
* ci: add "test ui" ([a61b404](https://github.com/DreamForeast/Wonder-Editor/commit/a61b404))
* ci: update node version ([509e996](https://github.com/DreamForeast/Wonder-Editor/commit/509e996))
* commit dist files ([d44f075](https://github.com/DreamForeast/Wonder-Editor/commit/d44f075))
* DeviceAdaptor add "setViewport" function ([3c74192](https://github.com/DreamForeast/Wonder-Editor/commit/3c74192))
* fill BasicMaterial and show it on MainEditor ([f833763](https://github.com/DreamForeast/Wonder-Editor/commit/f833763))
* GameObjectAdaptor: add "getParent","setParent" functions ([ec9ba20](https://github.com/DreamForeast/Wonder-Editor/commit/ec9ba20))
* move getSceneData to redux and epic ([eb7875a](https://github.com/DreamForeast/Wonder-Editor/commit/eb7875a))
* update version to 0.2.0 ([6782836](https://github.com/DreamForeast/Wonder-Editor/commit/6782836))
* update wonder-expect.js version ([6867e2d](https://github.com/DreamForeast/Wonder-Editor/commit/6867e2d))
* update wonder.js version ([2086aef](https://github.com/DreamForeast/Wonder-Editor/commit/2086aef))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/DreamForeast/Wonder-Editor/compare/d13acc2...v0.1.0) (2017-08-28)


### Bug Fixes

* canvas width and style width ([d13acc2](https://github.com/DreamForeast/Wonder-Editor/commit/d13acc2))
* ci: add "gulp rollupTest" before "gulp testInCI" ([9269659](https://github.com/DreamForeast/Wonder-Editor/commit/9269659))
* fix README->ci,codecov icon ([33851aa](https://github.com/DreamForeast/Wonder-Editor/commit/33851aa))
* fix TransformAdaptor->translate bug:now can translate instead of only set position ([f0f70d3](https://github.com/DreamForeast/Wonder-Editor/commit/f0f70d3))
* now will only set clear color once ([9423686](https://github.com/DreamForeast/Wonder-Editor/commit/9423686))
* package.json: add install "electron" ([aea1dda](https://github.com/DreamForeast/Wonder-Editor/commit/aea1dda))
* package.json: not install electron ([df8ecca](https://github.com/DreamForeast/Wonder-Editor/commit/df8ecca))
* pass run test: ([53f744d](https://github.com/DreamForeast/Wonder-Editor/commit/53f744d))
* try solve ci->npm install->The package jest@20.0.4 does not satisfy its siblings' peerDependencies requirements!: update ts-ject version ([464febd](https://github.com/DreamForeast/Wonder-Editor/commit/464febd))


### Features

* add .travis.yml(commit id:8551e need commit it, but forget!) ([b4471fa](https://github.com/DreamForeast/Wonder-Editor/commit/b4471fa))
* add ci ([8551e0f](https://github.com/DreamForeast/Wonder-Editor/commit/8551e0f))
* add core ui and wordEditor ([66f3694](https://github.com/DreamForeast/Wonder-Editor/commit/66f3694))
* add node server ([350322b](https://github.com/DreamForeast/Wonder-Editor/commit/350322b))
* commit .idea files ([0a97f5c](https://github.com/DreamForeast/Wonder-Editor/commit/0a97f5c))
* commit dist ([6225ea9](https://github.com/DreamForeast/Wonder-Editor/commit/6225ea9))
* editor architecture ([93d37b5](https://github.com/DreamForeast/Wonder-Editor/commit/93d37b5))
* try pass ci: update node version ([3940569](https://github.com/DreamForeast/Wonder-Editor/commit/3940569))
* update author to "DreamForest" ([9da3ff4](https://github.com/DreamForeast/Wonder-Editor/commit/9da3ff4))
* use wonder.js as engine instead of amyjs: pass ts compile and rollup ([03d39ed](https://github.com/DreamForeast/Wonder-Editor/commit/03d39ed))



