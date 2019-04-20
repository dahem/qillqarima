import React from 'react';
import { arrayOf, object } from 'prop-types';

const LeftMenu = ({ items }) => (
  <div>
    {items.map(item => (
      <li key={item.href}><a href={`#${item.href}`}>{item.name}</a></li>
    ))}
  </div>
);

LeftMenu.propTypes = {
  items: arrayOf(object).isRequired,
};

export default LeftMenu;
