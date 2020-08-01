import {Dayjs} from 'dayjs'
export type PickerType =  'week' | 'month' | 'quarter' | 'year' | 'date' | 'range'

export type GenerateConfig = {
    onChange:()=>void;
    disableDate?:(current:Dayjs)=>void
}

export interface Props{
  generateConfig:GenerateConfig
  pickerType:PickerType
}
