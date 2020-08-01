import React, { memo,useContext } from 'react'
import DatePicker from './DatePicker';
import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';
import {ContextType,Context} from '../index'
import Header from './Header'
import {PickerType} from './type'
import {useHandleHeader} from '../../hooks'


 function GeneratePicker(){
  const {pickerType} = useContext<ContextType>(Context)
  // 控制日历头部的自定义hooks
  const handleDateObj = useHandleHeader()
      let renderPicker = ()=>{
      if(pickerType === 'date'){
          return <DatePicker />
      }else if(pickerType === 'year'){
        return <YearPicker/>
      }else if(pickerType === 'month'){
        return <MonthPicker />
      }
      }
      return <>
        <Header {...handleDateObj}/>
        {renderPicker()}
        </>
}

export default memo(GeneratePicker)