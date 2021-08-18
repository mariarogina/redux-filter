import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { editFilter, selectEditService, deleteService } from '../actions/actionCreators';
import EditIcon  from '../assets/edit.png';
import DeleteIcon  from '../assets/delete.png';

/** Highlight matched parts in string */
const formatMatch = (value, filter) => {
  if (!filter) {
    return value;
  }

  const filterRegExp = new RegExp(`${filter}`, 'gi');
  const parts = value.split(filterRegExp);
  const matches = value.matchAll(filterRegExp);

  let result = '';
  for (const part of parts) {
    const m = matches.next();
    const match = (m.value) ? <b>{m.value[0]}</b> : null;

    result = <>{result}{part}{match}</>;
  }

  return result;
}

const ServiceItem = (props) => {
  const { id, name, price, match, active, filter, onUpdate, onDelete } = props;

  const nameFmt = (match && filter)
    ? formatMatch(name, filter)
    : name;

  return (
    <li
      className={classNames(
        'service-item', {
        'service-item_active': active,
        'service-item_filtered': filter && !match,
      })}
    >
      <span className="service-item__name">{nameFmt}</span>
      <span className="service-item__price">{price}</span>
      <button className="icon-btn" onClick={() => onUpdate(id)} >
        <img src={EditIcon}/>
      </button>
      <button className="icon-btn" onClick={() => onDelete(id)} >
      <img src={DeleteIcon}/>
      </button>
    </li>
  );
}

const ServiceList = () => {
  const list = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(editFilter(e.target.value));
  }

  const handleEdit = (id) => {
    const item = list.items.find((service) => service.id === id);
    dispatch(selectEditService(item));
  }

  const handleDelete = (id) => {
    dispatch(deleteService(id));
  }

  return (
    <>
      <div className="filter-form">
      <div className="service-form__field">
      <label>Filter the list</label>
        <input className="form-input" style={{width:'380px'}} onChange={handleChange} value={list.filter} placeholder="Type to filter" />
        
      </div>
      </div>
      <ul className="service-list">
        {list.items.map((item) =>
          <ServiceItem
            key={item.id}
            {...item}
            active={item.id === list.editing}
            filter={list.filter}
            onUpdate={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </ul>
    </>
  );
};

export default ServiceList;
