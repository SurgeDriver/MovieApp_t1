import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { DatePicker } from 'antd'
// import 'antd/dist/antd.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DatePicker/>
  </StrictMode>,
)
