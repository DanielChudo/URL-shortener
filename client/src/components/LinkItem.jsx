import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkItem({ link, index }) {
  const { originalLink, shortLink, code } = link;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <a href={originalLink} target="_blank" rel="noopener noreferrer">
          {originalLink}
        </a>
      </td>
      <td>
        <a href={shortLink} target="_blank" rel="noopener noreferrer">
          {shortLink}
        </a>
      </td>
      <td>
        <Link to={`/details/${code}`}>Посмотреть</Link>
      </td>
    </tr>
  );
}

LinkItem.propTypes = {
  index: PropTypes.number.isRequired,
  link: PropTypes.shape({
    originalLink: PropTypes.string.isRequired,
    shortLink: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

export default LinkItem;
