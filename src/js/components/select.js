(function () {
    'use strict';

    var UiSelect = function UiSelect(element, list, label) {
        this.init(element, list, label);
    };

    UiSelect.prototype.checkValue = function (input) {
        var parent = input.parentElement;

        if (input.value) {
            parent.classList.add('ui-has-value');
        } else {
            parent.classList.remove('ui-has-value');
        }
    };

    UiSelect.prototype.upgrade = function (select) {
        var parent = select.parentElement;

        parent.classList.add('ui-upgraded');
    };

    UiSelect.prototype.addInput = function (select) {
        var parent = select.parentElement;

        var input = document.createElement('input');
        input.classList.add('ui-select-input');
        parent.appendChild(input);

        return input;
    };

    UiSelect.prototype.updateOptions = function (select, list, label) {
        if (!list) {
            return;
        }
        for (var i = select.childNodes.length - 1; i >= 0 ; i--) {
            select.removeChild(select.childNodes[i]);
        }

        for (var i = 0; i < list.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.uiValue = list[i];
            option.innerHTML = list[i][label];
            select.appendChild(option);
        }

    };

    UiSelect.prototype.generateList = function (select, input) {
        var parent = select.parentElement;

        var selectIcon = document.createElement('span');
        selectIcon.classList.add('ui-select-icon');
        selectIcon.addEventListener('click', function (e) {
            input.focus();
            input.value = input.value;
        });
        parent.appendChild(selectIcon);

        var list = document.createElement('div');
        list.classList.add('ui-select-options');

        var childNodes = select.options;
        for (var i = 0; i < childNodes.length; i++) {
            list.appendChild(this.createOption(childNodes[i], input, select));
        }

        parent.appendChild(list);
        input.selectList = list;
    };

    UiSelect.prototype.createOption = function (node, input, select) {
        var option = document.createElement('div');
        option.setAttribute('value', node.value);
        option.classList.add('ui-select-option');
        option.textContent = node.textContent;
        option.tabIndex = '0';
        option.addEventListener('click', function (e) {
            input.value = node.label;
            select.value = node.value;
            select.uiValue = node.uiValue;
            input.ui.checkValue(input);
            input.ui.closeSelect(input);
        });
        option.addEventListener('keydown', function (e) {
            var keyCode = e.which || e.keyCode;
            if(keyCode == 13) {
                input.value = node.label;
                select.value = node.value;
                select.uiValue = node.uiValue;
                input.ui.checkValue(input);
            } else if (keyCode == 40) {
                e.target.nextElementSibling.focus();
            } else if (keyCode == 38) {
                e.target.previousElementSibling.focus();
            } else if (keyCode == 27) {
                // close select
                input.ui.closeSelect(input);
            }
        });
        option.addEventListener('blur', function (e) {
            setTimeout(function() {
                if (!document.activeElement.classList || !document.activeElement.classList.contains('ui-select-option')) {
                    input.ui.closeSelect(input);
                }
            }, 0);
        });

        return option;
    };

    UiSelect.prototype.onfocus = function (e) {
        var input = e.target,
            parent = input.parentElement;

        parent.classList.add('ui-on-focus');
        input.selectList.classList.add('opening');
        setTimeout(function() {
            input.selectList.classList.add('is-opened');
            input.selectList.childNodes[0].focus();
        }, 0);

    };

    UiSelect.prototype.onblur = function (e) {
        var select = e.target,
            parent = select.parentElement;
        parent.classList.remove('ui-on-focus');

        this.ui.checkValue(select);
    };

    UiSelect.prototype.closeSelect = function (input) {
        var parent = input.parentElement;
        parent.classList.remove('ui-on-focus');
        input.selectList.classList.remove('is-opened');

        input.ui.checkValue(input);
    };

    UiSelect.prototype.getLabel = function (input) {
        var label = input.previousElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        label = input.nextElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        return null;
    };

    UiSelect.prototype.getValue = function () {
        console.log(this);
    };

    UiSelect.prototype.init = function (select, list, label) {
        this.updateOptions(select, list, label);
        this.upgrade(select);
        var input = this.addInput(select);
        this.checkValue(input);
        this.generateList(select, input);

        input.addEventListener('focus', this.onfocus);
        input.addEventListener('blur', this.onblur);

        var label = this.getLabel(select);

        if (label) {
            label.addEventListener('click', function (e) {
                input.focus();
                input.value = input.value;
            });
        }

        select.ui = input.ui = this;
        select.ui.getValue = function () {
            console.log(select.uiValue);
        };
    };

    ui.register(UiSelect, 'ui-select', 'select');
    ui.select = UiSelect;

})();
