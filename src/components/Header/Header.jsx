import React from 'react'
import './Header.css'
import { Tabs } from 'antd'
import SearchInput from '../SearchInput/SearchInput'
import PropTypes from 'prop-types'

const Header = ({ onSearch, activeTab, onChangeTab }) => {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchInput onSearch={onSearch} />,
    },
    {
      key: '2',
      label: 'Rated',
      children: null,
    },
  ]

  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '1010px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={onChangeTab}
        items={items}
        size="large"
        type="card"
        centered
      />
    </div>
  )
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
}

export default Header
