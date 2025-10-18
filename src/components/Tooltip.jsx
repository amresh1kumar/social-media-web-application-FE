import React from 'react';
import { Button, Divider, Space, Tooltip } from 'antd';
const colors = [
   'red',
];
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
const App = () => (
   <>
      <Divider orientation="left">Presets</Divider>
      <Space wrap>
         {colors.map(color => (
            <Tooltip title="prompt text" color={color} key={color}>
               <Button>{color}</Button>
            </Tooltip>
         ))}
      </Space>
      <Divider orientation="left">Custom</Divider>
      <Space wrap>
         {customColors.map(color => (
            <Tooltip title="Click for search" color={color} key={color}>
               <Button>{color}</Button>
            </Tooltip>
         ))}
      </Space>
   </>
);
export default App;