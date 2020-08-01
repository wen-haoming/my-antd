import React from 'react'
import dayjs from 'dayjs'
import {DatePicker} from './DatePicker';
import {PickerType,GenerateConfig} from './type'

interface Props{
  pickerType:PickerType;
  generateConfig:GenerateConfig;
}

window.dayjs = dayjs

export function GeneratePicker(props:Props){
  const {pickerType,generateConfig} = props

      if(pickerType === 'date'){
          return <DatePicker pickerType={pickerType}  generateConfig={generateConfig} />
      }else{
        return <div></div>
      }
}

