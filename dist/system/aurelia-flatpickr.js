'use strict';

System.register(['aurelia-pal', 'aurelia-framework', 'flatpickr'], function (_export, _context) {
    "use strict";

    var PLATFORM, inject, bindable, bindingMode, useView, Flatpickr, _typeof, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, defaultConfig, AureliaFlatpickrCustomElement;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    return {
        setters: [function (_aureliaPal) {
            PLATFORM = _aureliaPal.PLATFORM;
        }, function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            bindable = _aureliaFramework.bindable;
            bindingMode = _aureliaFramework.bindingMode;
            useView = _aureliaFramework.useView;
        }, function (_flatpickr) {
            Flatpickr = _flatpickr.default;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            defaultConfig = {
                enableTime: true,
                altInput: true,
                altFormat: "F j, Y h:i K"
            };

            _export('AureliaFlatpickrCustomElement', AureliaFlatpickrCustomElement = (_dec = inject(Element), _dec2 = useView(PLATFORM.moduleName("./aurelia-flatpickr.html")), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
                function AureliaFlatpickrCustomElement(element) {
                    _classCallCheck(this, AureliaFlatpickrCustomElement);

                    _initDefineProp(this, 'config', _descriptor, this);

                    _initDefineProp(this, 'value', _descriptor2, this);

                    this.element = element;
                }

                AureliaFlatpickrCustomElement.prototype.bind = function bind() {
                    this._config = Object.assign({}, defaultConfig, this.config);

                    this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
                };

                AureliaFlatpickrCustomElement.prototype.attached = function attached() {
                    this.flatpickr = new Flatpickr(this.element.querySelector('.aurelia-flatpickr'), this._config);

                    this.valueChanged();
                };

                AureliaFlatpickrCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
                    var _this = this;

                    if (!this._datesAreSynced(this.value, selectedDates)) {

                        switch (selectedDates.length) {
                            case 0:
                                this.value = undefined;
                                break;
                            case 1:
                                this.value = this._cloneDate(selectedDates[0]);
                                break;
                            default:
                                this.value = selectedDates.map(function (d) {
                                    return _this._cloneDate(d);
                                });
                                break;
                        }
                    }
                };

                AureliaFlatpickrCustomElement.prototype.valueChanged = function valueChanged() {
                    var _this2 = this;

                    if (!this.flatpickr) {
                        return;
                    }

                    if (this._datesAreSynced(this.value, this.flatpickr.selectedDates)) {
                        return;
                    }

                    var newDate = void 0;

                    if (!this.value) {
                        newDate = undefined;
                    } else if (!Array.isArray(this.value)) {
                        newDate = this._cloneDate(this.value);
                    } else {
                        newDate = this.value.map(function (d) {
                            return _this2._cloneDate(d);
                        });
                    }

                    this.flatpickr.setDate(newDate);
                };

                AureliaFlatpickrCustomElement.prototype._datesAreSynced = function _datesAreSynced(model, view) {
                    model = model || [];

                    var modelDates = Array.isArray(model) ? model : [model];

                    var _loop = function _loop(d) {
                        var modelDate = modelDates[d];

                        if (view.findIndex(function (v) {
                            return v.valueOf() === modelDate.valueOf();
                        }) > -1) {
                            return 'continue';
                        }

                        return {
                            v: false
                        };
                    };

                    for (var d = 0; d < modelDates.length; d++) {
                        var _ret = _loop(d);

                        switch (_ret) {
                            case 'continue':
                                continue;

                            default:
                                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                        }
                    }

                    var _loop2 = function _loop2(d) {
                        var viewDate = view[d];

                        if (modelDates.findIndex(function (m) {
                            return m.valueOf() === viewDate.valueOf();
                        }) > -1) {
                            return 'continue';
                        }

                        return {
                            v: false
                        };
                    };

                    for (var d = 0; d < view.length; d++) {
                        var _ret2 = _loop2(d);

                        switch (_ret2) {
                            case 'continue':
                                continue;

                            default:
                                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
                        }
                    }

                    return true;
                };

                AureliaFlatpickrCustomElement.prototype._cloneDate = function _cloneDate(d) {
                    return new Date(d.getTime ? d.valueOf() : d);
                };

                return AureliaFlatpickrCustomElement;
            }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'config', [bindable], {
                enumerable: true,
                initializer: function initializer() {
                    return {};
                }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
                enumerable: true,
                initializer: null
            })), _class2)) || _class) || _class));

            _export('AureliaFlatpickrCustomElement', AureliaFlatpickrCustomElement);
        }
    };
});