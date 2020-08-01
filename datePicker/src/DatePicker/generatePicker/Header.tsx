import React from 'react'
import {prefix_cls} from '../../index'
import classnames from 'classnames'
import { PickerType} from './type'

interface Props{
  pickerType:PickerType
}

let cn = prefix_cls+'-header'

export function Header(props:Props){
    const {pickerType} = props
    return <div className={classnames(cn)}>
          <div className={classnames(cn+'-left')}>
              <button><</button>
          </div>
          <div className={classnames(cn+'-mid')}></div>
          <div className={classnames(cn+'-right')}></div>
    </div>
}
