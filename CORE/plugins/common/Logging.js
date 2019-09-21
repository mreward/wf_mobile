import _cloneDeep from 'lodash/cloneDeep'

export default {
    Init(dispatch, action) {
        /* eslint-disable */
        // TODO: Improve
        if (_LOG === 'true') {
            const {
                log,
                error,
            } = console;
            try {
                console.log = function(str, ...args) {
                    if (_DEVMOD === 'true') {
                        log.call(console, ...arguments);
                    }

                    dispatch(action, {
                        level: 'log',
                        text: (str || 'null'),
                        args: _cloneDeep(args),
                    }, { root: true });
                };
                console.error = (args, data) => {
                    if (_DEVMOD === 'true') {
                        if (data) {
                            error.call(console, args, data);
                        } else {
                            error.call(console, args);
                        }
                    }
                    let obj = {};

                    if (args.stack) {
                        obj.stack = args.stack;
                        obj.message = args.message;
                    } else if (data && data.stack) {
                        obj.stack = data.stack;
                        obj.message = data.message;
                    } else if (data) {
                        obj.data = data;
                    }

                    if (typeof args === 'string') {
                        obj.message = args;
                    }

                    dispatch(action, {
                        level: 'error',
                        text: obj.message,
                        args: _cloneDeep(obj),
                    }, { root: true });
                };
            } catch (e) {

            }
        }
    },
};
