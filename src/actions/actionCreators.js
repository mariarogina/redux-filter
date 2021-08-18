import {
  ADD_SERVICE,
  EDIT_SERVICE,
  DELETE_SERVICE,
  SELECT_EDIT_SERVICE,
  EDIT_FILTER,
  EDIT_SERVICE_FIELD,
  VALIDATE_SERVICE_FIELD,
  RELOAD_SERVICE_FORM,
} from './actionTypes';

export function addService(name, price) {
  return { type: ADD_SERVICE, payload: { name, price } };
}

export function editService(id, name, price) {
  return { type: EDIT_SERVICE, payload: { id, name, price } };
}

export function deleteService(id) {
  return { type: DELETE_SERVICE, payload: { id } };
}

export function selectEditService(service) {
  return { type: SELECT_EDIT_SERVICE, payload: { ...service } };
}

export function editFilter(filter) {
  return { type: EDIT_FILTER, payload: { filter } };
}

export function editServiceField(name, value) {
  return { type: EDIT_SERVICE_FIELD, payload: { name, value } };
}

export function validateServiceField(name) {
  return { type: VALIDATE_SERVICE_FIELD, payload: { name } };
}

export function reloadServiceForm() {
  return { type: RELOAD_SERVICE_FORM };
}
