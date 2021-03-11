import React, { useState,useEffect } from 'react'
import { Checkbox, Divider } from 'antd';
import './App.css';
const CheckboxGroup = Checkbox.Group;
const PictureSelect = ({ pictures ,value = [],onChange = ()=>{}}) => {
  const [checkedList, setCheckedList] = useState([])
  const [checkAll, setCheckAll] = useState(false)
  
  const checkAllFlag = (chooseList) => {
    const res = pictures.every(item => chooseList.find(ele => item.id === ele))
    setCheckAll(res)
  }
  const _onChange = (list) => {
    setCheckedList(list)
    onChange(list)
  }
  const onCheckAllChange = (e) => {
    const curList =e.target.checked ? pictures.map(item => item.id) : [] 
    setCheckedList(curList)
    setCheckAll(!!curList.length)
    onChange(curList)
    
  }
  useEffect(() => {
    setCheckedList(value);
    checkAllFlag(value)
  }, [value])
  return (
    <div>
      <div>
        <Checkbox
          onChange = {onCheckAllChange}
          checked={checkAll}>
          全选(已选中{checkedList.length}张图片)
        </Checkbox>
      </div> 
      <CheckboxGroup
        value={checkedList}
        onChange={_onChange}
      >
        {pictures.map(item => (
          <Checkbox key={item.id} value={item.id}>
            <div><img alt='' src={item.url} style={{ display: "block" }} /><span>{item.name}</span></div>
          </Checkbox>
      ) )}
      </CheckboxGroup>

    </div>
  )
}

const App = () => {
  const [value, setValue] = React.useState(['1']);
  const pictures = [
    {
      id: '1',
      name: 'foo',
      url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
    },
    {
      id: '2',
      name: 'foo',
      url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
    },
    {
      id: '3',
      name: 'foo',
      url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
    },
  ];
  console.log(value);
  return (
    <PictureSelect
      pictures={pictures}
      value={value}
      onChange={(value) => setValue(value)}
    />
  );
}

export default App;
