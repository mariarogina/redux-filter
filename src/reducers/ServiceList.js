import { nanoid } from 'nanoid';
import {
  ADD_SERVICE,
  EDIT_SERVICE,
  SELECT_EDIT_SERVICE,
  EDIT_FILTER,
  DELETE_SERVICE,
  RELOAD_SERVICE_FORM,
} from '../actions/actionTypes';

/**
 * Checks item to match filter
 * Invalid item will not match any filter
 * Empty filter cause any valid item to match
 */
const isMatch = (item, filter) => {
  if (!item) {
    return false;
  }
  if (!filter) {
    return true;
  }

  return item.name.toLowerCase().includes(filter.toLowerCase());
};



const initialState = {
  items: [
    { id: nanoid(), name: 'Замена стекла', price: 21000 },
    { id: nanoid(), name: 'Замена дисплея', price: 25000 },
    { id: nanoid(), name: 'Замена аккумулятора', price: 40000 },
  ],
  editing: null,
  filter: '',
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE: {
      const newItem = { ...action.payload };
      newItem.id = nanoid();
      newItem.price = Number(newItem.price);
      newItem.match = isMatch(newItem, state.filter);

      return {
        ...state,
        items: [
          ...state.items,
          newItem,
        ],
      };
    }

    case EDIT_SERVICE: {
      const editedItem = { ...action.payload };
      editedItem.price = Number(editedItem.price);
      editedItem.match = isMatch(editedItem, state.filter);

      return {
        ...state,
        items: [
          ...state.items.map((item) => (item.id === editedItem.id) ? editedItem : item),
        ],
        editing: null,
      };
    }

    case EDIT_FILTER: {
      const { filter } = action.payload;
      return {
        ...state,
        items: [
          ...state.items.map((item) => ({
            ...item,
            match: isMatch(item, filter),
          }))
        ],
        filter,
      };
    }

    case SELECT_EDIT_SERVICE: {
      const { id } = action.payload;
      return { ...state, editing: id };
    }

    case DELETE_SERVICE: {
      const { id } = action.payload;
      return {
        ...state,
        items: [...state.items.filter((item) => item.id !== id)],
      };
    }

    case RELOAD_SERVICE_FORM: {
      return { ...state, editing: null };
    }

    default:
      return state;
  }
}
