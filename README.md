## Архитектура платформы

- ES6
- Vue2
- Vuex
- OnsenUI2

`build_apk` -
в эту папку копируются собраные сборки

`docs` -
документация по проекту

`libs` -
розличные api клиенты 

`plugins_mwallet` -
плагины или node модули, измененные или написанные нами

`projects` - 
здесь создаем через cordova проекты.  
`.config.mwallet.js` это базовая конфигурация для кошелька   
в каждой папке проекты есть файл `.config.app.js` который хранит в себе конфигурацию  
 кошелька для различных сред `SIT UAT PROD`  
 так же здесь хранится ключ для подписания cборки + `build.json` хранит пароли для ключа которым подписывается приложение  
 
 `ОЧЕНЬ ВАЖНАЯ ВЕЩЬ: кошелек создаем с именем которое будет в продеи после создание и добавление платформ config.xml имзенять запрещено`
 
`src` - содержит в себе компоненты, стили, длирективы, фильтры, картинки, языки, модули, старницы, и стор 
в принципе все понятно по названиям папок 

в страницах у нас реализована уникальаня вещь `реест страниц register.js`
// TODO:


![1](docs/architecture/img/1.png)

##### Идея заключается в том, что бы, всю сложность API и конфигурацию каджого кошелька - вынести отдельно от написания логики старницы.

На страницах мы реализовываем только функции поведения `UI` 
(рендер списков, обработка кликов и т.д)

На примере работы с мастерпас, у нас, что бы сделать оплату или перевод выглядит все примерно так: 

![3](docs/architecture/img/3.png)

что бы этого не делать, в каждоый странице, где есть оплата, пишется модуль для STORE 
и в нем уже происходит обработка всех шагов,
на странице это выглядит так 

    const result = await this.buyProduct(data);
ничего лишнего в коде =)
а все что происходит в модулях STORE ни кого не должно волновать))

##### данный механихм позволяет написать один раз модуль и он будет работать всегда!

#### STORE
STORE у нас не только в качестве хранения данных но и
 выступает в качестве медитора(посредника) между вызовами различных API 

почти в каждом action у нас выполняется:
 - проверка на подключение к интернету
 - получение данных 
 - сохранение в state 
 - сохранение в indexedDb (localforage)
 - обработка ошибок
 
 Для того что бы понимать как все работает 
 нужно хорошо розбираться в `Promises`
и в синтаксису `async/await`



____

Если к примеру, у нас есть `mWallet` клиент `(api)`
к нему будут подключены различные сервисы,
некоторые механизмы форматирование остаются вшитыми в апи клиенте, 
на примере загрузка карт:
![2](docs/architecture/img/2.png)

____


### Сборка
#### Android
##### Релиз версия
Cобирает сборку + минифицирует код, подписывает, сохраняет `NAME.apk` в папку `build_apk` и заливает в `HockeyApp`

    yarn "android r"  

##### Дебаг версия
Cобирает сборку, сохраняет `NAME-debug.apk` в папку `build_apk`

    yarn "android"  

---
#### IOS
##### Релиз версия
Сообирает проект + минифицирует код в папку `wwww`, заменяет имя проекта, версию, `bundleID` 
затем необзодимо собрать сборку через `Xcode`

    yarn "ios r"  

##### Дебаг версия
Сообирает проект + минифицирует код в папку `wwww`, заменяет имя проекта, версию, `bundleID` 
затем необзодимо собрать сборку через `Xcode`

    yarn "ios"  

-----

### Создание иконок для кошельков
после того как будут добавлены платформы в проект, необзодимо создать иконки в 
папке 

    CORE/img/NAME/icon-ios.png
    CORE/img/NAME/icon-android.png

`IOS - 1024x1024` 
`ANDROID - 512x512`

    grunt 'build:gm_picturefill:android'
    grunt 'build:gm_picturefill:ios'
    
-----

### Создание SplashScreens
после того как будут добавлены платформы в проект, необзодимо создать картинку в 
папке   
если будет ошибка на маке, надо установить https://github.com/aheckmann/gm/wiki/Installing-ImageMagick---GraphicsMagick  


    CORE/img/NAME/splash.png

`IOS,ANDROID - 2048x2048`

    grunt build:phonegapsplash:all

-----

### Обновление плагинов
обновление плагинов в кошельке через https://github.com/dpa99c/cordova-check-plugins

    npm install -g cordova-check-plugins
    cd projects/NAME/
    cordova-check-plugins --update=auto

-----

### Создание проекта на основе mWallet

    grunt create --name='AllianceBank' --id='pro.mwallet.aliancebank'

`name` - Имя проекта без пробелов (они же имена папок)  
`id` - id проекта создается по шаблону `pro.mwallet.name`

// TODO: Новые ссылки все выглядят таким образом: sit.api.имя_проекта.mobipay.ua
         где "имя_проекта" одно из :
         
         alif
         nur
         mobipay
         payleh
         vodafon
         forpost
         foxtrot
         okko
         tumar
         canaan
         khalispay
         moticpay


REPLACE LINK TASK
(#(\d{4}))
[$1](https://tm.walletfactory.com/issues/$2)

yarn documentation build CORE/directives/** -f md -o docs/mWallet_v4.wiki/Core/Directives.md
