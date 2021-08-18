import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  addService,
  editService,
  editServiceField,
  validateServiceField,
  reloadServiceForm,
} from '../actions/actionCreators';


const ServiceForm = () => {
  const { values, validation } = useSelector(state => state.serviceForm);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    const { name, value } = e.target;
    dispatch(editServiceField(name, value));
  }

  const handleReload = (e) => {
    e.preventDefault();
    dispatch(reloadServiceForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name.length) {
      dispatch(validateServiceField('name'));
      return;
    }

    const price = Number(values.price);
    if (!price || price < 0) {
      dispatch(validateServiceField('price'));
      return;
    }

    if (values.id) {
      dispatch(editService(values.id, values.name, values.price));
    } else {
      dispatch(addService(values.name, values.price));
    }
  }

  return (
    <form
      className="service-form"
      onSubmit={handleSubmit}
      onReset={handleReload}
    >
      <div className="service-form__field">
        <label>Service name</label>
        <input
          className={classNames('form-input', { 'is-invalid': !validation.name })}
          type="text"
          name="name"
          value={values.name}
          onChange={handleEdit}
        />
        <span className="invalid-feedback">Name can not be empty</span>
      </div>
      <div className="service-form__field">
        <label>Price</label>
        <input
          className={classNames('form-input', { 'is-invalid': !validation.price })}
          type="text"
          name="price"
          value={values.price}
          onChange={handleEdit}
        />
        <span className="invalid-feedback">Price must be a positive number</span>
      </div>
      <button className="form-btn" type="submit">Submit</button>
      { values.id && <button className="form-btn" type="reset">Cancel</button>}
    </form>
  );
};

export default ServiceForm;
