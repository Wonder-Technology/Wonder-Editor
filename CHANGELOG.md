<a name="1.1.0"></a>
# [1.1.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.2...v1.1.0) (2019-06-02)


### Bug Fixes

* **asset:** fix "remove folder asset": should remove folder's all children ([79e3d37](https://github.com/Wonder-Technology/Wonder-Editor/commit/79e3d37))
* **asset:** fix "remove material asset":1.remove instead of dispose material->maps; 2.if material has no gameObjects, dispose material; ([d81994f](https://github.com/Wonder-Technology/Wonder-Editor/commit/d81994f))
* **asset:** fix remove texture asset: if texture has no materials, should dispose texture's engine data ([c711c20](https://github.com/Wonder-Technology/Wonder-Editor/commit/c711c20))
* **asset:** fix rename asset in inspector: if value not change, shouldn't warn ([22eeb02](https://github.com/Wonder-Technology/Wonder-Editor/commit/22eeb02))
* **asset:** script attribute: sort entries show order; add check script event function/attribute jsObj str; ([5185889](https://github.com/Wonder-Technology/Wonder-Editor/commit/5185889))
* **console:** fix "str.split error" bug: fix ConsoleBaseComponent->buildMultiLineStringComponent ([272a8ba](https://github.com/Wonder-Technology/Wonder-Editor/commit/272a8ba))
* **event:** fix FloatInput,IntInput->drag over in pointer lock->movement ([a085859](https://github.com/Wonder-Technology/Wonder-Editor/commit/a085859))
* **event:** fix init event job->chrome bug for getMovementDeltaWhenPointerLocked ([d60b64f](https://github.com/Wonder-Technology/Wonder-Editor/commit/d60b64f))
* **event:** fix init event job->chrome bug for getMovementDeltaWhenPointerLocked: use skip(2) instead of skip(1) ([6eb7a9d](https://github.com/Wonder-Technology/Wonder-Editor/commit/6eb7a9d))
* **imgCanvas:** fix bug: remove texture should redraw material snapshot and remove container gameObj ([a51373c](https://github.com/Wonder-Technology/Wonder-Editor/commit/a51373c))
* **imgCanvas:** use drawImage func instead of Js.object.type ([4c94f56](https://github.com/Wonder-Technology/Wonder-Editor/commit/4c94f56))
* **inspectorCanvas:** fix texture cache: if change texture asset,clear its cache ([c93df9f](https://github.com/Wonder-Technology/Wonder-Editor/commit/c93df9f))
* **inspectorEngine:** fix bug caused by 192843c39172cd9983ac1ed2f524f10b3015209f ([db62c89](https://github.com/Wonder-Technology/Wonder-Editor/commit/db62c89))
* **inspectorEngine:** fix bug: stateData no state ([8ea3542](https://github.com/Wonder-Technology/Wonder-Editor/commit/8ea3542))
* **inspectorEngine:** need fix bug ([192843c](https://github.com/Wonder-Technology/Wonder-Editor/commit/192843c))
* **publish:** index.html: use contentLength instead of totalByteLength ([201e5da](https://github.com/Wonder-Technology/Wonder-Editor/commit/201e5da))
* **resize:** fix bug: enter editor; show material inspector; resize to big window; show blank area; ([9995f8b](https://github.com/Wonder-Technology/Wonder-Editor/commit/9995f8b))
* **ui:** mouse over FloatInput/IntInput->drag zone should show move cursor ([b0c4b57](https://github.com/Wonder-Technology/Wonder-Editor/commit/b0c4b57))
* **wdb:** need jack fix bug ([974710e](https://github.com/Wonder-Technology/Wonder-Editor/commit/974710e))


### Features

* **abUI:** finish all asset bundle ui ([2c24176](https://github.com/Wonder-Technology/Wonder-Editor/commit/2c24176))
* **ambientLight:** add ambient light in inspector canvas ([3c00512](https://github.com/Wonder-Technology/Wonder-Editor/commit/3c00512))
* **asset:** add "remove script event function, script attribute asset" ([119af1d](https://github.com/Wonder-Technology/Wonder-Editor/commit/119af1d))
* **asset:** add script event function asset; add script attribute asset; ([2e0facb](https://github.com/Wonder-Technology/Wonder-Editor/commit/2e0facb))
* **asset:** fix rename script attribute asset->attribute name: now update in all script components ([fee5180](https://github.com/Wonder-Technology/Wonder-Editor/commit/fee5180))
* **asset:** script attribute asset: add "update script attribute in all script components" logic ([32d3785](https://github.com/Wonder-Technology/Wonder-Editor/commit/32d3785))
* **asset:** script event function asset: add "update script event function in all script components" logic ([fe76e2e](https://github.com/Wonder-Technology/Wonder-Editor/commit/fe76e2e))
* **asset-bundle:** add "asset->load assetBundle" logic ([51fba9d](https://github.com/Wonder-Technology/Wonder-Editor/commit/51fba9d))
* **asset-bundle:** add "generate all ab" draft logic(pass compile) ([e3876ab](https://github.com/Wonder-Technology/Wonder-Editor/commit/e3876ab))
* **asset-bundle:** add "generate single sab" ([5d6a4cf](https://github.com/Wonder-Technology/Wonder-Editor/commit/5d6a4cf))
* **asset-bundle:** add geo.png ([ec60c07](https://github.com/Wonder-Technology/Wonder-Editor/commit/ec60c07))
* **asset-bundle:** add HeaderAssetBundle->"generate single rab" related ui ([150ca0c](https://github.com/Wonder-Technology/Wonder-Editor/commit/150ca0c))
* **asset-bundle:** add SelectTree ui draft ([63fb0b1](https://github.com/Wonder-Technology/Wonder-Editor/commit/63fb0b1))
* **asset-bundle:** asset tree->add assetBundle node ([f0f289c](https://github.com/Wonder-Technology/Wonder-Editor/commit/f0f289c))
* **asset-bundle:** begin "import ab at runtime when run": rewrite script api for asset bundle ([594684b](https://github.com/Wonder-Technology/Wonder-Editor/commit/594684b))
* **asset-bundle:** export/import wpk add asset bundle ([6310e5f](https://github.com/Wonder-Technology/Wonder-Editor/commit/6310e5f))
* **asset-bundle:** finish "build select tree from asset tree for generate single rab" ([75c226b](https://github.com/Wonder-Technology/Wonder-Editor/commit/75c226b))
* **asset-bundle:** finish "generateAndDownloadSingleRAB" logic ([c973ebf](https://github.com/Wonder-Technology/Wonder-Editor/commit/c973ebf))
* **asset-bundle:** fix generate single rab: added light material shouldn't add to basic material resource data ([b149ac7](https://github.com/Wonder-Technology/Wonder-Editor/commit/b149ac7))
* **asset-bundle:** fix HeaderAssetBundleGenerateAllAB: change generate-single-sab to generate-all-ab ([cf32db3](https://github.com/Wonder-Technology/Wonder-Editor/commit/cf32db3))
* **asset-bundle:** fix modal: click close button shouldn't generate single ab ([a179227](https://github.com/Wonder-Technology/Wonder-Editor/commit/a179227))
* **asset-bundle:** header->"generate single rab" add "name" input ([2c34074](https://github.com/Wonder-Technology/Wonder-Editor/commit/2c34074))
* **asset-bundle:** publish local: write asset bundle to zip ([5e45104](https://github.com/Wonder-Technology/Wonder-Editor/commit/5e45104))
* **asset-bundle:** support load "asset bundle zip" to asset ([72b90e6](https://github.com/Wonder-Technology/Wonder-Editor/commit/72b90e6))
* **assetCanvas:** finish asset canvas demo ([7cf4536](https://github.com/Wonder-Technology/Wonder-Editor/commit/7cf4536))
* **camera:** fix scene view->edit camera: fix point scale ([bcf22bc](https://github.com/Wonder-Technology/Wonder-Editor/commit/bcf22bc))
* **controller:** add "exec script event functions when run" logic ([a676fef](https://github.com/Wonder-Technology/Wonder-Editor/commit/a676fef))
* **engine:** update wonder.js to 1.0.2 ([15da515](https://github.com/Wonder-Technology/Wonder-Editor/commit/15da515))
* **engine:** update wonder.js to 1.1.0 ([dda7c6b](https://github.com/Wonder-Technology/Wonder-Editor/commit/dda7c6b))
* **engine:** update wonder.js version ([50402dd](https://github.com/Wonder-Technology/Wonder-Editor/commit/50402dd))
* **engine:** update wonder.js version ([bcf12f1](https://github.com/Wonder-Technology/Wonder-Editor/commit/bcf12f1))
* **engine:** update wonder.js version ([238649c](https://github.com/Wonder-Technology/Wonder-Editor/commit/238649c))
* **engine:** update wonder.js version ([f7e1eab](https://github.com/Wonder-Technology/Wonder-Editor/commit/f7e1eab))
* **engine:** update wonder.js version ([b429bce](https://github.com/Wonder-Technology/Wonder-Editor/commit/b429bce))
* **engine:** update wonder.js, wonder-webgl version ([9d41c84](https://github.com/Wonder-Technology/Wonder-Editor/commit/9d41c84))
* **export:** export mateial snapshot ([10fda6d](https://github.com/Wonder-Technology/Wonder-Editor/commit/10fda6d))
* **header:** add "New Scene" ([eb5d73a](https://github.com/Wonder-Technology/Wonder-Editor/commit/eb5d73a))
* **header:** fix "New Scene": should operate in stop ([5792121](https://github.com/Wonder-Technology/Wonder-Editor/commit/5792121))
* **header:** fix "NewScene": should clear current scene tree node before exec update_transform_gizmos job ([b65da2f](https://github.com/Wonder-Technology/Wonder-Editor/commit/b65da2f))
* **imgCanvas:** create import wdb/gltf file material snapshot ([1c75f35](https://github.com/Wonder-Technology/Wonder-Editor/commit/1c75f35))
* **imgCanvas:** finish remove material should remove it's imageData from imageDataMap ([76c648a](https://github.com/Wonder-Technology/Wonder-Editor/commit/76c648a))
* **imgCanvas:** finish TODOs ([98e2bb6](https://github.com/Wonder-Technology/Wonder-Editor/commit/98e2bb6))
* **imgCanvas:** fix "create material/wdb snapshot": now clear img canvas before draw ([245be64](https://github.com/Wonder-Technology/Wonder-Editor/commit/245be64))
* **imgCanvas:** fix AssetTreeInspectorUtils->disposeContainerGameObjectAllChildrenAndReallocateCPUMemory->_reallocateCPUMemory: add condition judge ([90e4a49](https://github.com/Wonder-Technology/Wonder-Editor/commit/90e4a49))
* **imgCanvas:** store img-canvas context in editorState ([2b71dfc](https://github.com/Wonder-Technology/Wonder-Editor/commit/2b71dfc))
* **imgui:** fix scene view imgui: if SceneViewIMGUIUtils->convertWorldToScreen return None, return (-100, -100) ([a6a1fdd](https://github.com/Wonder-Technology/Wonder-Editor/commit/a6a1fdd))
* **inspector:** finish create material sphere into inspector canvas ([8573a77](https://github.com/Wonder-Technology/Wonder-Editor/commit/8573a77))
* **inspectorCanvas:** arcball camera controller->event work ([bb505cb](https://github.com/Wonder-Technology/Wonder-Editor/commit/bb505cb))
* **inspectorCanvas:** fix "cache texture": load wdb->extract material assets shouldn't dispose texture ([48b4db8](https://github.com/Wonder-Technology/Wonder-Editor/commit/48b4db8))
* **inspectorCanvas:** fix arcball camera controller: left mouse button can still drag ([f236513](https://github.com/Wonder-Technology/Wonder-Editor/commit/f236513))
* **inspectorCanvas:** fix generate material snapshot: generate snapshot in MaterialInspector->willUnmount ([5c166e9](https://github.com/Wonder-Technology/Wonder-Editor/commit/5c166e9))
* **inspectorCanvas:** fix MaterialInspector->update snapshot bug ([b6d3a64](https://github.com/Wonder-Technology/Wonder-Editor/commit/b6d3a64))
* **inspectorCanvas:** fix remove material asset: if material is removed, not create material sphere ([7fe0f3f](https://github.com/Wonder-Technology/Wonder-Editor/commit/7fe0f3f))
* **inspectorCanvas:** fix:restore arcball camera controller->angle  before update snapshot ([62c8c40](https://github.com/Wonder-Technology/Wonder-Editor/commit/62c8c40))
* **inspectorCanvas:** improve light ([b084951](https://github.com/Wonder-Technology/Wonder-Editor/commit/b084951))
* **inspectorCanvas:** update default material snapshot base64 ([c801917](https://github.com/Wonder-Technology/Wonder-Editor/commit/c801917))
* **inspectorCanvas:** wdb inspector: generate snapshot in WDBInspector->didMount ([952ff4c](https://github.com/Wonder-Technology/Wonder-Editor/commit/952ff4c))
* **inspectorCanvas:** wDBInspector, MaterialInspector->didMount add tryCatch ([6ab8559](https://github.com/Wonder-Technology/Wonder-Editor/commit/6ab8559))
* **inspectorEngine:** show sphere and camera ([938daed](https://github.com/Wonder-Technology/Wonder-Editor/commit/938daed))
* **job:** init_pipelines remove init_script job ([e9ac408](https://github.com/Wonder-Technology/Wonder-Editor/commit/e9ac408))
* **language:** add arcball camera and light language ([30126b9](https://github.com/Wonder-Technology/Wonder-Editor/commit/30126b9))
* **language:** add asset and inspector language ([14215de](https://github.com/Wonder-Technology/Wonder-Editor/commit/14215de))
* **language:** add camera group language ([ef33b41](https://github.com/Wonder-Technology/Wonder-Editor/commit/ef33b41))
* **language:** add message language ([7c08bc0](https://github.com/Wonder-Technology/Wonder-Editor/commit/7c08bc0))
* **language:** change header-edit->zh ([6b8efc8](https://github.com/Wonder-Technology/Wonder-Editor/commit/6b8efc8))
* **language:** finish header and controller language ([6053827](https://github.com/Wonder-Technology/Wonder-Editor/commit/6053827))
* **language:** fix language data ([b7fae29](https://github.com/Wonder-Technology/Wonder-Editor/commit/b7fae29))
* **language:** restore DomHelper->locationReload to use reload ([ce4b198](https://github.com/Wonder-Technology/Wonder-Editor/commit/ce4b198))
* **left-header:** fix clone gameObject has script component ([814aca0](https://github.com/Wonder-Technology/Wonder-Editor/commit/814aca0))
* **mainEditorMaterial:** split MainEditorBasic/lightMaterial to MainEditorBasic/LightMaterialForGam ([6577143](https://github.com/Wonder-Technology/Wonder-Editor/commit/6577143))
* **message:** change message -> isActive to be immutable ([e1860e7](https://github.com/Wonder-Technology/Wonder-Editor/commit/e1860e7))
* **message:** finish message demo ([58f197c](https://github.com/Wonder-Technology/Wonder-Editor/commit/58f197c))
* **message:** finish message demo ([0710f75](https://github.com/Wonder-Technology/Wonder-Editor/commit/0710f75))
* **message:** finish message feature ([46ce318](https://github.com/Wonder-Technology/Wonder-Editor/commit/46ce318))
* **message:** finish message feature ([51aeea2](https://github.com/Wonder-Technology/Wonder-Editor/commit/51aeea2))
* **progress:** add progress willUnmount off event ([90ee1d8](https://github.com/Wonder-Technology/Wonder-Editor/commit/90ee1d8))
* **progress:** finish offCustomGlobalEventByEventName in progress->willUnmount ([8a12a22](https://github.com/Wonder-Technology/Wonder-Editor/commit/8a12a22))
* **progress:** finish progress feat and style ([548fa0c](https://github.com/Wonder-Technology/Wonder-Editor/commit/548fa0c))
* **progress:** load wdb, import package add progress ([36b9f75](https://github.com/Wonder-Technology/Wonder-Editor/commit/36b9f75))
* **progress:** use send local ui state instead of operate dom ([7912f99](https://github.com/Wonder-Technology/Wonder-Editor/commit/7912f99))
* **publish:** fix publish local->no worker: fix for asset bundle ([78af837](https://github.com/Wonder-Technology/Wonder-Editor/commit/78af837))
* **publish:** fix publish local->worker: fix for asset bundle ([fe1eb33](https://github.com/Wonder-Technology/Wonder-Editor/commit/fe1eb33))
* **publish:** update engine files ([80ab8fe](https://github.com/Wonder-Technology/Wonder-Editor/commit/80ab8fe))
* **pwa:** finish pwa update data ([2825e30](https://github.com/Wonder-Technology/Wonder-Editor/commit/2825e30))
* **pwa:** finish pwa update data ([c322bcc](https://github.com/Wonder-Technology/Wonder-Editor/commit/c322bcc))
* **redo-undo:** fix redo/undo remove script component ([5e8e4fc](https://github.com/Wonder-Technology/Wonder-Editor/commit/5e8e4fc))
* **redo-undo:** script component->attribute add redo/undo ([cdb392a](https://github.com/Wonder-Technology/Wonder-Editor/commit/cdb392a))
* **redo-undo:** script component->event function add redo/undo ([6e58c7c](https://github.com/Wonder-Technology/Wonder-Editor/commit/6e58c7c))
* **redo-undo:** script event function,script attribute asset add redo-undo ([dd482af](https://github.com/Wonder-Technology/Wonder-Editor/commit/dd482af))
* **script:** add "store script assets in asb", "relate script assets when import package", "extract script assets when load asset" logic(draft) ([5300181](https://github.com/Wonder-Technology/Wonder-Editor/commit/5300181))
* **script:** fix event function->body str: replace "return engineState" to return engineState;" ([d1fc979](https://github.com/Wonder-Technology/Wonder-Editor/commit/d1fc979))
* **script:** fix script component: support Int type ([560e7fb](https://github.com/Wonder-Technology/Wonder-Editor/commit/560e7fb))
* **script:** rewrite script api->asset bundle api->addSABSceneGameObjectChildrenToScene, setSABSceneGameObjectToBeScene, disposeSceneAllChildren ([e2fa8cc](https://github.com/Wonder-Technology/Wonder-Editor/commit/e2fa8cc))
* **script:** script api now update editor ([5fb6843](https://github.com/Wonder-Technology/Wonder-Editor/commit/5fb6843))
* **script-component:** "add script event function": if no scriptEventFunction asset, warn ([bc26270](https://github.com/Wonder-Technology/Wonder-Editor/commit/bc26270))
* **script-component:** add "remove script component" logic ([3d06aab](https://github.com/Wonder-Technology/Wonder-Editor/commit/3d06aab))
* **script-component:** add "remove script event function" ([0cbcaa0](https://github.com/Wonder-Technology/Wonder-Editor/commit/0cbcaa0))
* **script-component:** add "script attribute" logic ([afaba0c](https://github.com/Wonder-Technology/Wonder-Editor/commit/afaba0c))
* **script-component:** add "script attribute"->fields logic ([ad54248](https://github.com/Wonder-Technology/Wonder-Editor/commit/ad54248))
* **script-component:** add script component logic(draft); add "add script event function" logic(draft); ([af77d66](https://github.com/Wonder-Technology/Wonder-Editor/commit/af77d66))
* **script-component:** fix "add script event function" bugs ([4dbcf39](https://github.com/Wonder-Technology/Wonder-Editor/commit/4dbcf39))
* **script-component:** HideScriptEventFunctionGroupForAdd,HideScriptEventFunctionGroupForChange now not dispatch ([f21fa91](https://github.com/Wonder-Technology/Wonder-Editor/commit/f21fa91))
* **snapshot:** add basicMaterial and lightMaterial closeColorPick and blurShininess event handler ([d520210](https://github.com/Wonder-Technology/Wonder-Editor/commit/d520210))
* **wdb:** add imageDataIndex in wdbData ([bacfd2a](https://github.com/Wonder-Technology/Wonder-Editor/commit/bacfd2a))
* **wdb:** add WDBInspector.re and refactor didMount and willunMount ([29ddbef](https://github.com/Wonder-Technology/Wonder-Editor/commit/29ddbef))
* **wdb:** finish clone wdb gameObject to other engine state ([58c609f](https://github.com/Wonder-Technology/Wonder-Editor/commit/58c609f))
* **wdb:** finish export package store wdb snapshot to asb, import package should use it ([a7c265b](https://github.com/Wonder-Technology/Wonder-Editor/commit/a7c265b))
* **wdb:** import wdb create snapshot ([abdb9a8](https://github.com/Wonder-Technology/Wonder-Editor/commit/abdb9a8))
* **wdb:** import wdb should dispose inspector canvas gameObject ([07e54bf](https://github.com/Wonder-Technology/Wonder-Editor/commit/07e54bf))
* remove ImmutableSparseMapService.re ([291b8e4](https://github.com/Wonder-Technology/Wonder-Editor/commit/291b8e4))
* update files ([91c58e4](https://github.com/Wonder-Technology/Wonder-Editor/commit/91c58e4))
* update files ([e3a5e09](https://github.com/Wonder-Technology/Wonder-Editor/commit/e3a5e09))
* update wonder.js,wonder-bs-jest,wonder-commonlib,jest version ([3891511](https://github.com/Wonder-Technology/Wonder-Editor/commit/3891511))


### Performance Improvements

* **img:** change img size ([a50b2d3](https://github.com/Wonder-Technology/Wonder-Editor/commit/a50b2d3))
* **inspectorCanvas:** optimize render inspector canvas: cache texture ([51a9e19](https://github.com/Wonder-Technology/Wonder-Editor/commit/51a9e19))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.1...v1.0.2) (2019-03-16)


### Features

* **engine:** update wonder.js to 1.0.2 ([aa4ace3](https://github.com/Wonder-Technology/Wonder-Editor/commit/aa4ace3))
* **language:** add arcball camera and light language ([4ebe5d4](https://github.com/Wonder-Technology/Wonder-Editor/commit/4ebe5d4))
* **language:** add asset and inspector language ([9ef009d](https://github.com/Wonder-Technology/Wonder-Editor/commit/9ef009d))
* **language:** add camera group language ([4fb0700](https://github.com/Wonder-Technology/Wonder-Editor/commit/4fb0700))
* **language:** change header-edit->zh ([9d9eb51](https://github.com/Wonder-Technology/Wonder-Editor/commit/9d9eb51))
* **language:** finish header and controller language ([2f49251](https://github.com/Wonder-Technology/Wonder-Editor/commit/2f49251))
* **language:** fix language data ([836aaf6](https://github.com/Wonder-Technology/Wonder-Editor/commit/836aaf6))
* **language:** restore DomHelper->locationReload to use reload ([6fc6ee4](https://github.com/Wonder-Technology/Wonder-Editor/commit/6fc6ee4))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.0...v1.0.1) (2019-03-13)


### Bug Fixes

* **package:** fix "import package": now clear imageData map when dispose assets ([6fcab64](https://github.com/Wonder-Technology/Wonder-Editor/commit/6fcab64))


### Features

* **pwa:** finish pwa update data ([04a2320](https://github.com/Wonder-Technology/Wonder-Editor/commit/04a2320))
* **rename:** rename gameObject name, should can be set "" ([e399371](https://github.com/Wonder-Technology/Wonder-Editor/commit/e399371))
* **sceneTree:** add sceneTree node icon ([e3eef18](https://github.com/Wonder-Technology/Wonder-Editor/commit/e3eef18))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.0-rc.1...v1.0.0) (2019-03-10)


### Bug Fixes

* **hotkey:** fix "if event target is scene view, ctrl+d not clone!" bug ([6c734f3](https://github.com/Wonder-Technology/Wonder-Editor/commit/6c734f3))
* **inspector:** fix "remove geometry component": remove instead of dispose geometry ([c108770](https://github.com/Wonder-Technology/Wonder-Editor/commit/c108770))
* **left-header:** fix clone->test clone gameObject whose children has light component ([b7a3470](https://github.com/Wonder-Technology/Wonder-Editor/commit/b7a3470))
* **ui:** fix "asset tree":if node->children has no folder node, not show arrow ([54a5acf](https://github.com/Wonder-Technology/Wonder-Editor/commit/54a5acf))
* fix welcome and version upgrade modal ([554cdd8](https://github.com/Wonder-Technology/Wonder-Editor/commit/554cdd8))
* **pwa:** fix "add to homescreen"->icon 404 ([6599269](https://github.com/Wonder-Technology/Wonder-Editor/commit/6599269))


### Features

* **appShell:** add appShell ([6134a9a](https://github.com/Wonder-Technology/Wonder-Editor/commit/6134a9a))
* **engine:** update wonder.js to 1.0.0 ([c4955d5](https://github.com/Wonder-Technology/Wonder-Editor/commit/c4955d5))
* **engine:** update wonder.js version ([cf59389](https://github.com/Wonder-Technology/Wonder-Editor/commit/cf59389))
* **focus:** increase gameObject which has no geometry->wheel speed ([76cdcac](https://github.com/Wonder-Technology/Wonder-Editor/commit/76cdcac))
* **focus:** increase wheel speed ([409fb60](https://github.com/Wonder-Technology/Wonder-Editor/commit/409fb60))
* **img:** preload imgs, code in this ([19927a6](https://github.com/Wonder-Technology/Wonder-Editor/commit/19927a6))
* **publish:** update engine files ([f3e749b](https://github.com/Wonder-Technology/Wonder-Editor/commit/f3e749b))
* **ui:** main button add title ([784c2ad](https://github.com/Wonder-Technology/Wonder-Editor/commit/784c2ad))
* welcome and version upgrade modal now use english ([803177e](https://github.com/Wonder-Technology/Wonder-Editor/commit/803177e))


### Performance Improvements

* **img:** preload imgs ([3975218](https://github.com/Wonder-Technology/Wonder-Editor/commit/3975218))
* **imgs:** comprss imgs ([711563a](https://github.com/Wonder-Technology/Wonder-Editor/commit/711563a))


### Reverts

* **preload:** revert preload imgs ([2ba5edd](https://github.com/Wonder-Technology/Wonder-Editor/commit/2ba5edd))



<a name="1.0.0-rc.1"></a>
# [1.0.0-rc.1](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.0-beta.3.1...v1.0.0-rc.1) (2019-03-05)


### Bug Fixes

* **asset:** fix "load texture asset": now set format ([73397e5](https://github.com/Wonder-Technology/Wonder-Editor/commit/73397e5))
* **package:** fix "dispose renderGroup component before export and import package cause check error" bug ([f5abd59](https://github.com/Wonder-Technology/Wonder-Editor/commit/f5abd59))
* **package:** fix "material assets after import" bug ([5c6fec4](https://github.com/Wonder-Technology/Wonder-Editor/commit/5c6fec4))


### Features

* commit dist/index.js, public/css/index.css; remove index.min.css ([f4d1e77](https://github.com/Wonder-Technology/Wonder-Editor/commit/f4d1e77))
* **asset:** texture asset: support load jpeg ([c0b019c](https://github.com/Wonder-Technology/Wonder-Editor/commit/c0b019c))
* **engine:** update wonder.js to 1.0.0-rc.1 ([a1cdedb](https://github.com/Wonder-Technology/Wonder-Editor/commit/a1cdedb))
* **engine:** update wonder.js version ([aa87847](https://github.com/Wonder-Technology/Wonder-Editor/commit/aa87847))
* **focus:** set edit camera->arcball move and wheel speed ([a8192ca](https://github.com/Wonder-Technology/Wonder-Editor/commit/a8192ca))
* **publish:** update engine files ([48d21e3](https://github.com/Wonder-Technology/Wonder-Editor/commit/48d21e3))



<a name="1.0.0-beta.3.1"></a>
# [1.0.0-beta.3.1](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.0-beta.3...v1.0.0-beta.3.1) (2019-03-03)


### Features

* **pwa:** update service-worker.js->cacheName ([161a5f3](https://github.com/Wonder-Technology/Wonder-Editor/commit/161a5f3))



<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2019-03-03)


### Bug Fixes

* **scene-view:** fix "rotation gizmo"->rotate on axis bug ([120257d](https://github.com/Wonder-Technology/Wonder-Editor/commit/120257d))


### Features

* **engine:** update wonder.js to 1.0.0-beta.3 ([4c0816f](https://github.com/Wonder-Technology/Wonder-Editor/commit/4c0816f))
* **engine:** update wonder.js version ([84eba2a](https://github.com/Wonder-Technology/Wonder-Editor/commit/84eba2a))
* **engine:** update wonder.js version ([9a2a890](https://github.com/Wonder-Technology/Wonder-Editor/commit/9a2a890))
* **header:** add header notice component, notice welcome user and version upgrade ([ae66c64](https://github.com/Wonder-Technology/Wonder-Editor/commit/ae66c64))
* **hotkey:** add transform hotkeys ([2cbf4bb](https://github.com/Wonder-Technology/Wonder-Editor/commit/2cbf4bb))
* **hotkey:** delete now can remove asset ([05c98b5](https://github.com/Wonder-Technology/Wonder-Editor/commit/05c98b5))
* **hotkey:** fix asset header->remove caused by 05c98b5fc1c3c769098b888120c1011724c5f29d ([0d5fba1](https://github.com/Wonder-Technology/Wonder-Editor/commit/0d5fba1))
* **modal:** add welcome user modal ([77a6605](https://github.com/Wonder-Technology/Wonder-Editor/commit/77a6605))
* **publish:** update engine files ([1b7c679](https://github.com/Wonder-Technology/Wonder-Editor/commit/1b7c679))
* **pwa:** add pwa service worker and homescreen ([bb2ed89](https://github.com/Wonder-Technology/Wonder-Editor/commit/bb2ed89))
* **pwa:** add pwa service worker and homescreen ([7bb4825](https://github.com/Wonder-Technology/Wonder-Editor/commit/7bb4825))
* **pwa:** fix manifest.json-worker.js->start_url ([2749203](https://github.com/Wonder-Technology/Wonder-Editor/commit/2749203))
* **pwa:** fix service-worker.js->filesToCache ([8d97aca](https://github.com/Wonder-Technology/Wonder-Editor/commit/8d97aca))
* **pwa:** update service-worker.js->filesToCache ([6ece121](https://github.com/Wonder-Technology/Wonder-Editor/commit/6ece121))
* **pwa:** update service-worker.js->filesToCache ([ecfed72](https://github.com/Wonder-Technology/Wonder-Editor/commit/ecfed72))
* update bs-platform to 4.0.18 ([69434c9](https://github.com/Wonder-Technology/Wonder-Editor/commit/69434c9))
* update jest to 24.1.0 ([71b13fe](https://github.com/Wonder-Technology/Wonder-Editor/commit/71b13fe))
* update react to 16.8.3 ([427a7dc](https://github.com/Wonder-Technology/Wonder-Editor/commit/427a7dc))


### Performance Improvements

* **css:** compress css ([d5fcdcd](https://github.com/Wonder-Technology/Wonder-Editor/commit/d5fcdcd))
* **imgui:** now load small font fnt,png ([c2c2b07](https://github.com/Wonder-Technology/Wonder-Editor/commit/c2c2b07))



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/Wonder-Technology/Wonder-Editor/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2019-02-26)


### Bug Fixes

* **asset:** fix "drag texture to be material asset->map->refresh inspector" bug (refer to [#44](https://github.com/Wonder-Technology/Wonder-Editor/issues/44)beeb) ([fe3fe5b](https://github.com/Wonder-Technology/Wonder-Editor/commit/fe3fe5b))
* **asset:** fix "drag texture to be material asset->map" bug ([61bfc2c](https://github.com/Wonder-Technology/Wonder-Editor/commit/61bfc2c))
* **asset:** fix "rename asset": if rename to the existed name in the same dir, should fail ([c360aa6](https://github.com/Wonder-Technology/Wonder-Editor/commit/c360aa6))
* **camera:** if blur/drag drop camera controller->distance/minDistance, should refresh transform ([2500231](https://github.com/Wonder-Technology/Wonder-Editor/commit/2500231))
* **camera:** if change arcballCameraController's gameObject's parent, should update the component ([c9fa3a8](https://github.com/Wonder-Technology/Wonder-Editor/commit/c9fa3a8))
* **camera:** when move game view->arcball camera, should update inspector->rotation ([5eac3ad](https://github.com/Wonder-Technology/Wonder-Editor/commit/5eac3ad))
* **console:** should only show 99 messages at max ([77daf60](https://github.com/Wonder-Technology/Wonder-Editor/commit/77daf60))
* **controller:** if view size changed when run, should resize screen when stop ([810f49e](https://github.com/Wonder-Technology/Wonder-Editor/commit/810f49e))
* **dragWdb:** fix drag wdb before/after scene gameObject, throw error ([d12342b](https://github.com/Wonder-Technology/Wonder-Editor/commit/d12342b))
* **event:** throw error shouldn't unbind event ([c134151](https://github.com/Wonder-Technology/Wonder-Editor/commit/c134151))
* **left-header:** fix "clone gameObject": add "check light count before clone" ([1b0a997](https://github.com/Wonder-Technology/Wonder-Editor/commit/1b0a997))
* **left-header:** fix "dispose gameObject shouldn't dispose gameObject->material component" ([4eab2f6](https://github.com/Wonder-Technology/Wonder-Editor/commit/4eab2f6))
* **left-header:** fix "dispose gameObject" bug: dispose gameObject shouldn't cause update_transform_gizmos job error ([ab2bd61](https://github.com/Wonder-Technology/Wonder-Editor/commit/ab2bd61))
* **lightMaterial:** now should re-init all light material components(include material assets which type is lightMaterial) if light change ([18117c7](https://github.com/Wonder-Technology/Wonder-Editor/commit/18117c7))
* **picking:** fix "import package"->pick bug ([1a377cc](https://github.com/Wonder-Technology/Wonder-Editor/commit/1a377cc))
* **redo-undo:** change textureInspector->wrap,filter should add to redo-undo ([db459eb](https://github.com/Wonder-Technology/Wonder-Editor/commit/db459eb))
* **redo-undo:** fix redo-undo->rotation: transform inspector ui->rotation should undo ([dfcd287](https://github.com/Wonder-Technology/Wonder-Editor/commit/dfcd287))
* **redo-undo:** now drag drop FloatInput->label should add to undo stack ([5bfc35f](https://github.com/Wonder-Technology/Wonder-Editor/commit/5bfc35f))
* fix "clone gameObject" and "drag wdb" bug refer to #ab2bd6 ([37fceb9](https://github.com/Wonder-Technology/Wonder-Editor/commit/37fceb9)), closes [#ab2bd6](https://github.com/Wonder-Technology/Wonder-Editor/issues/ab2bd6)
* **scene-tree:** fix "drag scene-tree->gameObject": now refresh engine state ([7e1d670](https://github.com/Wonder-Technology/Wonder-Editor/commit/7e1d670))
* **scene-view:** if current scene tree node has arcballCameraController component, not render gizmo ([7eeb4f1](https://github.com/Wonder-Technology/Wonder-Editor/commit/7eeb4f1))
* **scroll:** fix bug scroll sceneTree, not move scroll bar ([3790b27](https://github.com/Wonder-Technology/Wonder-Editor/commit/3790b27))
* **scroll:** re-calc scroll top and scroll left value ([11b989d](https://github.com/Wonder-Technology/Wonder-Editor/commit/11b989d))
* **scroll:** re-calc scroll top and scroll left value ([2d8c05a](https://github.com/Wonder-Technology/Wonder-Editor/commit/2d8c05a))
* **scroll:** re-calc scroll top and scroll left value ([836f9fc](https://github.com/Wonder-Technology/Wonder-Editor/commit/836f9fc))
* **ui:** fix Header->Controls: now show focus ([a3321c5](https://github.com/Wonder-Technology/Wonder-Editor/commit/a3321c5))


### Features

* **camera:** fix floatInput->drag mouse to select value to label; shouldn't cancel select! ([2d0d3bf](https://github.com/Wonder-Technology/Wonder-Editor/commit/2d0d3bf))
* **camera:** inspector->arcballCameraController add "phi", "theta" field ([991c460](https://github.com/Wonder-Technology/Wonder-Editor/commit/991c460))
* **camera:** inspector->arcballCameraController add "target" field ([61effea](https://github.com/Wonder-Technology/Wonder-Editor/commit/61effea))
* **camera:** now blur inspector->arcballCameraController->field not refresh inspector! ([eb04161](https://github.com/Wonder-Technology/Wonder-Editor/commit/eb04161))
* **console:** asset node/scene tree node->"check relation when drag drop" not not error ([10ee2c5](https://github.com/Wonder-Technology/Wonder-Editor/commit/10ee2c5))
* **console:** now format message ([a4e2679](https://github.com/Wonder-Technology/Wonder-Editor/commit/a4e2679))
* **controls:** add Header->File->Controls to show shortcut keys ([672e115](https://github.com/Wonder-Technology/Wonder-Editor/commit/672e115))
* **engine:** update wonder.js version ([a8b4657](https://github.com/Wonder-Technology/Wonder-Editor/commit/a8b4657))
* **engine:** update wonder.js version to 1.0.0-beta.2 ([f203874](https://github.com/Wonder-Technology/Wonder-Editor/commit/f203874))
* **event:** arcball camera controller->keydown: if is combined key, not set target ([46a2a94](https://github.com/Wonder-Technology/Wonder-Editor/commit/46a2a94))
* **event:** mousewheel now set target ([bbebdaa](https://github.com/Wonder-Technology/Wonder-Editor/commit/bbebdaa))
* **focus:** add focus hotkey ([52a4d33](https://github.com/Wonder-Technology/Wonder-Editor/commit/52a4d33))
* **focus:** calc focus distance with geometry ([9938c58](https://github.com/Wonder-Technology/Wonder-Editor/commit/9938c58))
* **focus:** calc focus distance with geometry ([4811419](https://github.com/Wonder-Technology/Wonder-Editor/commit/4811419))
* **focus:** finish add hotKey "f" to set camera focus target gameObject ([7078ea1](https://github.com/Wonder-Technology/Wonder-Editor/commit/7078ea1))
* **focus:** finish focus scene gameObject and scene children ([1677157](https://github.com/Wonder-Technology/Wonder-Editor/commit/1677157))
* **focus:** fix currentSceneTreeNode and its all children has no geometry component ([30d534b](https://github.com/Wonder-Technology/Wonder-Editor/commit/30d534b))
* **focus:** fix currentSceneTreeNode and its all children has no geometry component ([c1b980d](https://github.com/Wonder-Technology/Wonder-Editor/commit/c1b980d))
* **focus:** now calc currentSceneTreeNode's all children and its self->aabb ([5e96641](https://github.com/Wonder-Technology/Wonder-Editor/commit/5e96641))
* **focus:** now distance not affected by scale ([8af3e39](https://github.com/Wonder-Technology/Wonder-Editor/commit/8af3e39))
* **focus:** now distance not affected by scale ([5d6c5e6](https://github.com/Wonder-Technology/Wonder-Editor/commit/5d6c5e6))
* **focus:** now distance not affected by scale ([c476be3](https://github.com/Wonder-Technology/Wonder-Editor/commit/c476be3))
* **isRoot:** export package/publish local mark scene gameObject->isRoot to false;export scene mark it to true; ([c2a29f3](https://github.com/Wonder-Technology/Wonder-Editor/commit/c2a29f3))
* **picking:** add "pick the same one multiple times to pick the next root gameObject" logic ([bc1a73b](https://github.com/Wonder-Technology/Wonder-Editor/commit/bc1a73b))
* **picking:** find top parent gameObject which is root ([72ff774](https://github.com/Wonder-Technology/Wonder-Editor/commit/72ff774))
* **publish:** update engine files ([de7f675](https://github.com/Wonder-Technology/Wonder-Editor/commit/de7f675))
* **scene-tree:** scene should be common gameObject after import package; change scene gameObject->name from "scene" to "Scene" after import package ([7ea5315](https://github.com/Wonder-Technology/Wonder-Editor/commit/7ea5315)), closes [#a6466](https://github.com/Wonder-Technology/Wonder-Editor/issues/a6466)
* **scene-tree:** scene should be common gameObject(e.g. can add component) ([a646618](https://github.com/Wonder-Technology/Wonder-Editor/commit/a646618))
* **scrollSceneTree:** calc scroll scene tree x axis ([fdbfddb](https://github.com/Wonder-Technology/Wonder-Editor/commit/fdbfddb))
* **scrollSceneTree:** calc scroll scene tree y axis ([5774ba6](https://github.com/Wonder-Technology/Wonder-Editor/commit/5774ba6))
* **ui:** console:should show clear button when not debug ([6395b60](https://github.com/Wonder-Technology/Wonder-Editor/commit/6395b60))
* **ui:** now click select material/geometry name can show group ([c1c8764](https://github.com/Wonder-Technology/Wonder-Editor/commit/c1c8764))
* **ui:** the draged tree node to other one don't to be current tree node ([50f493d](https://github.com/Wonder-Technology/Wonder-Editor/commit/50f493d))



<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.14.0...v1.0.0-beta.1) (2019-02-14)


### Features

* **engine:** update wonder.js to 1.0.0-beta.1 ([772a54f](https://github.com/Wonder-Technology/Wonder-Editor/commit/772a54f))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.13.1...v0.14.0) (2019-02-14)


### Bug Fixes

* **asset:** fix "drag asset to scene tree" ([6e91ac0](https://github.com/Wonder-Technology/Wonder-Editor/commit/6e91ac0))
* **asset:** fix DragEventBaseUtils->_isTreeNodeRelationValid ([ebba42f](https://github.com/Wonder-Technology/Wonder-Editor/commit/ebba42f))
* **event:** fix MainEditor->bind custom event->handle func ([ff3f2ad](https://github.com/Wonder-Technology/Wonder-Editor/commit/ff3f2ad))
* **gulp:** fix gulpfile.js->changeSnapshotPath ([b2fcd55](https://github.com/Wonder-Technology/Wonder-Editor/commit/b2fcd55))
* **left-header:** fix "dispose gameObject":now not refresh engine state after disposeCurrentSceneTreeNode ([a8b70f5](https://github.com/Wonder-Technology/Wonder-Editor/commit/a8b70f5))
* **sceneTree:** fix scene tree node draggable attribute | rename store -> uiState | extract UIStateS ([27f65f2](https://github.com/Wonder-Technology/Wonder-Editor/commit/27f65f2))
* **transform:** fix TransformEngineService->getLocalToWorldMatrixTypeArray ([9f40a1d](https://github.com/Wonder-Technology/Wonder-Editor/commit/9f40a1d))
* **transform:** inspector->transform->scale: value can't be 0; ([69222f5](https://github.com/Wonder-Technology/Wonder-Editor/commit/69222f5))
* **ui:** fix Controller.re:now user dispatch instead send state ([b11a3ae](https://github.com/Wonder-Technology/Wonder-Editor/commit/b11a3ae))


### Features

* **camera:** "arcball camera controller" now bind "point drag start", "point drag drop" event ([b88e485](https://github.com/Wonder-Technology/Wonder-Editor/commit/b88e485))
* **camera:** scene view->arcballCameraController add keydown event ([2401135](https://github.com/Wonder-Technology/Wonder-Editor/commit/2401135))
* **clone:** finish clone gameObject into its parent | finish clone gameObject test ([036c411](https://github.com/Wonder-Technology/Wonder-Editor/commit/036c411))
* **drag:** finish drag into gameObject after or before or into gameObject ([35ba6ed](https://github.com/Wonder-Technology/Wonder-Editor/commit/35ba6ed))
* **drag:** finish drag wdb into sceneTree feature ([98554f0](https://github.com/Wonder-Technology/Wonder-Editor/commit/98554f0))
* **engine:** fix TransformEngineService->changeChildOrder ([6ca57a2](https://github.com/Wonder-Technology/Wonder-Editor/commit/6ca57a2))
* **engine:** rename "indices" to "indices16";use abstract indices; ([518a2b1](https://github.com/Wonder-Technology/Wonder-Editor/commit/518a2b1))
* **engine:** transformEngineService add "changeChildOrder" ([e52e2dc](https://github.com/Wonder-Technology/Wonder-Editor/commit/e52e2dc))
* **engine:** transformEngineService add "changeChildOrder" ([5e5cc0a](https://github.com/Wonder-Technology/Wonder-Editor/commit/5e5cc0a))
* **engine:** TransformEngineService->changeChildOrder: add contract check ([b40eff5](https://github.com/Wonder-Technology/Wonder-Editor/commit/b40eff5))
* **engine:** update wonder.js version ([04e5910](https://github.com/Wonder-Technology/Wonder-Editor/commit/04e5910))
* **engine:** update wonder.js version ([3a9ac8f](https://github.com/Wonder-Technology/Wonder-Editor/commit/3a9ac8f))
* **engine:** update wonder.js version ([39abfae](https://github.com/Wonder-Technology/Wonder-Editor/commit/39abfae))
* **engine:** update wonder.js version ([dab69fd](https://github.com/Wonder-Technology/Wonder-Editor/commit/dab69fd))
* **engine:** wonderjs->transformAPI->unsafeGetTransformParent should return transform instead of Js.Undefined ([a7ac1e3](https://github.com/Wonder-Technology/Wonder-Editor/commit/a7ac1e3))
* **event:** add "drag start", "drag drop" event;rename "drag" event to "drag over" event; ([86b506a](https://github.com/Wonder-Technology/Wonder-Editor/commit/86b506a))
* **event:** fix "trigger arcball event to refresh inspector": now mouse wheel event should refresh inspector ([50cf423](https://github.com/Wonder-Technology/Wonder-Editor/commit/50cf423))
* **event:** now not each point event will trigger loopBody when stop;arcball now not bind keydown event; ([4a281e3](https://github.com/Wonder-Technology/Wonder-Editor/commit/4a281e3))
* **event:** separate mouse button of pick and controller arcball ([dcdfaa1](https://github.com/Wonder-Technology/Wonder-Editor/commit/dcdfaa1))
* **hashMapService:** use MutableHashMapService ([b13c4ab](https://github.com/Wonder-Technology/Wonder-Editor/commit/b13c4ab))
* **hotKey:** bind hotKeys from setting.json ([cb5c109](https://github.com/Wonder-Technology/Wonder-Editor/commit/cb5c109))
* **hotKeys:** add init_hotkeys job in the engine init_jobs.json ([5900c50](https://github.com/Wonder-Technology/Wonder-Editor/commit/5900c50))
* **material:** add UpdateAction in HideMaterialGroup action ([8306319](https://github.com/Wonder-Technology/Wonder-Editor/commit/8306319))
* **picking:** add "intersect with mesh" logic and pass run test ([755a20b](https://github.com/Wonder-Technology/Wonder-Editor/commit/755a20b))
* **picking:** add "pick imgui gameObject" ([cb6c0ec](https://github.com/Wonder-Technology/Wonder-Editor/commit/cb6c0ec))
* **picking:** add GeometryLogicService->setGeometryPoints to remove sphere shape data from editorState ([dfd9593](https://github.com/Wonder-Technology/Wonder-Editor/commit/dfd9593))
* **picking:** add outline(pass compile and run test) ([7675b95](https://github.com/Wonder-Technology/Wonder-Editor/commit/7675b95))
* **picking:** add picking logic(pass compile) ([d5b316b](https://github.com/Wonder-Technology/Wonder-Editor/commit/d5b316b))
* **picking:** add redo-undo ([d792b55](https://github.com/Wonder-Technology/Wonder-Editor/commit/d792b55))
* **picking:** change trigger pick event from pointdown to pointtap ([dd10f12](https://github.com/Wonder-Technology/Wonder-Editor/commit/dd10f12))
* **picking:** fix "find top one of picked ones" ([a2b0b3b](https://github.com/Wonder-Technology/Wonder-Editor/commit/a2b0b3b))
* **picking:** fix "intersect with sphere"->SphereShapeUtils: use applyMatrix4 instead of setFromTranslationAndScale ([b4a5478](https://github.com/Wonder-Technology/Wonder-Editor/commit/b4a5478))
* **picking:** fix "intersect with triangle->intersected point" bug ([d88ddb1](https://github.com/Wonder-Technology/Wonder-Editor/commit/d88ddb1))
* **picking:** fix and test "select scene tree node"->"refresh sceneTree and inspector" logic ([e6bc5c4](https://github.com/Wonder-Technology/Wonder-Editor/commit/e6bc5c4))
* **picking:** fix: if select any transform gameObject when pointtap, not handle pick ([14defe3](https://github.com/Wonder-Technology/Wonder-Editor/commit/14defe3))
* **picking:** now "drag drop rotation gizmo" will not trigger pick ([60d002e](https://github.com/Wonder-Technology/Wonder-Editor/commit/60d002e))
* **picking:** now can pick the geometry which has indices32 data ([76771b2](https://github.com/Wonder-Technology/Wonder-Editor/commit/76771b2))
* **picking:** should set the whole one of the finded one to current scene tree node ([6206098](https://github.com/Wonder-Technology/Wonder-Editor/commit/6206098))
* **picking:** support pick nothing ([c797550](https://github.com/Wonder-Technology/Wonder-Editor/commit/c797550))
* **picking:** use sphere instead of aabb ([6778ed6](https://github.com/Wonder-Technology/Wonder-Editor/commit/6778ed6))
* **ray:** fix RayUtils->checkIntersectPlane->distanceToPlane ([d191a51](https://github.com/Wonder-Technology/Wonder-Editor/commit/d191a51))
* **redo-undo:** "drag translation gzimo drop" add to undo stack ([92660cc](https://github.com/Wonder-Technology/Wonder-Editor/commit/92660cc))
* **redo-undo:** "rotation gizmo" add redo-undo ([9ddf272](https://github.com/Wonder-Technology/Wonder-Editor/commit/9ddf272))
* **redo-undo:** add "scale gizmo" redo-undo ([eb36038](https://github.com/Wonder-Technology/Wonder-Editor/commit/eb36038))
* **redo-undo:** picking: if "not pick" multiple times continuously, only push to stack once ([106d676](https://github.com/Wonder-Technology/Wonder-Editor/commit/106d676))
* **redo-undo:** picking: if "pick the same gameObject" multiple times continuously, only push to stack once ([5710664](https://github.com/Wonder-Technology/Wonder-Editor/commit/5710664))
* **redo-undo:** picking: if not undo any ui state before, undo should still work ([6591aa4](https://github.com/Wonder-Technology/Wonder-Editor/commit/6591aa4))
* **refactor:** refactor LeftHeaderCloneGameObjectEventHandler ([8d13020](https://github.com/Wonder-Technology/Wonder-Editor/commit/8d13020))
* **scene-tree:** fix "drag gameObject" bug ([2f3fef6](https://github.com/Wonder-Technology/Wonder-Editor/commit/2f3fef6))
* **scene-tree:** remove scene graph data from store(remove sceneTreeState); add isShowChildrenMap to editorState->sceneRecord; ([cfd5159](https://github.com/Wonder-Technology/Wonder-Editor/commit/cfd5159))
* **scene-view:** "rotation gizmo" add "limit unuse circle gizmo" logic ([cdbe203](https://github.com/Wonder-Technology/Wonder-Editor/commit/cdbe203))
* **scene-view:** "rotation gizmo": add update transform logic ([a1ec234](https://github.com/Wonder-Technology/Wonder-Editor/commit/a1ec234))
* **scene-view:** "rotation gizmo": decrease alphaForUnUsedGizmo ([5685753](https://github.com/Wonder-Technology/Wonder-Editor/commit/5685753))
* **scene-view:** "rotation gizmo": now xz, yz circle can work ([a12c77b](https://github.com/Wonder-Technology/Wonder-Editor/commit/a12c77b))
* **scene-view:** "scale gizmo": add "select axis/center box"; add "drag axis/center box"; ([2b0b8f5](https://github.com/Wonder-Technology/Wonder-Editor/commit/2b0b8f5))
* **scene-view:** "transform gizmo": add "switch world coordinate system" ui ([fba343d](https://github.com/Wonder-Technology/Wonder-Editor/commit/fba343d))
* **scene-view:** "transform gizmo": support world coordinate system ([05dda11](https://github.com/Wonder-Technology/Wonder-Editor/commit/05dda11))
* **scene-view:** "translation plane gizmos" add "move translation plane gizmo" logic ([978f7d9](https://github.com/Wonder-Technology/Wonder-Editor/commit/978f7d9))
* **scene-view:** "translation plane gizmos" support drag ([f95e806](https://github.com/Wonder-Technology/Wonder-Editor/commit/f95e806))
* **scene-view:** "translation plane gizmos"->"select scene tree node" add "moveTranslationPlaneGizmo" logic ([6579c97](https://github.com/Wonder-Technology/Wonder-Editor/commit/6579c97))
* **scene-view:** "translation/rotation gizmo" add "set current gizmo color to white" logic ([3d3e24d](https://github.com/Wonder-Technology/Wonder-Editor/commit/3d3e24d))
* **scene-view:** add "drag rotation gizmo logic"(only xy circle) ([b71dd4d](https://github.com/Wonder-Technology/Wonder-Editor/commit/b71dd4d))
* **scene-view:** add "select rotation gizmo logic"(only xy circle) ([3541c4c](https://github.com/Wonder-Technology/Wonder-Editor/commit/3541c4c))
* **scene-view:** add "transform gizmo radio" ui ([cd6b378](https://github.com/Wonder-Technology/Wonder-Editor/commit/cd6b378))
* **scene-view:** add translation plane gizmos ([7003d39](https://github.com/Wonder-Technology/Wonder-Editor/commit/7003d39))
* **scene-view:** begin "scale gizmo": add switch button;disable coordinate system button with scale; ([f1d608a](https://github.com/Wonder-Technology/Wonder-Editor/commit/f1d608a))
* **scene-view:** begin add "rotation gizmo": now can show gizmo ([7cbd7d6](https://github.com/Wonder-Technology/Wonder-Editor/commit/7cbd7d6))
* **scene-view:** begin add transform->"translation gameObjects" to scene view(draft logic) ([50d03e1](https://github.com/Wonder-Technology/Wonder-Editor/commit/50d03e1))
* **scene-view:** continue fix "scale gizmo"->"set whole gizmo rotation" bug  (refer to [#2](https://github.com/Wonder-Technology/Wonder-Editor/issues/2)d9cc) ([11f668e](https://github.com/Wonder-Technology/Wonder-Editor/commit/11f668e)), closes [#2d9](https://github.com/Wonder-Technology/Wonder-Editor/issues/2d9)
* **scene-view:** drag translation gizmos should refresh inspector ([8a7c721](https://github.com/Wonder-Technology/Wonder-Editor/commit/8a7c721))
* **scene-view:** ensure "scale gizmo"->axis/center box not drag to nearly zero ([02271f9](https://github.com/Wonder-Technology/Wonder-Editor/commit/02271f9))
* **scene-view:** expand translation axis->aabb ([3320ac9](https://github.com/Wonder-Technology/Wonder-Editor/commit/3320ac9))
* **scene-view:** fix "affect rotation gizmo"->now can refresh inspector->rotation ([7a2f3e7](https://github.com/Wonder-Technology/Wonder-Editor/commit/7a2f3e7))
* **scene-view:** fix "find plane for get intersect point" ([314ce20](https://github.com/Wonder-Technology/Wonder-Editor/commit/314ce20))
* **scene-view:** fix "point drag start"->_isSelectTranslationAxisGizmo->isIntersectAABB->expand aabb ([5c849dc](https://github.com/Wonder-Technology/Wonder-Editor/commit/5c849dc))
* **scene-view:** fix "point drag start"->_isSelectTranslationAxisGizmo->isIntersectAABB->expand aabb ([8fdd950](https://github.com/Wonder-Technology/Wonder-Editor/commit/8fdd950))
* **scene-view:** fix "scale gizmo"->"set whole gizmo rotation" bug ([2d9336f](https://github.com/Wonder-Technology/Wonder-Editor/commit/2d9336f))
* **scene-view:** fix "select translation gizmo": intersect "with mesh" instead of "with aabb" ([9d50fde](https://github.com/Wonder-Technology/Wonder-Editor/commit/9d50fde))
* **scene-view:** fix "select translation->axis gizmo": intersect "with obb" instead of "with mesh" ([f3b4427](https://github.com/Wonder-Technology/Wonder-Editor/commit/f3b4427))
* **scene-view:** fix "translation gizmo" ([47f9aa6](https://github.com/Wonder-Technology/Wonder-Editor/commit/47f9aa6))
* **scene-view:** fix "translation gizmo"->yz plane->"set current gizmo color to white" logic ([2ac683a](https://github.com/Wonder-Technology/Wonder-Editor/commit/2ac683a))
* **scene-view:** fix "translation x axis"->inverse direction ([694f1ce](https://github.com/Wonder-Technology/Wonder-Editor/commit/694f1ce))
* **scene-view:** handle "not get intersect point with plane" case ([5312504](https://github.com/Wonder-Technology/Wonder-Editor/commit/5312504))
* **scene-view:** initTransformGizmosJob now bind "point drag start" event instead of "point down" event ([2f7cce5](https://github.com/Wonder-Technology/Wonder-Editor/commit/2f7cce5))
* **scene-view:** not print ([b99e3f1](https://github.com/Wonder-Technology/Wonder-Editor/commit/b99e3f1))
* **scene-view:** now "drag drop rotation gizmo" will clear rotation data ([0592a20](https://github.com/Wonder-Technology/Wonder-Editor/commit/0592a20))
* **scene-view:** now "render translation gameObjects"->rotation can work correctly(when has parent) ([9dfc4aa](https://github.com/Wonder-Technology/Wonder-Editor/commit/9dfc4aa))
* **scene-view:** now first draw zAxis; then draw yAxis; then draw xAxis ([ba80018](https://github.com/Wonder-Technology/Wonder-Editor/commit/ba80018))
* **scene-view:** now if drag end, still show translation gameObjects and keep pick ([ec1de15](https://github.com/Wonder-Technology/Wonder-Editor/commit/ec1de15))
* **scene-view:** now move translation gameObjects along axis ([244a16e](https://github.com/Wonder-Technology/Wonder-Editor/commit/244a16e))
* **scene-view:** now only mouse->left button should affect transform gameObjects ([9b17466](https://github.com/Wonder-Technology/Wonder-Editor/commit/9b17466))
* **scene-view:** scale translation gameObjects based on the distance between currentSceneTreeNode and camera ([36e033a](https://github.com/Wonder-Technology/Wonder-Editor/commit/36e033a))
* **scene-view:** select scene tree should update translation gameObjects ([05a9708](https://github.com/Wonder-Technology/Wonder-Editor/commit/05a9708))
* **scene-view:** support "drag translation gizmos" ([80169b9](https://github.com/Wonder-Technology/Wonder-Editor/commit/80169b9))
* **scenetree:** finish drag into scene gameObject css ([179bdac](https://github.com/Wonder-Technology/Wonder-Editor/commit/179bdac))
* **scenetree:** finish drag into scene gameObject css ([362905d](https://github.com/Wonder-Technology/Wonder-Editor/commit/362905d))
* **scenetree:** finish drag into scene gameObject css ([7195d47](https://github.com/Wonder-Technology/Wonder-Editor/commit/7195d47))
* **sceneTree:** add gameObject should add to current sceneTree node ([fd45ec5](https://github.com/Wonder-Technology/Wonder-Editor/commit/fd45ec5))
* **sceneTree:** add gameObject should add to current sceneTree node ([fef2243](https://github.com/Wonder-Technology/Wonder-Editor/commit/fef2243))
* **sceneTree:** finish drag sceneTree node to be scene first child ([2477ab8](https://github.com/Wonder-Technology/Wonder-Editor/commit/2477ab8))
* **sceneTree:** finish sceneTree drag node into borther css ([778026a](https://github.com/Wonder-Technology/Wonder-Editor/commit/778026a))
* **sceneTree:** finish sceneTree drag node into borther css ([f419397](https://github.com/Wonder-Technology/Wonder-Editor/commit/f419397))
* **sphere:** add sphere gameObject | change gameObject type Box->Cude ([fdc9050](https://github.com/Wonder-Technology/Wonder-Editor/commit/fdc9050))
* **sphere:** add sphere gameObject | change gameObject type Box->Cude ([a88ad0a](https://github.com/Wonder-Technology/Wonder-Editor/commit/a88ad0a))
* **texture:** finish add texture group css ([d5d2c19](https://github.com/Wonder-Technology/Wonder-Editor/commit/d5d2c19))
* **texture:** finish add texture group in light material ([052069e](https://github.com/Wonder-Technology/Wonder-Editor/commit/052069e))
* update wonder-commonlib version ([21a4dc4](https://github.com/Wonder-Technology/Wonder-Editor/commit/21a4dc4))
* update wonder-commonlib version ([7b80bfc](https://github.com/Wonder-Technology/Wonder-Editor/commit/7b80bfc))
* use WonderCommonlib.ImmutableSparseMapService(pass compile) ([8c3d867](https://github.com/Wonder-Technology/Wonder-Editor/commit/8c3d867))
* **texture:** finish sort texture by name ([00dcfb4](https://github.com/Wonder-Technology/Wonder-Editor/commit/00dcfb4))
* **texture:** fix "sort texture by name" bug ([40807f6](https://github.com/Wonder-Technology/Wonder-Editor/commit/40807f6))
* **transform:** move TransformEngineService->changeChildOrder implement to wonder.js ([3519a07](https://github.com/Wonder-Technology/Wonder-Editor/commit/3519a07))
* **ui:** floatInput now support "drag to change value" ([85bb637](https://github.com/Wonder-Technology/Wonder-Editor/commit/85bb637))
* **ui:** floatInput->"drag to change value": handle canBeZero ([43c648f](https://github.com/Wonder-Technology/Wonder-Editor/commit/43c648f))


### Performance Improvements

* **event:** now when trigger event, not refresh inspector(except current scene tree node is arcball) ([fea97fc](https://github.com/Wonder-Technology/Wonder-Editor/commit/fea97fc))
* **picking:** optimize _computeSphereShapeData: now set editorState to store sphere shape data ([b07d909](https://github.com/Wonder-Technology/Wonder-Editor/commit/b07d909))



<a name="0.13.1"></a>
## [0.13.1](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.13.0...v0.13.1) (2018-12-01)


### Features

* **ui:** console: remove header ui when not debug ([0932a74](https://github.com/Wonder-Technology/Wonder-Editor/commit/0932a74))


### Performance Improvements

* **package:** optimize wpk: reduce to half size ([c51e78b](https://github.com/Wonder-Technology/Wonder-Editor/commit/c51e78b))
* **package:** optimize wpk: reduce to half size(fix #c51e78) ([a345592](https://github.com/Wonder-Technology/Wonder-Editor/commit/a345592)), closes [#c51e78](https://github.com/Wonder-Technology/Wonder-Editor/issues/c51e78)



<a name="0.13.0"></a>
# [0.13.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.12.0...v0.13.0) (2018-11-29)


### Bug Fixes

* **asset:** fix "load texture asset(jpg image)"->"apply to lightMaterial"->export->import bug ([ffb2eea](https://github.com/Wonder-Technology/Wonder-Editor/commit/ffb2eea))
* **asset:** fix "load wdb asset"->the wdb->name in the same path should be unique ([7c82de1](https://github.com/Wonder-Technology/Wonder-Editor/commit/7c82de1))
* **asset:** fix drag texture asset to set material map ([6d5e88c](https://github.com/Wonder-Technology/Wonder-Editor/commit/6d5e88c))
* **asset:** fix import->fileReader->type: use extname instead of file.type ([d14f028](https://github.com/Wonder-Technology/Wonder-Editor/commit/d14f028))
* **clone:** fix bug: clone car gameObject ([65b2f87](https://github.com/Wonder-Technology/Wonder-Editor/commit/65b2f87))
* **component:** fix "replace geometry of gameObject": use "remove geometry" instead of "dispose geometry" ([aa5ada5](https://github.com/Wonder-Technology/Wonder-Editor/commit/aa5ada5))
* **event:** fix "trigger refresh_inspector" ([419b9de](https://github.com/Wonder-Technology/Wonder-Editor/commit/419b9de))
* **imgui:** fix "draw direction light"->_convertAnchorFromTopLeftToCenter ([034e49d](https://github.com/Wonder-Technology/Wonder-Editor/commit/034e49d))
* **inspector:** fix "select material" bug ([bb955ed](https://github.com/Wonder-Technology/Wonder-Editor/commit/bb955ed))
* **inspector:** fix "texture inspector"->magFilter: only has Nearest, Linear options ([dce5738](https://github.com/Wonder-Technology/Wonder-Editor/commit/dce5738))
* **inspector:** fix "texture inspector": now change wrap/filter will update texture ([0f7c557](https://github.com/Wonder-Technology/Wonder-Editor/commit/0f7c557))
* **inspector:** fix "when run and has arcballCameraController and is trigger gameView event, transform inspector can't be operate!!!" bug ([961c630](https://github.com/Wonder-Technology/Wonder-Editor/commit/961c630))
* **inspector:** fix inspector->material->map: now can show map correctly ([843085d](https://github.com/Wonder-Technology/Wonder-Editor/commit/843085d))
* **inspector:** fix transform->rotation ([5956a58](https://github.com/Wonder-Technology/Wonder-Editor/commit/5956a58))
* **inspector:** fix transform->rotation ([ed54953](https://github.com/Wonder-Technology/Wonder-Editor/commit/ed54953))
* **inspector:** fix transform->scale: now support 0 ([202885b](https://github.com/Wonder-Technology/Wonder-Editor/commit/202885b))
* **left-header:** fix "remove actived camera's parent gameObject" bug ([6b2faa2](https://github.com/Wonder-Technology/Wonder-Editor/commit/6b2faa2))
* **light:** fix "change direction light to point light if point lights' count > 4 will cause error" bug ([6b035b0](https://github.com/Wonder-Technology/Wonder-Editor/commit/6b035b0))
* **publish:** fix loading ([138f5aa](https://github.com/Wonder-Technology/Wonder-Editor/commit/138f5aa))
* **redo-undo:** fix "undo to the state before run when run" bug ([35df147](https://github.com/Wonder-Technology/Wonder-Editor/commit/35df147))
* **redo-undo:** fix redo-undo->run/stop: now dispatch UpdateStore.All after refresh state when stop ([3675f1a](https://github.com/Wonder-Technology/Wonder-Editor/commit/3675f1a))
* **scene-tree:** fix SceneGraphUtils->addTreeNodeSceneGraphData ([ee41864](https://github.com/Wonder-Technology/Wonder-Editor/commit/ee41864))
* **scene-tree:** run and stop not refresh sceneTree bug ([52fa32c](https://github.com/Wonder-Technology/Wonder-Editor/commit/52fa32c))
* **store:** fix "rename material asset->warn not refresh console unread count" bug ([5770230](https://github.com/Wonder-Technology/Wonder-Editor/commit/5770230))
* **ui:** css: fix console->.header-message ([06faf45](https://github.com/Wonder-Technology/Wonder-Editor/commit/06faf45))
* **ui:** css: fix drag tree->border css ([1583129](https://github.com/Wonder-Technology/Wonder-Editor/commit/1583129))
* **ui:** css: fix MainEditorMaterialMap->.texture-img ([f506bde](https://github.com/Wonder-Technology/Wonder-Editor/commit/f506bde))
* **ui:** fix "Warning: Can't call setState (or forceUpdate) on an unmounted component" ([46365a6](https://github.com/Wonder-Technology/Wonder-Editor/commit/46365a6))
* **ui:** fix MainEditorAssetHeader->"Warning: Can't call setState (or forceUpdate) on an unmounted component" ([ca7201f](https://github.com/Wonder-Technology/Wonder-Editor/commit/ca7201f))
* assetUtils.re-> _handleRemoveWdbNode can't remove cloned wdb gameObject ([6868829](https://github.com/Wonder-Technology/Wonder-Editor/commit/6868829))
* **ui:** improve drag sceneTreeNode/assetTree node ([130791b](https://github.com/Wonder-Technology/Wonder-Editor/commit/130791b))
* **viewport:** fix "restore job"->"set view port": set canvas size instead of full screen size ([055c4ef](https://github.com/Wonder-Technology/Wonder-Editor/commit/055c4ef))
* fix "no camera" info: now auto resize when trigger resize event ([2047a25](https://github.com/Wonder-Technology/Wonder-Editor/commit/2047a25))
* fix MainEditor->resize canvas bug: judge whether gl is exist ([e4545d1](https://github.com/Wonder-Technology/Wonder-Editor/commit/e4545d1))
* fix MainEditor->resizeCanvasAndViewPort ([b7686ed](https://github.com/Wonder-Technology/Wonder-Editor/commit/b7686ed))
* fix MainUtils->init: re now load imgui asset ([4a9b21a](https://github.com/Wonder-Technology/Wonder-Editor/commit/4a9b21a))
* trigger arcball game view event when run: should update inspector ([ac07657](https://github.com/Wonder-Technology/Wonder-Editor/commit/ac07657))


### Features

* **addablecomponent:** finish click other widget close addableComponent ([2094a26](https://github.com/Wonder-Technology/Wonder-Editor/commit/2094a26))
* **addablecomponent:** finish click other widget close addableComponent ([fc89b5f](https://github.com/Wonder-Technology/Wonder-Editor/commit/fc89b5f))
* **asset:** "default scene","added gameObject","added renderGroup->material component" use default light material ([5805104](https://github.com/Wonder-Technology/Wonder-Editor/commit/5805104))
* **asset:** "load glb/gltf":if has TEXCOORD_1, fatal ([d9cd883](https://github.com/Wonder-Technology/Wonder-Editor/commit/d9cd883))
* **asset:** "load gltf zip":handle "gltf not exist" exception ([3a4ada2](https://github.com/Wonder-Technology/Wonder-Editor/commit/3a4ada2))
* **asset:** "load scene wdb" set imgui; "load model wdb" not set imgui ([da7a6f0](https://github.com/Wonder-Technology/Wonder-Editor/commit/da7a6f0))
* **asset:** "rename material asset" add limit ([f24e8e1](https://github.com/Wonder-Technology/Wonder-Editor/commit/f24e8e1))
* **asset:** "wdb asset"->"drag wdb asset" add check light count ([d1854f1](https://github.com/Wonder-Technology/Wonder-Editor/commit/d1854f1))
* **asset:** add "load glb" ([9fb67d0](https://github.com/Wonder-Technology/Wonder-Editor/commit/9fb67d0))
* **asset:** add "remove material asset" logic ([60fc679](https://github.com/Wonder-Technology/Wonder-Editor/commit/60fc679))
* **asset:** add "remove texture from material assets" logic ([38faae1](https://github.com/Wonder-Technology/Wonder-Editor/commit/38faae1))
* **asset:** asset children: sort by type and name ([87208ea](https://github.com/Wonder-Technology/Wonder-Editor/commit/87208ea))
* **asset:** asset tree: sort by name ([7860e03](https://github.com/Wonder-Technology/Wonder-Editor/commit/7860e03))
* **asset:** change "select geometry" and "select material" show order ([2e59ad6](https://github.com/Wonder-Technology/Wonder-Editor/commit/2e59ad6))
* **asset:** change asset default name to no-name name ([56f64e0](https://github.com/Wonder-Technology/Wonder-Editor/commit/56f64e0))
* **asset:** default asset tree node->isShowChildren change to false ([170dd8f](https://github.com/Wonder-Technology/Wonder-Editor/commit/170dd8f))
* **asset:** fix "asset wdb"->"remove and load asset wdb" bug ([59a7e42](https://github.com/Wonder-Technology/Wonder-Editor/commit/59a7e42))
* **asset:** fix "dispose wdb asset": should dispose the wdb gameObject(remove material) ([93ca470](https://github.com/Wonder-Technology/Wonder-Editor/commit/93ca470))
* **asset:** fix "drag wdb asset" to folder bug ([8ed84a6](https://github.com/Wonder-Technology/Wonder-Editor/commit/8ed84a6))
* **asset:** fix "export/import wdb asset and geometry" related bugs ([141592a](https://github.com/Wonder-Technology/Wonder-Editor/commit/141592a))
* **asset:** fix "import wdb": "init all imported gameObjects" instead of init director ([9d09f93](https://github.com/Wonder-Technology/Wonder-Editor/commit/9d09f93))
* **asset:** fix "load asset" type check: shouldn't be .wpk ([0c67e63](https://github.com/Wonder-Technology/Wonder-Editor/commit/0c67e63))
* **asset:** fix "load scene wdb"->init re ([af08603](https://github.com/Wonder-Technology/Wonder-Editor/commit/af08603))
* **asset:** fix "load scene wdb","load model wdb": not bind wdb->arcball cameraController event ([071a1b7](https://github.com/Wonder-Technology/Wonder-Editor/commit/071a1b7))
* **asset:** fix "load wdb asset contain light shouldn't be exceed max count" bug ([09d99ea](https://github.com/Wonder-Technology/Wonder-Editor/commit/09d99ea))
* **asset:** fix "load wdb asset"->if wdb has no material, should has no extracted assets ([2242f84](https://github.com/Wonder-Technology/Wonder-Editor/commit/2242f84))
* **asset:** fix "material asset"-> "change material type" related bugs ([71aad3b](https://github.com/Wonder-Technology/Wonder-Editor/commit/71aad3b))
* **asset:** fix "material asset"->material inspector->"change shader" bugs ([a3fd28b](https://github.com/Wonder-Technology/Wonder-Editor/commit/a3fd28b))
* **asset:** fix "material asset"->material inspector->"set map" bugs ([2b49413](https://github.com/Wonder-Technology/Wonder-Editor/commit/2b49413))
* **asset:** fix "relate asset"->is material,texture,image equal: fix "judge name equal" ([d1f1c00](https://github.com/Wonder-Technology/Wonder-Editor/commit/d1f1c00))
* **asset:** fix "relate wdb assets->image data": now judge uint8Array ([aed8dbb](https://github.com/Wonder-Technology/Wonder-Editor/commit/aed8dbb))
* **asset:** fix "remove texture asset": should affect texture's material's all gameObjects ([ec79edb](https://github.com/Wonder-Technology/Wonder-Editor/commit/ec79edb))
* **asset:** fix "remove texture asset": should remove it from scene->materials ([2ecd735](https://github.com/Wonder-Technology/Wonder-Editor/commit/2ecd735))
* **asset:** fix "remove wdb+undo" bug ([d241cd4](https://github.com/Wonder-Technology/Wonder-Editor/commit/d241cd4))
* **asset:** fix "rename asset name": if rename the same name, shouldn't warn ([b004e29](https://github.com/Wonder-Technology/Wonder-Editor/commit/b004e29))
* **asset:** fix "wdb asset" bugs ([ba98222](https://github.com/Wonder-Technology/Wonder-Editor/commit/ba98222))
* **asset:** fix "wdb asset"->dispose ([0a468ba](https://github.com/Wonder-Technology/Wonder-Editor/commit/0a468ba))
* **asset:** fix geometry asset bug ([d17900b](https://github.com/Wonder-Technology/Wonder-Editor/commit/d17900b))
* **asset:** fix load wdb after load wdb error ([96c21f7](https://github.com/Wonder-Technology/Wonder-Editor/commit/96c21f7))
* **asset:** handle "drag treeNode to target treeNode","double click folder"->isShowChildren ([52729d3](https://github.com/Wonder-Technology/Wonder-Editor/commit/52729d3))
* **asset:** load asset->support load same name file again ([cc5ec10](https://github.com/Wonder-Technology/Wonder-Editor/commit/cc5ec10))
* **asset:** load asset: now not multiple ([c865cc6](https://github.com/Wonder-Technology/Wonder-Editor/commit/c865cc6))
* **asset:** only warn"not support texCoord_1" once ([9744cb9](https://github.com/Wonder-Technology/Wonder-Editor/commit/9744cb9))
* **asset:** optimie MainEditorAssetChildrenNode->render->texture ([38c8633](https://github.com/Wonder-Technology/Wonder-Editor/commit/38c8633))
* **asset:** optimize "asset children node" ([cfc4d8d](https://github.com/Wonder-Technology/Wonder-Editor/commit/cfc4d8d))
* **asset:** optimize "drag wdb asset to scene tree" ([13de7fd](https://github.com/Wonder-Technology/Wonder-Editor/commit/13de7fd))
* **asset:** relation error->warn now only be triggered when drag drop ([797e831](https://github.com/Wonder-Technology/Wonder-Editor/commit/797e831))
* **asset:** rename default geometry->name to Wonder-Default-XXX ([451e91d](https://github.com/Wonder-Technology/Wonder-Editor/commit/451e91d))
* **asset:** support "drag wdb asset" to scene view ([59e08d7](https://github.com/Wonder-Technology/Wonder-Editor/commit/59e08d7))
* **asset:** support "drag wdb asset" to scenetree->treeNode ([07db889](https://github.com/Wonder-Technology/Wonder-Editor/commit/07db889))
* **asset:** support load gltf zip ([f585fbf](https://github.com/Wonder-Technology/Wonder-Editor/commit/f585fbf))
* **assetName:** finish load texture and add material, the asset name should be unquie ([44d2c0d](https://github.com/Wonder-Technology/Wonder-Editor/commit/44d2c0d))
* **assetTree:** finish can't drag asset node into the node which children has same name ([2e53e3d](https://github.com/Wonder-Technology/Wonder-Editor/commit/2e53e3d))
* **assetWdb:** upload asset wdb into asset, get it geometry into geometryNodeMap ([0dd38c1](https://github.com/Wonder-Technology/Wonder-Editor/commit/0dd38c1))
* **camera:** fix "camera projection component"->aspect ([ff72a5b](https://github.com/Wonder-Technology/Wonder-Editor/commit/ff72a5b))
* **cloneGameObject:** store clonedGameObject into clonedGameObjectMap ([739a274](https://github.com/Wonder-Technology/Wonder-Editor/commit/739a274))
* **component:** fix "change geometry"->"show select geometry group widget ([36a4e71](https://github.com/Wonder-Technology/Wonder-Editor/commit/36a4e71))
* **component:** remove BasicMaterial->map(because wdb not support it) ([b99fe9f](https://github.com/Wonder-Technology/Wonder-Editor/commit/b99fe9f))
* **config:** adjust engine->setting.json->buffer ([1ca4337](https://github.com/Wonder-Technology/Wonder-Editor/commit/1ca4337))
* **config:** update setting.json(forget to commit before...) ([cb3c747](https://github.com/Wonder-Technology/Wonder-Editor/commit/cb3c747))
* **console:** "load asset" now handle promise reject ([b5f6d79](https://github.com/Wonder-Technology/Wonder-Editor/commit/b5f6d79))
* **console:** add debug type; add debug,info icon; ([29e6fda](https://github.com/Wonder-Technology/Wonder-Editor/commit/29e6fda))
* **console:** add try catch for loopBody function ([db3fbe4](https://github.com/Wonder-Technology/Wonder-Editor/commit/db3fbe4))
* **console:** assetHeaderUtils->_handleSpecificFuncByTypeAsync use ConsoleUtils.error ([da5a509](https://github.com/Wonder-Technology/Wonder-Editor/commit/da5a509))
* **console:** change console message data to editorState ([5de32bc](https://github.com/Wonder-Technology/Wonder-Editor/commit/5de32bc))
* **console:** finish console css ([cf56574](https://github.com/Wonder-Technology/Wonder-Editor/commit/cf56574))
* **console:** finish MainEditorConsole stub wonder_console obj ([d47e7bd](https://github.com/Wonder-Technology/Wonder-Editor/commit/d47e7bd))
* **console:** finish show unread console message count ([2d994b9](https://github.com/Wonder-Technology/Wonder-Editor/commit/2d994b9))
* **console:** finsh MainEditorConsole show log info component ([313ce62](https://github.com/Wonder-Technology/Wonder-Editor/commit/313ce62))
* **console:** fix console->"if warn in MainEditorBottomComponents ui, will trigger recursive warn" ([ef8941f](https://github.com/Wonder-Technology/Wonder-Editor/commit/ef8941f))
* **console:** fix DirectionEngineService->loopBody->tryCatch ([13f811a](https://github.com/Wonder-Technology/Wonder-Editor/commit/13f811a))
* **console:** fix info->format: support newline ([8636e1a](https://github.com/Wonder-Technology/Wonder-Editor/commit/8636e1a))
* **console:** if no unread message, not show unread count ([204f244](https://github.com/Wonder-Technology/Wonder-Editor/commit/204f244))
* **console:** remove unused trace stack info ([fcc7a3d](https://github.com/Wonder-Technology/Wonder-Editor/commit/fcc7a3d))
* **console:** remove warn,info,log message->type ([cd1009e](https://github.com/Wonder-Technology/Wonder-Editor/commit/cd1009e))
* **console:** simplify debug message ([295babd](https://github.com/Wonder-Technology/Wonder-Editor/commit/295babd))
* **console:** simplify error,fatal message ([8a92ffe](https://github.com/Wonder-Technology/Wonder-Editor/commit/8a92ffe))
* **console:** use ConsoleUtils.xxx instead of WonderLog.Log.xxx ([725b7ae](https://github.com/Wonder-Technology/Wonder-Editor/commit/725b7ae))
* **console:** use error instead of fatal ([bee5a2a](https://github.com/Wonder-Technology/Wonder-Editor/commit/bee5a2a))
* **dispose:** "reallocate geometry": now if geometry buffer nearly full, reallocate(Wonder-Technology/Wonder.js@31af21) ([adfd5d8](https://github.com/Wonder-Technology/Wonder-Editor/commit/adfd5d8))
* **dispose:** fix "reallocate geometry" bug (refer to Wonder-Technology/Wonder.js@7bb487) ([7dafa60](https://github.com/Wonder-Technology/Wonder-Editor/commit/7dafa60))
* **engine:** fix engine->setting.json ([5e299d3](https://github.com/Wonder-Technology/Wonder-Editor/commit/5e299d3))
* **engine:** geometry:support geometry->indices->Uint32Array;asset:change texCoord_1 contract check to warn ([d2a1f16](https://github.com/Wonder-Technology/Wonder-Editor/commit/d2a1f16))
* **engine:** update version ([947c244](https://github.com/Wonder-Technology/Wonder-Editor/commit/947c244))
* **engine:** update wonder.js ([0772417](https://github.com/Wonder-Technology/Wonder-Editor/commit/0772417))
* **engine:** update wonder.js ([8054552](https://github.com/Wonder-Technology/Wonder-Editor/commit/8054552))
* **engine:** update wonder.js version ([9f264c1](https://github.com/Wonder-Technology/Wonder-Editor/commit/9f264c1))
* **engine:** update wonder.js version ([7c58e54](https://github.com/Wonder-Technology/Wonder-Editor/commit/7c58e54))
* **engine:** update wonder.js version ([0d4fbe5](https://github.com/Wonder-Technology/Wonder-Editor/commit/0d4fbe5))
* **engine:** update wonder.js version ([3780387](https://github.com/Wonder-Technology/Wonder-Editor/commit/3780387))
* **engine:** update wonder.js version ([2afcc05](https://github.com/Wonder-Technology/Wonder-Editor/commit/2afcc05))
* **engine:** update wonder.js version ([46d4a0b](https://github.com/Wonder-Technology/Wonder-Editor/commit/46d4a0b))
* **engine:** update wonder.js version ([9be01dc](https://github.com/Wonder-Technology/Wonder-Editor/commit/9be01dc))
* **engine:** update wonder.js version ([0c779f7](https://github.com/Wonder-Technology/Wonder-Editor/commit/0c779f7))
* **engine:** update wonder.js version ([fc3a16d](https://github.com/Wonder-Technology/Wonder-Editor/commit/fc3a16d))
* **engine:** update wonder.js version ([7d77590](https://github.com/Wonder-Technology/Wonder-Editor/commit/7d77590))
* **engine:** update wonder.js version ([638dd6c](https://github.com/Wonder-Technology/Wonder-Editor/commit/638dd6c))
* **engine:** update wonder.js version ([dddcfed](https://github.com/Wonder-Technology/Wonder-Editor/commit/dddcfed))
* **engine:** update wonder.js version to fix bugs ([9989143](https://github.com/Wonder-Technology/Wonder-Editor/commit/9989143))
* **event:** add "judge:is event->target not canvas" logic ([aee40bf](https://github.com/Wonder-Technology/Wonder-Editor/commit/aee40bf))
* **event:** fix drag->drop event ([5a52fe3](https://github.com/Wonder-Technology/Wonder-Editor/commit/5a52fe3))
* **event:** now use mousedown instead of click event to set event target ([df2507c](https://github.com/Wonder-Technology/Wonder-Editor/commit/df2507c))
* **event:** optimize "event->trigger refresh inspector" ([974f070](https://github.com/Wonder-Technology/Wonder-Editor/commit/974f070))
* **event:** optimize sceneTree,assetTree->select ([af03a59](https://github.com/Wonder-Technology/Wonder-Editor/commit/af03a59))
* **export:** "export package","export scene": add "check run" logic ([d056de3](https://github.com/Wonder-Technology/Wonder-Editor/commit/d056de3))
* **export:** add singleInputModal component to set export package name ([901fd5a](https://github.com/Wonder-Technology/Wonder-Editor/commit/901fd5a))
* **export:** export index.js and index.html ([6d9f64d](https://github.com/Wonder-Technology/Wonder-Editor/commit/6d9f64d))
* **export:** finish export assets.json file into zip ([fe45727](https://github.com/Wonder-Technology/Wonder-Editor/commit/fe45727))
* **export:** finish export scene wdb zip file ([b186b7b](https://github.com/Wonder-Technology/Wonder-Editor/commit/b186b7b))
* **export:** finish export wonderpackage.zip file ([fe5b958](https://github.com/Wonder-Technology/Wonder-Editor/commit/fe5b958))
* **exportTexture:** finish handle duplicate texture base64 store ([9c0a54d](https://github.com/Wonder-Technology/Wonder-Editor/commit/9c0a54d))
* **filePath:** finish wdb and json file and folder file path is unique ([e61f9b9](https://github.com/Wonder-Technology/Wonder-Editor/commit/e61f9b9))
* **geometry:** addAssetGeometryService. ([055a755](https://github.com/Wonder-Technology/Wonder-Editor/commit/055a755))
* **geometry:** finish add geometry and test ([904337f](https://github.com/Wonder-Technology/Wonder-Editor/commit/904337f))
* **geometry:** finish change geometry cube-> sphere, and finish test ([716542f](https://github.com/Wonder-Technology/Wonder-Editor/commit/716542f))
* **geometry:** remove geometryNodeMap ([21914db](https://github.com/Wonder-Technology/Wonder-Editor/commit/21914db))
* **header:** fix "click header" ([2c5c29b](https://github.com/Wonder-Technology/Wonder-Editor/commit/2c5c29b))
* **header:** fix "click header" ([8afbcb5](https://github.com/Wonder-Technology/Wonder-Editor/commit/8afbcb5))
* **imageResult:** add postfix in imageBase64NodeMap ([7a26140](https://github.com/Wonder-Technology/Wonder-Editor/commit/7a26140))
* **imgui:** fix EditIMGUIFuncUtils->draw direction,point lights ([cc883cf](https://github.com/Wonder-Technology/Wonder-Editor/commit/cc883cf))
* **import:** add import file postfix check ([e8930a8](https://github.com/Wonder-Technology/Wonder-Editor/commit/e8930a8))
* **import:** finish execute dispatch after import package.zip ([b93f2d4](https://github.com/Wonder-Technology/Wonder-Editor/commit/b93f2d4))
* **import:** finish import folder and json file ([8e46ea2](https://github.com/Wonder-Technology/Wonder-Editor/commit/8e46ea2))
* **import:** finish import wdb file ([ec9352f](https://github.com/Wonder-Technology/Wonder-Editor/commit/ec9352f))
* **import:** finish import wonderpackage demo ([0f36ba3](https://github.com/Wonder-Technology/Wonder-Editor/commit/0f36ba3))
* **inspector:** "select material" now can select all type materials ([2932718](https://github.com/Wonder-Technology/Wonder-Editor/commit/2932718))
* **inspector:** add "default material shield" dom ([4b8cc93](https://github.com/Wonder-Technology/Wonder-Editor/commit/4b8cc93))
* **inspector:** add "select material" logic(pass compile) ([9cf1f70](https://github.com/Wonder-Technology/Wonder-Editor/commit/9cf1f70))
* **inspector:** fix "change material type"->name ([c27c1a8](https://github.com/Wonder-Technology/Wonder-Editor/commit/c27c1a8))
* **inspector:** fix "material asset"->inspector->change material type->name bug ([1e9fcb6](https://github.com/Wonder-Technology/Wonder-Editor/commit/1e9fcb6))
* **inspector:** fix "material inspector"->change shader: now not replace meshRenderer ([8ad0178](https://github.com/Wonder-Technology/Wonder-Editor/commit/8ad0178))
* **inspector:** fix "replace material type" and "remove renderGroup component" bug: use remove old material instead of dispose it ([bdc4e73](https://github.com/Wonder-Technology/Wonder-Editor/commit/bdc4e73))
* **inspector:** geomemtry: sort "select geometry group" by name ([c1a847a](https://github.com/Wonder-Technology/Wonder-Editor/commit/c1a847a))
* **inspector:** material: sort "select material group" by name ([00c2ace](https://github.com/Wonder-Technology/Wonder-Editor/commit/00c2ace))
* **job:** optimize ReallocateCPUMemoryJobUtils: create buffer when dispose too many ([5e04c89](https://github.com/Wonder-Technology/Wonder-Editor/commit/5e04c89))
* **modal:** finish modal component ([1bd6015](https://github.com/Wonder-Technology/Wonder-Editor/commit/1bd6015))
* **package:** "import package": not redo-undo; add "reallocate" logic; clear redo-undo stacks after import success; ([beaab92](https://github.com/Wonder-Technology/Wonder-Editor/commit/beaab92))
* **package:** "relate gameObject and asset"->_isImageNodeDataEqual add "judge uint8Array" logic ([54e272c](https://github.com/Wonder-Technology/Wonder-Editor/commit/54e272c))
* **package:** "relate gameObject and asset"->_isImageNodeDataEqual remove "judge uint8Array" logic ([58dca88](https://github.com/Wonder-Technology/Wonder-Editor/commit/58dca88))
* **package:** add "export package->html,js,data jsons,res" content ([2df3711](https://github.com/Wonder-Technology/Wonder-Editor/commit/2df3711))
* **package:** add "export/import package" logic and "relate wdb gameObjects and assets" logic ([b61d7c8](https://github.com/Wonder-Technology/Wonder-Editor/commit/b61d7c8))
* **package:** add "relate geometry" logic ([62396f0](https://github.com/Wonder-Technology/Wonder-Editor/commit/62396f0))
* **package:** add "version" to wpk->header ([2c32b58](https://github.com/Wonder-Technology/Wonder-Editor/commit/2c32b58))
* **package:** commit export/ files(forget to commit before) ([9d48248](https://github.com/Wonder-Technology/Wonder-Editor/commit/9d48248))
* **package:** export .zip instead of .wonderpackage format ([76a7049](https://github.com/Wonder-Technology/Wonder-Editor/commit/76a7049))
* **package:** fix "dispose geometry" bug ([794ba30](https://github.com/Wonder-Technology/Wonder-Editor/commit/794ba30))
* **package:** fix "export/import package with wdb/material assets"->the game/scene view will render the middle result during import package and finish import ([429b813](https://github.com/Wonder-Technology/Wonder-Editor/commit/429b813))
* **package:** fix "export/import wdb and texture asset" related bugs ([64eb12f](https://github.com/Wonder-Technology/Wonder-Editor/commit/64eb12f))
* **package:** fix "import package with two texture assets, only has one texture asset" bug ([7a2b6f2](https://github.com/Wonder-Technology/Wonder-Editor/commit/7a2b6f2))
* **package:** fix "import package"->"exceed max light count" bug ([380ae3d](https://github.com/Wonder-Technology/Wonder-Editor/commit/380ae3d))
* **package:** fix "import package"->"init gameObject with default material" bug ([f44fbe6](https://github.com/Wonder-Technology/Wonder-Editor/commit/f44fbe6))
* **package:** fix bind arcballCameraController event bug: package should bind event if any basicCameraView is active; add export package cases; ([53860da](https://github.com/Wonder-Technology/Wonder-Editor/commit/53860da))
* **package:** fix bugs ([73627f6](https://github.com/Wonder-Technology/Wonder-Editor/commit/73627f6))
* **package:** fix export/import package bug ([3ddb1ca](https://github.com/Wonder-Technology/Wonder-Editor/commit/3ddb1ca))
* **package:** fix import package after import package error (refer to 96c21f) ([30292bb](https://github.com/Wonder-Technology/Wonder-Editor/commit/30292bb))
* **package:** fix: should keep texture data not change during export,import package ([1590c4b](https://github.com/Wonder-Technology/Wonder-Editor/commit/1590c4b))
* **package:** optimize "export package"->writeBinBufferByBufferViewData ([f86b8f4](https://github.com/Wonder-Technology/Wonder-Editor/commit/f86b8f4))
* **package:** optimize "export package": optimize "write asb,wpk buffer" ([bc661b2](https://github.com/Wonder-Technology/Wonder-Editor/commit/bc661b2))
* **package:** optimize "import package"->dispose assets ([cebccbc](https://github.com/Wonder-Technology/Wonder-Editor/commit/cebccbc))
* **package:** optimize "import package"->relate asset ([9da52c4](https://github.com/Wonder-Technology/Wonder-Editor/commit/9da52c4))
* **package:** optimize export scene wdb ([a7075ce](https://github.com/Wonder-Technology/Wonder-Editor/commit/a7075ce))
* **package:** optimize wpk: now wpk->scene wdb has no geometry,image data ([8a1797f](https://github.com/Wonder-Technology/Wonder-Editor/commit/8a1797f))
* **path:** need unique name path ([cb2978e](https://github.com/Wonder-Technology/Wonder-Editor/commit/cb2978e))
* **publish:** add "publish local" ([38a9c37](https://github.com/Wonder-Technology/Wonder-Editor/commit/38a9c37))
* **publish:** add "useWorker" setting;remove imgui; ([cff83e5](https://github.com/Wonder-Technology/Wonder-Editor/commit/cff83e5))
* **publish:** change setting.json->is_debug from true to false ([c611b35](https://github.com/Wonder-Technology/Wonder-Editor/commit/c611b35))
* **publish:** fix "stream loading can't see scene during loading" bug ([d648de1](https://github.com/Wonder-Technology/Wonder-Editor/commit/d648de1))
* **publish:** fix index.html: remove detect worker ([db466ab](https://github.com/Wonder-Technology/Wonder-Editor/commit/db466ab))
* **publish:** fix worker->direction/point light bug ([f9581c6](https://github.com/Wonder-Technology/Wonder-Editor/commit/f9581c6))
* **redo-undo:** "import package" add redo-undo ([96cfa3d](https://github.com/Wonder-Technology/Wonder-Editor/commit/96cfa3d))
* **redo-undo:** add contract check ([0082a40](https://github.com/Wonder-Technology/Wonder-Editor/commit/0082a40))
* **redo/undo:** finish header loadSceneWdb redo/undo ([3a163de](https://github.com/Wonder-Technology/Wonder-Editor/commit/3a163de))
* **rename:** finish rename asset node add check the same name ([264877f](https://github.com/Wonder-Technology/Wonder-Editor/commit/264877f))
* **rename:** rename XXXWdb.re to XXXWDB.re ([24f6b30](https://github.com/Wonder-Technology/Wonder-Editor/commit/24f6b30))
* **scale:** reset set scale == 0 log message ([bbbac2c](https://github.com/Wonder-Technology/Wonder-Editor/commit/bbbac2c))
* **scene:** add "export scene" ([6f5f703](https://github.com/Wonder-Technology/Wonder-Editor/commit/6f5f703))
* **scene:** adjust camera->near,far ([d45c2bc](https://github.com/Wonder-Technology/Wonder-Editor/commit/d45c2bc))
* **scene:** change Cube->geometry->vertices size from 10 to 1;change its scale from 0.1 to 1; ([6e14d65](https://github.com/Wonder-Technology/Wonder-Editor/commit/6e14d65))
* **scene:** expand grid plane->size ([69640fc](https://github.com/Wonder-Technology/Wonder-Editor/commit/69640fc))
* **scene-tree:** add "Scene" as root ([5f46850](https://github.com/Wonder-Technology/Wonder-Editor/commit/5f46850))
* **scene-tree:** change "drag wdb asset"/"drag gameObject" to scene-tree->isShowChildren ([4da65e4](https://github.com/Wonder-Technology/Wonder-Editor/commit/4da65e4))
* **scene-tree:** default scene tree node->isShowChildren change to false ([59d831e](https://github.com/Wonder-Technology/Wonder-Editor/commit/59d831e))
* **scene-tree:** fix "drag wdb asset to scene tree": should remain other scene tree node's isShowChildren not change ([70520ba](https://github.com/Wonder-Technology/Wonder-Editor/commit/70520ba))
* **scene-tree:** fix "show Scene inspector": should show nothing ([fc62033](https://github.com/Wonder-Technology/Wonder-Editor/commit/fc62033))
* **scene-tree:** remove DragTree ([fdec4ee](https://github.com/Wonder-Technology/Wonder-Editor/commit/fdec4ee))
* **setting:** add config/setting.json ([a69c794](https://github.com/Wonder-Technology/Wonder-Editor/commit/a69c794))
* **shade:** add shade for transform if has arcballCameraController ([8736103](https://github.com/Wonder-Technology/Wonder-Editor/commit/8736103))
* **state:** add "load scene wdb"->"set wdb->actived camera to editorState" logic ([d312506](https://github.com/Wonder-Technology/Wonder-Editor/commit/d312506))
* **state:** arcball: add eventArcballlCameraController_test; run/stop add bind/unbind logic; ([3838265](https://github.com/Wonder-Technology/Wonder-Editor/commit/3838265))
* **state:** begin "use one engine state": finish "render in one canvas", "event" draft ([9f6008f](https://github.com/Wonder-Technology/Wonder-Editor/commit/9f6008f))
* **state:** fix "active basicCameraView" ([fdbaed0](https://github.com/Wonder-Technology/Wonder-Editor/commit/fdbaed0))
* **state:** fix "active scene camera after two loops" ([8b1aac8](https://github.com/Wonder-Technology/Wonder-Editor/commit/8b1aac8))
* **state:** fix "add arcballCameraController" ([41725e2](https://github.com/Wonder-Technology/Wonder-Editor/commit/41725e2))
* **state:** fix "add camera group": now not active added basicCameraView ([7bbc862](https://github.com/Wonder-Technology/Wonder-Editor/commit/7bbc862))
* **state:** fix "change current camera" ([afbc973](https://github.com/Wonder-Technology/Wonder-Editor/commit/afbc973))
* **state:** fix "game view"->imgui: has no imgui ([036181f](https://github.com/Wonder-Technology/Wonder-Editor/commit/036181f))
* **state:** fix "game view"->viewport ([e8d10fa](https://github.com/Wonder-Technology/Wonder-Editor/commit/e8d10fa))
* **state:** fix "load scene wdb"->"load no light scene wdb from scene has light" bug ([58a5abf](https://github.com/Wonder-Technology/Wonder-Editor/commit/58a5abf))
* **state:** fix "load scene wdb"->imgui ([aa41f72](https://github.com/Wonder-Technology/Wonder-Editor/commit/aa41f72))
* **state:** fix "remove camera group component" and "dispose gameObject": unbind arcballCameraController event ([b56e75e](https://github.com/Wonder-Technology/Wonder-Editor/commit/b56e75e))
* **state:** fix "remove camera group" ([e430cd1](https://github.com/Wonder-Technology/Wonder-Editor/commit/e430cd1))
* **state:** fix clear color ([84f0aa0](https://github.com/Wonder-Technology/Wonder-Editor/commit/84f0aa0))
* **state:** fix event: now if is stop, loopBody ([ba8aab0](https://github.com/Wonder-Technology/Wonder-Editor/commit/ba8aab0))
* **state:** fix game view: not render grid plane ([90b5c93](https://github.com/Wonder-Technology/Wonder-Editor/commit/90b5c93))
* **state:** fix imgui->camera,light position bug ([37066f5](https://github.com/Wonder-Technology/Wonder-Editor/commit/37066f5))
* **state:** fix inspector->geometry->show geometry group: filter scene view geometrys ([dc894c6](https://github.com/Wonder-Technology/Wonder-Editor/commit/dc894c6))
* **state:** fix MainEditorLightUtils->replaceLightByType ([c355a5d](https://github.com/Wonder-Technology/Wonder-Editor/commit/c355a5d))
* **state:** fix prepareRenderSceneViewJob->imgui ([86a6dc6](https://github.com/Wonder-Technology/Wonder-Editor/commit/86a6dc6))
* **state:** fix PrepareRenderViewJobUtils->"active game view camera" bug: ([2e54afb](https://github.com/Wonder-Technology/Wonder-Editor/commit/2e54afb))
* **state:** fix redo/undo ([7683b5a](https://github.com/Wonder-Technology/Wonder-Editor/commit/7683b5a))
* **state:** fix run/stop ([241c7ef](https://github.com/Wonder-Technology/Wonder-Editor/commit/241c7ef))
* **state:** fix viewport ([250001a](https://github.com/Wonder-Technology/Wonder-Editor/commit/250001a))
* **state:** remove ee,re,diff(pass compile) ([5894920](https://github.com/Wonder-Technology/Wonder-Editor/commit/5894920))
* **texture:** finish export and import texture assets.json ([7c3a56d](https://github.com/Wonder-Technology/Wonder-Editor/commit/7c3a56d))
* **todo:** clear TODO ([9a53409](https://github.com/Wonder-Technology/Wonder-Editor/commit/9a53409))
* **ui:** change css->header->padding ([a878e4c](https://github.com/Wonder-Technology/Wonder-Editor/commit/a878e4c))
* **ui:** console->.header-message now break line ([165efa1](https://github.com/Wonder-Technology/Wonder-Editor/commit/165efa1))
* **ui:** css: add antd css map ([116cbc2](https://github.com/Wonder-Technology/Wonder-Editor/commit/116cbc2))
* **ui:** css: fix header->import package->file load input->position ([8ab3459](https://github.com/Wonder-Technology/Wonder-Editor/commit/8ab3459))
* **ui:** css: fix right component->height bug(in firefox) ([6393663](https://github.com/Wonder-Technology/Wonder-Editor/commit/6393663))
* **ui:** css: fix select material/geometry css ([9f25350](https://github.com/Wonder-Technology/Wonder-Editor/commit/9f25350))
* **ui:** css: fix select material/geometry title ([d3baca0](https://github.com/Wonder-Technology/Wonder-Editor/commit/d3baca0))
* **ui:** fix asset ui css ([fc2c7df](https://github.com/Wonder-Technology/Wonder-Editor/commit/fc2c7df))
* **ui:** fix console->.header-message css ([fd0312a](https://github.com/Wonder-Technology/Wonder-Editor/commit/fd0312a))
* **ui:** fix header and modal css ([548b2c7](https://github.com/Wonder-Technology/Wonder-Editor/commit/548b2c7))
* **ui:** fix sceneTree and bottomComponents css ([fe8e12b](https://github.com/Wonder-Technology/Wonder-Editor/commit/fe8e12b))
* **ui:** fix tree css ([b0d869f](https://github.com/Wonder-Technology/Wonder-Editor/commit/b0d869f))
* **ui:** improve sceneTree,assetTree: use mousedown instead of click  to select and toggle children ([2090447](https://github.com/Wonder-Technology/Wonder-Editor/commit/2090447))
* **ui:** inspector->material: change "Shader" to "Type" ([46dadf6](https://github.com/Wonder-Technology/Wonder-Editor/commit/46dadf6))
* rename test.html to index.html ([6603713](https://github.com/Wonder-Technology/Wonder-Editor/commit/6603713))
* **ui:** remove Header->File->section-tail(Ctrl+Z, ...) ([0f203d5](https://github.com/Wonder-Technology/Wonder-Editor/commit/0f203d5))
* add loading ([cec7157](https://github.com/Wonder-Technology/Wonder-Editor/commit/cec7157))
* add logo, icon ([1555ff4](https://github.com/Wonder-Technology/Wonder-Editor/commit/1555ff4))
* **wdb:** finish upload wdb set isRender is false, drag wdb set isRender is true ([4ce9575](https://github.com/Wonder-Technology/Wonder-Editor/commit/4ce9575))
* adjust default scene,cube size,grid plane->data ([7082f70](https://github.com/Wonder-Technology/Wonder-Editor/commit/7082f70))
* begin fix "load scene wdb" ([ce28b75](https://github.com/Wonder-Technology/Wonder-Editor/commit/ce28b75))
* clean TODOs ([2f4d4a0](https://github.com/Wonder-Technology/Wonder-Editor/commit/2f4d4a0))
* decrease default sphere geometry component->radius ([f508884](https://github.com/Wonder-Technology/Wonder-Editor/commit/f508884))
* export,import,publish should work when stop ([2878191](https://github.com/Wonder-Technology/Wonder-Editor/commit/2878191))
* **ui:** use "ReasonReact.null" instead of "set style->display to none" ([948b274](https://github.com/Wonder-Technology/Wonder-Editor/commit/948b274))
* fix "export package/scene"->set name: now can work ([eaf3f49](https://github.com/Wonder-Technology/Wonder-Editor/commit/eaf3f49))
* fix "load scene wdb"->diff ([42e997c](https://github.com/Wonder-Technology/Wonder-Editor/commit/42e997c))
* fix "load scene wdb"->if load no wdb, return ([fa94a9d](https://github.com/Wonder-Technology/Wonder-Editor/commit/fa94a9d))
* fix "load scene wdb"->imgui->draw camera ([04709f6](https://github.com/Wonder-Technology/Wonder-Editor/commit/04709f6))
* fix "load scene wdb"->load twice->imgui ([6006bc2](https://github.com/Wonder-Technology/Wonder-Editor/commit/6006bc2))
* fix "load scene,asset wdb"->active camera ([bed1c77](https://github.com/Wonder-Technology/Wonder-Editor/commit/bed1c77))
* fix "publish" and "export scene"->generate scene wdb ([d443289](https://github.com/Wonder-Technology/Wonder-Editor/commit/d443289))
* fix Header->Help->Version ([473e7f4](https://github.com/Wonder-Technology/Wonder-Editor/commit/473e7f4))
* now AssetUtils->checkAssetNodeName not warn ([5d51d98](https://github.com/Wonder-Technology/Wonder-Editor/commit/5d51d98))
* **wdb:** add "get material/texture assets from loaded wdb asset" logic ([c6e7564](https://github.com/Wonder-Technology/Wonder-Editor/commit/c6e7564))
* optimize getAllGameObjects ([057184f](https://github.com/Wonder-Technology/Wonder-Editor/commit/057184f))
* **update:** add noUpdate into UpdateStore ([436473d](https://github.com/Wonder-Technology/Wonder-Editor/commit/436473d))
* setting.json add "buffer" config ([df67204](https://github.com/Wonder-Technology/Wonder-Editor/commit/df67204))
* update wonder.js, wonder-log version ([6d646a6](https://github.com/Wonder-Technology/Wonder-Editor/commit/6d646a6))
* **wdb:** finish wdb drag into scene ([cb75427](https://github.com/Wonder-Technology/Wonder-Editor/commit/cb75427))
* **wdb:** fix "load asset wdb"->"loaded asset wdb->light will affect scene gameObjects" ([6008d69](https://github.com/Wonder-Technology/Wonder-Editor/commit/6008d69))
* **wdb:** import wdb file instead of scene ([12d3c9d](https://github.com/Wonder-Technology/Wonder-Editor/commit/12d3c9d))


### Performance Improvements

* **event:** loopBody only when event target is scene ([d546cf0](https://github.com/Wonder-Technology/Wonder-Editor/commit/d546cf0))
* **inspector:** optimize "material inspector"->drag,remove map ([890e138](https://github.com/Wonder-Technology/Wonder-Editor/commit/890e138))
* optimize "reInit lightMaterials" ([136cfa0](https://github.com/Wonder-Technology/Wonder-Editor/commit/136cfa0))
* **redo-undo:** fix "point data is dirty" ([1322187](https://github.com/Wonder-Technology/Wonder-Editor/commit/1322187))
* **redo-undo:** if no undo/redo state, not undo/redo and not refresh ([c79eb54](https://github.com/Wonder-Technology/Wonder-Editor/commit/c79eb54))
* **redo-undo:** limit max stack size ([de6bc77](https://github.com/Wonder-Technology/Wonder-Editor/commit/de6bc77))
* **redo-undo:** optimize memory: when stop, clear copiedRedoUndoStackRecord ([eed85d3](https://github.com/Wonder-Technology/Wonder-Editor/commit/eed85d3))
* **redo-undo:** optimize redo-undo->memory ([acfeeca](https://github.com/Wonder-Technology/Wonder-Editor/commit/acfeeca))
* **redo-undo:** optimize redo: not deepCopy engineState ([ba367c6](https://github.com/Wonder-Technology/Wonder-Editor/commit/ba367c6))
* **redo-undo:** optimize restore geometry ([a388e74](https://github.com/Wonder-Technology/Wonder-Editor/commit/a388e74))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.10.0...v0.12.0) (2018-08-14)


### Bug Fixes

* **gameObject:** fix bug:add deep dispose gameObject ([ce2461b](https://github.com/Wonder-Technology/Wonder-Editor/commit/ce2461b))


### Features

* **addGameObject:** extract AddGameObjectType manage gameObject type ([0f9cd42](https://github.com/Wonder-Technology/Wonder-Editor/commit/0f9cd42))
* **assetState:** remove AssetState, change to editorState-> assetRecord ([ee4f41b](https://github.com/Wonder-Technology/Wonder-Editor/commit/ee4f41b))
* **blurEvent:** add check blur value is equal origin value ([9dc80b8](https://github.com/Wonder-Technology/Wonder-Editor/commit/9dc80b8))
* **camera:** add cameraGroup and remove cameraGroup is run, bind and unbind event ([2dc2873](https://github.com/Wonder-Technology/Wonder-Editor/commit/2dc2873))
* **camera:** add cameraGroup cameraView component ([4815161](https://github.com/Wonder-Technology/Wonder-Editor/commit/4815161))
* **camera:** finish camera view component ([a706693](https://github.com/Wonder-Technology/Wonder-Editor/commit/a706693))
* **camera:** finish remove currentCamera feature ([05f0b87](https://github.com/Wonder-Technology/Wonder-Editor/commit/05f0b87))
* **camera:** pass ee engine state->arcball cameraController ([f4d3046](https://github.com/Wonder-Technology/Wonder-Editor/commit/f4d3046))
* **camera:** use camera component instead of basicCameraView and perspectiveCamera ([2d28e00](https://github.com/Wonder-Technology/Wonder-Editor/commit/2d28e00))
* **cameraGroup:** finish mainEditorPerspectiveCamera feature and test ([1affa54](https://github.com/Wonder-Technology/Wonder-Editor/commit/1affa54))
* **cameraView:** add cameraview redo/undo ([15949b4](https://github.com/Wonder-Technology/Wonder-Editor/commit/15949b4))
* **color:** select color show color pick such as unity ([67d972a](https://github.com/Wonder-Technology/Wonder-Editor/commit/67d972a))
* **colorPick:** import colorPick ui component, and finish test ([eb5eeab](https://github.com/Wonder-Technology/Wonder-Editor/commit/eb5eeab))
* **component:** add addableComponent list to add component ([4a5e89c](https://github.com/Wonder-Technology/Wonder-Editor/commit/4a5e89c))
* **component:** add addableComponentBox and add component in gameObject ([468d6a3](https://github.com/Wonder-Technology/Wonder-Editor/commit/468d6a3))
* **component:** add inspectorComponentTypeMap store gameObject's components ([0338039](https://github.com/Wonder-Technology/Wonder-Editor/commit/0338039))
* **component:** finish add component feature ([337454d](https://github.com/Wonder-Technology/Wonder-Editor/commit/337454d))
* **component:** finish remove component feature ([a293dba](https://github.com/Wonder-Technology/Wonder-Editor/commit/a293dba))
* **component:** fix "add component"->init gameObject: now with diff ([e513341](https://github.com/Wonder-Technology/Wonder-Editor/commit/e513341))
* **component:** remove BoxGeometry; rename CustomGeometry to Geometry; ([dc6acad](https://github.com/Wonder-Technology/Wonder-Editor/commit/dc6acad))
* **css:** extract public/css ([c941329](https://github.com/Wonder-Technology/Wonder-Editor/commit/c941329))
* **emptyGameObject:** add empty gameObject ([aea09ee](https://github.com/Wonder-Technology/Wonder-Editor/commit/aea09ee))
* **engine:** add ScreenEngineService->setScreenSize ([c777ea4](https://github.com/Wonder-Technology/Wonder-Editor/commit/c777ea4))
* **engine:** fix engine bug; arcballCameraController not bind event when init, initGameObject ([c0e2258](https://github.com/Wonder-Technology/Wonder-Editor/commit/c0e2258))
* **engine:** update version ([e17ffd0](https://github.com/Wonder-Technology/Wonder-Editor/commit/e17ffd0))
* **engine:** update wonder.js ([ec493ae](https://github.com/Wonder-Technology/Wonder-Editor/commit/ec493ae))
* **engine:** update wonder.js version ([bfbebf6](https://github.com/Wonder-Technology/Wonder-Editor/commit/bfbebf6))
* **engine:** upgrade to 1.0.0-alpha.23 ([7f41102](https://github.com/Wonder-Technology/Wonder-Editor/commit/7f41102))
* **engine:** use GameObjectAPI->getAllXXXComponents api ([edaf617](https://github.com/Wonder-Technology/Wonder-Editor/commit/edaf617))
* **event:** add change currentCamera arcballCameraContollerEvent ([9e22eec](https://github.com/Wonder-Technology/Wonder-Editor/commit/9e22eec))
* **event:** add mouse event into ee and re canvas;remove engine->initEventJob ([e78b1e1](https://github.com/Wonder-Technology/Wonder-Editor/commit/e78b1e1))
* **event:** fix MainUtils->set unsafeGetStateFunc and setStateFunc for event: if is run, not loopBody ([41f7567](https://github.com/Wonder-Technology/Wonder-Editor/commit/41f7567))
* **event:** if is stop, ee should loopBody but re not ([1fd5fd6](https://github.com/Wonder-Technology/Wonder-Editor/commit/1fd5fd6))
* **imgui:** change imguiFunc to pure func ([0f6f64b](https://github.com/Wonder-Technology/Wonder-Editor/commit/0f6f64b))
* **imgui:** each direction light gameObject show one imgui ([2855f8f](https://github.com/Wonder-Technology/Wonder-Editor/commit/2855f8f))
* **imgui:** fix coordinate bug ([ddd7005](https://github.com/Wonder-Technology/Wonder-Editor/commit/ddd7005))
* **imgui:** fix direction light imgui->image x,y ([7438d7f](https://github.com/Wonder-Technology/Wonder-Editor/commit/7438d7f))
* **imgui:** fix imgui->image control->size bug ([4e7851e](https://github.com/Wonder-Technology/Wonder-Editor/commit/4e7851e))
* **imgui:** fix setIMGUIFunc: now get canvas in func ([468ee81](https://github.com/Wonder-Technology/Wonder-Editor/commit/468ee81))
* **imgui:** not serialize/deserialize customData ([872bcdf](https://github.com/Wonder-Technology/Wonder-Editor/commit/872bcdf))
* **imgui:** refactor MainUtils->setIMGUIFunc ([39ea458](https://github.com/Wonder-Technology/Wonder-Editor/commit/39ea458))
* **IMGUI:** add draw directionLight icon ([ab97d88](https://github.com/Wonder-Technology/Wonder-Editor/commit/ab97d88))
* **light:** add directionLight change color and change intensity, add those test ([0db1676](https://github.com/Wonder-Technology/Wonder-Editor/commit/0db1676))
* **light:** add MainEditorLightMaterial ([0e6db9f](https://github.com/Wonder-Technology/Wonder-Editor/commit/0e6db9f))
* **light:** add point light feature and test ([00e0119](https://github.com/Wonder-Technology/Wonder-Editor/commit/00e0119))
* **light:** finish all point light components ([308af0a](https://github.com/Wonder-Technology/Wonder-Editor/commit/308af0a))
* **lightMaterial:** add light material color, map, shininess feature ([594020b](https://github.com/Wonder-Technology/Wonder-Editor/commit/594020b))
* **lightMaterial:** fix change color ([5c266b2](https://github.com/Wonder-Technology/Wonder-Editor/commit/5c266b2))
* **lightMaterial:** fix: add direction light component that should re-init all light material components in the scene ([e1c51ae](https://github.com/Wonder-Technology/Wonder-Editor/commit/e1c51ae))
* **lightMaterial:** fix: dispose gameObject which has light component should re-init all light material components in the scene ([fb5e9c6](https://github.com/Wonder-Technology/Wonder-Editor/commit/fb5e9c6))
* **lightMaterial:** use lightMaterial instead of basicMaterial ([d169f3d](https://github.com/Wonder-Technology/Wonder-Editor/commit/d169f3d))
* **meshRenderer:** add meshRenderer drawMode feature and test ([b485890](https://github.com/Wonder-Technology/Wonder-Editor/commit/b485890))
* **redo/undo:** add select gameObject redo/undo check ([47ef550](https://github.com/Wonder-Technology/Wonder-Editor/commit/47ef550))
* **rename:** stringInput component add isNull field ([25e62c0](https://github.com/Wonder-Technology/Wonder-Editor/commit/25e62c0))
* **renderGroup:** add renderGroup add and show ([77974f5](https://github.com/Wonder-Technology/Wonder-Editor/commit/77974f5))
* **scale:** add transform -> scale ([ddf4994](https://github.com/Wonder-Technology/Wonder-Editor/commit/ddf4994))
* **scene:** use engine sceneGameObject instead of editorState ([5f64e16](https://github.com/Wonder-Technology/Wonder-Editor/commit/5f64e16))
* **state:** rewrite stateLogicService->getAndRefreshEngineStateWithDiff ([ad2d878](https://github.com/Wonder-Technology/Wonder-Editor/commit/ad2d878))
* **texture:** add handleBoxGeometryAddMap and handleCustomGeometryAddMap function ([8c1a76b](https://github.com/Wonder-Technology/Wonder-Editor/commit/8c1a76b))
* **texture:** add texture into MainEditorBasicMaterial ([8472a78](https://github.com/Wonder-Technology/Wonder-Editor/commit/8472a78))
* **texture:** add textureMapData retainedProps in MainEditorInspector ([94c00b0](https://github.com/Wonder-Technology/Wonder-Editor/commit/94c00b0))
* **texture:** change texture name in nodeMap and engineState ([1f58fb8](https://github.com/Wonder-Technology/Wonder-Editor/commit/1f58fb8))
* **texture:** finish add texture and set texture is null redo/undo ([4fd2a50](https://github.com/Wonder-Technology/Wonder-Editor/commit/4fd2a50))
* **texture:** finish add texture into material ([5ade75d](https://github.com/Wonder-Technology/Wonder-Editor/commit/5ade75d))
* **texture:** finish convert image to texture ([84eb435](https://github.com/Wonder-Technology/Wonder-Editor/commit/84eb435))
* **texture:** finish MainEditorBasicMaterial texture component drag event ([f7bd9fc](https://github.com/Wonder-Technology/Wonder-Editor/commit/f7bd9fc))
* **texture:** finish textureInspector show texture props ([f460ea1](https://github.com/Wonder-Technology/Wonder-Editor/commit/f460ea1))
* **texture:** use getAndRefreshEngineStateWithDiff instead of getAndRefreshEngineState ([03e35a5](https://github.com/Wonder-Technology/Wonder-Editor/commit/03e35a5))
* **transform:** add localEulerAngles, eulerAngles api ([6b5beb5](https://github.com/Wonder-Technology/Wonder-Editor/commit/6b5beb5))
* **update:** refactor all shouldUpdate and dispatchFunc ([583f9e8](https://github.com/Wonder-Technology/Wonder-Editor/commit/583f9e8))
* **viewport:** set canvas viewport and resize ([e183b20](https://github.com/Wonder-Technology/Wonder-Editor/commit/e183b20))
* add grid plane gameObject to ee engine state ([d759329](https://github.com/Wonder-Technology/Wonder-Editor/commit/d759329))
* adjust show effect ([eea702e](https://github.com/Wonder-Technology/Wonder-Editor/commit/eea702e))
* extract assetState, redo/undo don't use it ([ece1ae5](https://github.com/Wonder-Technology/Wonder-Editor/commit/ece1ae5))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.10.0...v0.11.0) (2018-07-18)


### Bug Fixes

* **gameObject:** fix bug:add deep dispose gameObject ([ce2461b](https://github.com/Wonder-Technology/Wonder-Editor/commit/ce2461b))


### Features

* **colorPick:** import colorPick ui component, and finish test ([eb5eeab](https://github.com/Wonder-Technology/Wonder-Editor/commit/eb5eeab))
* **redo/undo:** add select gameObject redo/undo check ([47ef550](https://github.com/Wonder-Technology/Wonder-Editor/commit/47ef550))
* **rename:** stringInput component add isNull field ([25e62c0](https://github.com/Wonder-Technology/Wonder-Editor/commit/25e62c0))
* **state:** rewrite stateLogicService->getAndRefreshEngineStateWithDiff ([ad2d878](https://github.com/Wonder-Technology/Wonder-Editor/commit/ad2d878))
* **texture:** add handleBoxGeometryAddMap and handleCustomGeometryAddMap function ([8c1a76b](https://github.com/Wonder-Technology/Wonder-Editor/commit/8c1a76b))
* **texture:** add texture into MainEditorBasicMaterial ([8472a78](https://github.com/Wonder-Technology/Wonder-Editor/commit/8472a78))
* **texture:** add textureMapData retainedProps in MainEditorInspector ([94c00b0](https://github.com/Wonder-Technology/Wonder-Editor/commit/94c00b0))
* extract assetState, redo/undo don't use it ([ece1ae5](https://github.com/Wonder-Technology/Wonder-Editor/commit/ece1ae5))
* **texture:** change texture name in nodeMap and engineState ([1f58fb8](https://github.com/Wonder-Technology/Wonder-Editor/commit/1f58fb8))
* **texture:** finish add texture and set texture is null redo/undo ([4fd2a50](https://github.com/Wonder-Technology/Wonder-Editor/commit/4fd2a50))
* **texture:** finish add texture into material ([5ade75d](https://github.com/Wonder-Technology/Wonder-Editor/commit/5ade75d))
* **texture:** finish convert image to texture ([84eb435](https://github.com/Wonder-Technology/Wonder-Editor/commit/84eb435))
* **texture:** finish MainEditorBasicMaterial texture component drag event ([f7bd9fc](https://github.com/Wonder-Technology/Wonder-Editor/commit/f7bd9fc))
* **texture:** finish textureInspector show texture props ([f460ea1](https://github.com/Wonder-Technology/Wonder-Editor/commit/f460ea1))
* **texture:** use getAndRefreshEngineStateWithDiff instead of getAndRefreshEngineState ([03e35a5](https://github.com/Wonder-Technology/Wonder-Editor/commit/03e35a5))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.9.0...v0.10.0) (2018-06-13)


### Features

* **asset:** add assetTree and finish two tree drag event ([0e1576a](https://github.com/Wonder-Technology/Wonder-Editor/commit/0e1576a))
* **asset:** add drag event check div ([def6454](https://github.com/Wonder-Technology/Wonder-Editor/commit/def6454))
* **asset:** finish add file into assetTree and fileMap ([84d6e20](https://github.com/Wonder-Technology/Wonder-Editor/commit/84d6e20))
* **asset:** finish addFolder feature ([7806e37](https://github.com/Wonder-Technology/Wonder-Editor/commit/7806e37))
* **asset:** finish all drag event relation handle ([a0bf9c0](https://github.com/Wonder-Technology/Wonder-Editor/commit/a0bf9c0))
* **asset:** finish assetType and record operate ([9e9bd27](https://github.com/Wonder-Technology/Wonder-Editor/commit/9e9bd27))
* **asset:** finish drag folder and remove folder ([0d99cb9](https://github.com/Wonder-Technology/Wonder-Editor/commit/0d99cb9))
* **asset:** finish fileInspector rename ([f5006f8](https://github.com/Wonder-Technology/Wonder-Editor/commit/f5006f8))
* **asset:** finish move file to folder ([898ff07](https://github.com/Wonder-Technology/Wonder-Editor/commit/898ff07))
* **asset:** finish readFile and deal with it ([05f5121](https://github.com/Wonder-Technology/Wonder-Editor/commit/05f5121))
* **asset:** finish remove asset node form nodeMap ([05c7650](https://github.com/Wonder-Technology/Wonder-Editor/commit/05c7650))
* **asset:** finish remove file ([60923ee](https://github.com/Wonder-Technology/Wonder-Editor/commit/60923ee))
* **asset:** finish showImg in the specific folder ([fad6708](https://github.com/Wonder-Technology/Wonder-Editor/commit/fad6708))
* **asset:** finish upload json file ([90a778a](https://github.com/Wonder-Technology/Wonder-Editor/commit/90a778a))
* **asset:** show folder in file content ([3c80474](https://github.com/Wonder-Technology/Wonder-Editor/commit/3c80474))
* **engine:** upgrade engine to v1.0.0-alpha.18.3 version ([252bc00](https://github.com/Wonder-Technology/Wonder-Editor/commit/252bc00))
* **engine:** upgrade to v1.0.0-alpha.18.5 ([eb628f2](https://github.com/Wonder-Technology/Wonder-Editor/commit/eb628f2))
* **engine:** upgrade to v1.0.0-alpha.19 ([d1006af](https://github.com/Wonder-Technology/Wonder-Editor/commit/d1006af))
* **redo-undo:** optimize redo: not deep copy current state ([5463e2e](https://github.com/Wonder-Technology/Wonder-Editor/commit/5463e2e))


### Performance Improvements

* **asset:** optimize async test:reduce debounce time to 10ms ([ebf1b6f](https://github.com/Wonder-Technology/Wonder-Editor/commit/ebf1b6f))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.8.0...v0.9.0) (2018-04-19)


### Bug Fixes

* fix "dispose gameObject cause order wrong(scene tree)" bug ([8cecb32](https://github.com/Wonder-Technology/Wonder-Editor/commit/8cecb32))
* need to fix some bug ([bb1e406](https://github.com/Wonder-Technology/Wonder-Editor/commit/bb1e406))
* **engine:** update engine version ([7ad68ee](https://github.com/Wonder-Technology/Wonder-Editor/commit/7ad68ee))
* **redo/undo:** fix bug: change material color and change transform, exec undo throw error ([e6376cd](https://github.com/Wonder-Technology/Wonder-Editor/commit/e6376cd))


### Features

* **controller:** add run and stop check ([b163183](https://github.com/Wonder-Technology/Wonder-Editor/commit/b163183))
* **controller:** can't remove last camera ([d3f6a13](https://github.com/Wonder-Technology/Wonder-Editor/commit/d3f6a13))
* **controller:** finish controller stack redo undo ([3f08b1c](https://github.com/Wonder-Technology/Wonder-Editor/commit/3f08b1c))
* **controller:** finish run and stop undo/redo stack manager ([cd7489f](https://github.com/Wonder-Technology/Wonder-Editor/commit/cd7489f))
* **controller:** finish two engine state init default scene ([ec7e6f8](https://github.com/Wonder-Technology/Wonder-Editor/commit/ec7e6f8))
* **engine:** update version ([bcd54a3](https://github.com/Wonder-Technology/Wonder-Editor/commit/bcd54a3))
* **engine:** update wonder.js to 1.0.0-alpha.17.1; update wonder-commonlib to 0.2.20 ([4f1245f](https://github.com/Wonder-Technology/Wonder-Editor/commit/4f1245f))
* finish stop function cancelAnimationFrame ([c0e6494](https://github.com/Wonder-Technology/Wonder-Editor/commit/c0e6494))
* **run/stop:** add getAndRefreshEngineState function ([a7d29a3](https://github.com/Wonder-Technology/Wonder-Editor/commit/a7d29a3))
* **run/stop:** add two engineState and two canvas ([26c8c41](https://github.com/Wonder-Technology/Wonder-Editor/commit/26c8c41))
* **run/stop:** finish two engineState ([57b663c](https://github.com/Wonder-Technology/Wonder-Editor/commit/57b663c))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.6.0...v0.8.0) (2018-03-15)


### Features

* **addComponent:** finish add component by current GameObject is exist component by json data ([9e7b221](https://github.com/Wonder-Technology/Wonder-Editor/commit/9e7b221))
* **addComponent:** finish add sourceInstance component ([6a399bd](https://github.com/Wonder-Technology/Wonder-Editor/commit/6a399bd))
* **addMaterial:** add material ui component ([0976a40](https://github.com/Wonder-Technology/Wonder-Editor/commit/0976a40))
* **addMaterial:** set current gameObject material color ([73bf6e0](https://github.com/Wonder-Technology/Wonder-Editor/commit/73bf6e0))
* **service:** extract basicMaterial engineState logicService and commonService ([297e972](https://github.com/Wonder-Technology/Wonder-Editor/commit/297e972))
* **service:** extract editorStateData ([c24d87c](https://github.com/Wonder-Technology/Wonder-Editor/commit/c24d87c))
* **service:** extract EditorStateLogicService and EditorStateCommonService and EditorStateFacade ([499a5d2](https://github.com/Wonder-Technology/Wonder-Editor/commit/499a5d2))
* **service:** extract floatService and rename uiState to store ([f3a91aa](https://github.com/Wonder-Technology/Wonder-Editor/commit/f3a91aa))
* **service:** extract GameObjectComposite and GameObjectLogicSingleService ([66ca7a2](https://github.com/Wonder-Technology/Wonder-Editor/commit/66ca7a2))
* **service:** extract GameObjectService and currentGameObjectService ([e2cccfa](https://github.com/Wonder-Technology/Wonder-Editor/commit/e2cccfa))
* **service:** extract GameObjectUtils and SceneTreeUtils ([679dbf4](https://github.com/Wonder-Technology/Wonder-Editor/commit/679dbf4))
* **service:** extract HistoryLogicService and allStateData ([ae8cda7](https://github.com/Wonder-Technology/Wonder-Editor/commit/ae8cda7))
* **service:** extract historyLogicService and finish TODO ([f7e9a7b](https://github.com/Wonder-Technology/Wonder-Editor/commit/f7e9a7b))
* **service:** extract logicComposite service and singleService and facade ([f25d348](https://github.com/Wonder-Technology/Wonder-Editor/commit/f25d348))
* **service:** extract primitive/sceneService and CurrentGameObjectService ([9b41c40](https://github.com/Wonder-Technology/Wonder-Editor/commit/9b41c40))
* **service:** extract state stateTuple record primitive atom service ([3071e3c](https://github.com/Wonder-Technology/Wonder-Editor/commit/3071e3c))
* **service:** extract ui inspector and scenetree ([2580790](https://github.com/Wonder-Technology/Wonder-Editor/commit/2580790))
* **service:** remove AppExtensionView and extract AppExtensionUtils ([3f385c4](https://github.com/Wonder-Technology/Wonder-Editor/commit/3f385c4))
* **service:** remove MainEditorStateView.re and add service in cz.config ([401dd42](https://github.com/Wonder-Technology/Wonder-Editor/commit/401dd42))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.6.0...v0.7.0) (2018-03-02)


### Features

* **addComponent:** finish add component by current GameObject is exist component by json data ([9e7b221](https://github.com/Wonder-Technology/Wonder-Editor/commit/9e7b221))
* **addComponent:** finish add sourceInstance component ([6a399bd](https://github.com/Wonder-Technology/Wonder-Editor/commit/6a399bd))
* **addMaterial:** add material ui component ([0976a40](https://github.com/Wonder-Technology/Wonder-Editor/commit/0976a40))
* **addMaterial:** set current gameObject material color ([73bf6e0](https://github.com/Wonder-Technology/Wonder-Editor/commit/73bf6e0))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.5.0...v0.6.0) (2018-01-29)


### Features

* **main:** use statelessComponentWithRetainedProps instead of statelessComponent ([b8fcda1](https://github.com/Wonder-Technology/Wonder-Editor/commit/b8fcda1))
* **redo/undo:** extract allStateData manage uiState,editorState,engineState ([e4ec871](https://github.com/Wonder-Technology/Wonder-Editor/commit/e4ec871))
* **redo/undo:** extract markRedoUndoChangeXXX module ([6ed0898](https://github.com/Wonder-Technology/Wonder-Editor/commit/6ed0898))
* **redo/undo:** finish redo/undo structure ([145e771](https://github.com/Wonder-Technology/Wonder-Editor/commit/145e771))
* **redo/undo:** import most.js ([baa9cb0](https://github.com/Wonder-Technology/Wonder-Editor/commit/baa9cb0))
* **redo/undo:** use allStateData.history instead of markRedoUndoStack ([bce3282](https://github.com/Wonder-Technology/Wonder-Editor/commit/bce3282))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/Wonder-Technology/Wonder-Editor/compare/v0.4.1...v0.5.0) (2018-01-17)


### Bug Fixes

* **defaultScene:** now have three gameObject but test is 2 ([4b76f72](https://github.com/Wonder-Technology/Wonder-Editor/commit/4b76f72))
* change "DreamForeast" to "Wonder-Technology" ([ef1769e](https://github.com/Wonder-Technology/Wonder-Editor/commit/ef1769e))
* **mainView:** mainEditorMainView.re loop method set editor every frame ([a3d180a](https://github.com/Wonder-Technology/Wonder-Editor/commit/a3d180a))
* **scene-tree:** add drag end event to treeNode ([cf8dd07](https://github.com/Wonder-Technology/Wonder-Editor/commit/cf8dd07))
* **scene-tree:** forget add onDragEnd to treeNode.re ([585bfd0](https://github.com/Wonder-Technology/Wonder-Editor/commit/585bfd0))
* **scenetree:** the move ui component method make the recursion ([f7031e8](https://github.com/Wonder-Technology/Wonder-Editor/commit/f7031e8))
* **sceneTree:** insert to target treeNode is error ([78b58bc](https://github.com/Wonder-Technology/Wonder-Editor/commit/78b58bc))
* **sceneTree:** use makeStringToNumber instead of int_of_string ([3cdc021](https://github.com/Wonder-Technology/Wonder-Editor/commit/3cdc021))


### Features

* **config:** add .cz-config.js ([5e17463](https://github.com/Wonder-Technology/Wonder-Editor/commit/5e17463))
* **disposeGameObject:** add disposeGameObject method in adaptor and operator ([96f1ddd](https://github.com/Wonder-Technology/Wonder-Editor/commit/96f1ddd))
* **engine:** upgrade to v1.0.0-alpha.12 ([22e8f2d](https://github.com/Wonder-Technology/Wonder-Editor/commit/22e8f2d))
* **gameObject:** finish get/set current gameObject ([4af7f7c](https://github.com/Wonder-Technology/Wonder-Editor/commit/4af7f7c))
* **inspector:** add build current gameObject component by json data ([7abfc83](https://github.com/Wonder-Technology/Wonder-Editor/commit/7abfc83))
* **inspector:** extract buildGameObjectComponent method by json data ([35959c1](https://github.com/Wonder-Technology/Wonder-Editor/commit/35959c1))
* **inspector:** import wonder.js setParentKeepOrder ([2284069](https://github.com/Wonder-Technology/Wonder-Editor/commit/2284069))
* **scene-tree:** extract utils/ and external/ ([b2f16b6](https://github.com/Wonder-Technology/Wonder-Editor/commit/b2f16b6))
* **scenetree:** add check objects associate is right ([78b2eab](https://github.com/Wonder-Technology/Wonder-Editor/commit/78b2eab))
* **sceneTree:** add clearGameObjectChildren method and test ([98ef995](https://github.com/Wonder-Technology/Wonder-Editor/commit/98ef995))


### Performance Improvements

* add .rei file to increase test coverage ([ad9783f](https://github.com/Wonder-Technology/Wonder-Editor/commit/ad9783f))
* **scene-tree:** improve isGameObjectRelationError method perf ([cfe246c](https://github.com/Wonder-Technology/Wonder-Editor/commit/cfe246c))



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



