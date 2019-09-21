/* eslint-disable */
const path = require('path');
const stringify = require('stringify-object');
const fs = require('fs');
const template = require('lodash/template');
const toArray = require('lodash/toArray');
const isString = require('lodash/isString');
const forEach = require('lodash/forEach');
const startCase = require('lodash/startCase');
const set = require('lodash/set');
const get = require('lodash/get');

const directoryPath = path.join(__dirname, '../modules');

const moduleName = (dir) => {
    const exists = fs.existsSync(path.join(dir, '.config.js'));
    if (exists) {
        const [last, module] = dir.split('/CORE/modules/');
        return module;
    }
};

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach((file) => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : filelist.concat({
                name: file,
                module: moduleName(dir),
                dir,
                path: path.join(dir, file),
            });
    });
    return filelist;
};

const files = walkSync(directoryPath);
const screens = [];
const configs = [];
const commonComponents = [];
const pages = [];
const components = [];


const templateFile = fs.readFileSync(path.join(__dirname, 'README.md')).toString();

files.forEach((file) => {
    if (file.path.search('/docs/screens') !== -1) {
        const screen = file.path.split('mWallet_v4');
        const [modulePath] = screen[1].split('/docs/screens');
        const module = modulePath.replace('/CORE/modules/', '');
        if (isString(module)) {
            const html = `<img src="https://gitlab.walletfactory.com/mobileapp/mwallet_v4/raw/dev${screen[1]}" width="200px">`;
            screens[module] = toArray(screens[module]).concat([html]);
        }
    }

    if (file.name === 'register.js') {
        const register = require(file.path)(file.dir);

        forEach(register, (value, key) => {
            if (value.search('CORE/components/common/') !== -1) {
                commonComponents[file.module] = toArray(commonComponents[file.module]).concat([key]);
                return;
            }

            if (value.search('pages/screen-') !== -1) {
                pages[file.module] = toArray(pages[file.module]).concat([key]);
            }
            //
            // if (value.search('.vue') === -1) {
            //     components[file.module] = toArray(components[file.module]).concat([key]);
            // }
        });
    }
    if (file.name === '.config.js') {
        const config = require(file.path);
        configs[file.module] = config || {};
    }
});

files.forEach((file) => {
    if (file.module) {
        // console.log(file);
        const example = stringify(set({}, `options.modules.${file.module.replace('/', '.')}`, get(configs, `${file.module}.options`)));

        const templateData = {
            _,
            file,
            module: startCase(file.module),
            screens: screens[file.module] || [],
            components: components[file.module] || [],
            commonComponents: commonComponents[file.module] || [],
            pages: pages[file.module] || [],
            config: configs[file.module] || {},
            example,
        };

        const data = template(templateFile)(templateData);
        const pathModule = `${file.dir}/README.md`;
        fs.exists(pathModule, (exists) => {
            if (!exists) {
                fs.writeFile(pathModule, data, { flag: 'w' }, (err) => {
                    if (err) throw err;
                    // console.log("It's saved!");
                });
            }
        });
    }
});
