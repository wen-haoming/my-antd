import React from 'react'
import {Header} from './Header'
import {GenerateConfig,PickerType,Props} from './type'



export function DatePicker(props:Props){
  const {generateConfig,pickerType} = props;

  return <div>
    <Header pickerType={pickerType}  />
  </div>
}
