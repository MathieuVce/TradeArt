import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useOpenState } from './useOpenState';
import { useUtils } from './useUtils';
export var usePickerState = function usePickerState(props, valueManager) {
  var disableCloseOnSelect = props.disableCloseOnSelect,
      onAccept = props.onAccept,
      onChange = props.onChange,
      value = props.value;
  var utils = useUtils();

  var _useOpenState = useOpenState(props),
      isOpen = _useOpenState.isOpen,
      setIsOpen = _useOpenState.setIsOpen;

  function initDraftableDate(date) {
    return {
      committed: date,
      draft: date
    };
  }

  var parsedDateValue = React.useMemo(function () {
    return valueManager.parseInput(utils, value);
  }, [valueManager, utils, value]);

  var _React$useState = React.useState(parsedDateValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      lastValidDateValue = _React$useState2[0],
      setLastValidDateValue = _React$useState2[1];

  React.useEffect(function () {
    if (parsedDateValue != null) {
      setLastValidDateValue(parsedDateValue);
    }
  }, [parsedDateValue]);

  var _React$useReducer = React.useReducer(function (state, action) {
    switch (action.type) {
      case 'reset':
        return initDraftableDate(action.payload);

      case 'update':
        return _extends({}, state, {
          draft: action.payload
        });

      default:
        return state;
    }
  }, parsedDateValue, initDraftableDate),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      draftState = _React$useReducer2[0],
      dispatch = _React$useReducer2[1];

  if (!valueManager.areValuesEqual(utils, draftState.committed, parsedDateValue)) {
    dispatch({
      type: 'reset',
      payload: parsedDateValue
    });
  }

  var _React$useState3 = React.useState(draftState.committed),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      initialDate = _React$useState4[0],
      setInitialDate = _React$useState4[1]; // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, because we are just showing text field


  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isMobileKeyboardViewOpen = _React$useState6[0],
      setMobileKeyboardViewOpen = _React$useState6[1];

  var acceptDate = React.useCallback(function (acceptedDate, needClosePicker) {
    onChange(acceptedDate);

    if (needClosePicker) {
      setIsOpen(false);
      setInitialDate(acceptedDate);

      if (onAccept) {
        onAccept(acceptedDate);
      }
    }
  }, [onAccept, onChange, setIsOpen]);
  var wrapperProps = React.useMemo(function () {
    return {
      open: isOpen,
      onClear: function onClear() {
        return acceptDate(valueManager.emptyValue, true);
      },
      onAccept: function onAccept() {
        return acceptDate(draftState.draft, true);
      },
      onDismiss: function onDismiss() {
        return acceptDate(initialDate, true);
      },
      onSetToday: function onSetToday() {
        var now = utils.date();
        dispatch({
          type: 'update',
          payload: now
        });
        acceptDate(now, !disableCloseOnSelect);
      }
    };
  }, [acceptDate, disableCloseOnSelect, isOpen, utils, draftState.draft, valueManager.emptyValue, initialDate]);
  var pickerProps = React.useMemo(function () {
    return {
      date: draftState.draft,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: function toggleMobileKeyboardView() {
        return setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen);
      },
      onDateChange: function onDateChange(newDate, wrapperVariant) {
        var selectionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'partial';
        dispatch({
          type: 'update',
          payload: newDate
        });

        if (selectionState === 'partial') {
          acceptDate(newDate, false);
        }

        if (selectionState === 'finish') {
          var shouldCloseOnSelect = !(disableCloseOnSelect != null ? disableCloseOnSelect : wrapperVariant === 'mobile');
          acceptDate(newDate, shouldCloseOnSelect);
        } // if selectionState === "shallow" do nothing (we already update the draft state)

      }
    };
  }, [acceptDate, disableCloseOnSelect, isMobileKeyboardViewOpen, draftState.draft]);
  var handleInputChange = React.useCallback(function (date, keyboardInputValue) {
    var cleanDate = valueManager.valueReducer ? valueManager.valueReducer(utils, lastValidDateValue, date) : date;
    onChange(cleanDate, keyboardInputValue);
  }, [onChange, valueManager, lastValidDateValue, utils]);
  var inputProps = React.useMemo(function () {
    return {
      onChange: handleInputChange,
      open: isOpen,
      rawValue: value,
      openPicker: function openPicker() {
        return setIsOpen(true);
      }
    };
  }, [handleInputChange, isOpen, value, setIsOpen]);
  var pickerState = {
    pickerProps: pickerProps,
    inputProps: inputProps,
    wrapperProps: wrapperProps
  };
  React.useDebugValue(pickerState, function () {
    return {
      MuiPickerState: {
        pickerDraft: draftState,
        other: pickerState
      }
    };
  });
  return pickerState;
};