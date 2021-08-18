import {
  EDIT_SERVICE_FIELD,
  VALIDATE_SERVICE_FIELD,
  ADD_SERVICE,
  EDIT_SERVICE,
  SELECT_EDIT_SERVICE,
  RELOAD_SERVICE_FORM,
} from '../actions/actionTypes';

const initialValues = {
  name: '',
  price: '',
};

const initialValidation = {
  name: true,
  price: true,
};

const initialState = {
  values: { ...initialValues },
  validation: { ...initialValidation },
};

export default function serviceFormReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_SERVICE_FIELD: {
      const { name, value } = action.payload;
      return {
        ...state,
        values: { ...state.values, [name]: value },
        validation: { ...initialValidation },
      };
    }

    case VALIDATE_SERVICE_FIELD: {
      const { name } = action.payload;
      return { ...state, validation: { ...state.validation, [name]: false } };
    }

    case SELECT_EDIT_SERVICE: {
      const { id, name, price } = action.payload;
      return {
        ...state,
        values: { id, name, price },
        validation: { ...initialValidation },
      };
    }

    case ADD_SERVICE:
    case EDIT_SERVICE:
    case RELOAD_SERVICE_FORM:
      return { ...initialState };

    default:
      return state;
  }
}
