import {inject, bindable, bindingMode} from 'aurelia-framework';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

const defaultConfig = {
    enableTime: true,
    altInput: true,
    altFormat: "F j, Y h:i K"
};

@inject(Element)
export class AureliaFlatpickrCustomElement {

    @bindable config = {};
    @bindable({defaultBindingMode: bindingMode.twoWay}) value;

    constructor(element) {
        this.element = element;
    }

    bind() {
        this._config = Object.assign({}, defaultConfig, this.config);

        this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
    }

    attached() {
        this.flatpickr = new Flatpickr(this.element.querySelector('.aurelia-flatpickr'), this._config);

        this.valueChanged();
    }

    onChange(selectedDates, dateStr, instance) {
        if (!this._datesAreSynced(this.value, selectedDates)) {

            switch(selectedDates.length) {
                case 0:
                    this.value = undefined;
                    break;
                case 1:
                    this.value = selectedDates[0];
                    break;
                default:
                    this.value = selectedDates;
                    break;
            }
        }
    }

    valueChanged() {
        if (!this.flatpickr) {
            return;
        }

        if (this._datesAreSynced(this.value, this.flatpickr.selectedDates)) {
            return;
        }

        let newDate;

        if (!this.value) {
            newDate = undefined;
        }
        else if (!Array.isArray(this.value)) {
            newDate = new Date(this.value);
        }
        else {
            newDate = this.value.map(d => newDate(d));
        }

        this.flatpickr.setDate(newDate);
    }

    _datesAreSynced(model, view) {
        let modelDates = Array.isArray(model) ? model : [model];

        for(let d = 0; d < modelDates.length; d++) {
            let modelDate = modelDates[d];

            if (view.indexOf(modelDate)) {
                continue;
            }

            return false;
        }

        for(let d = 0; d < view.length; d++) {
            let viewDate = view[d];

            if (modelDates.indexOf(viewDate)) {
                continue;
            }

            return false;
        }

        return true;
    }
}
