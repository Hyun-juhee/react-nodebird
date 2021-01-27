import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'

const NodeBird = ({ Component }) => {
  return (
    <>
      <div>공통 메뉴</div>
      <Component />
    </>
  )
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default NodeBird;