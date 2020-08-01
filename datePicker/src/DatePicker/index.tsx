import React,{ useEffect,useRef,useState,useMemo } from 'react';
import classNames  from 'classnames';
import './index.less';
import {useReactive} from 'v-reactive-hooks'
import {useDelay} from '../hooks'
import {GeneratePicker} from './generatePicker'
import {PickerType,} from './generatePicker/type'
import { Dayjs } from 'dayjs';

interface Props{
   onChange?:()=>void;
   picker?:PickerType;
   disableDate?:(current:Dayjs)=>void;
}

export const prefix_cls = 'date-picker';

export const DatePicker:React.FC<Props> = (props)=>{
  const {picker = 'date',onChange = ()=>{}} = props;

  let initialVal = useMemo(()=>({
    panelShow:false,
    drownDownTransition:false
  }),[])

  const state =  useReactive(initialVal)
  const inputRef = useRef<HTMLInputElement>(null)
  const penelRef = useRef<HTMLInputElement>(null)


  const [timeout,changeShow] = useDelay(()=>{
    state.drownDownTransition = true
  },()=>{
    state.drownDownTransition = false
    state.panelShow = false
  },200)

  useEffect(()=>{
      if(inputRef.current){
        inputRef.current.addEventListener('focus',()=>{
          if(!state.panelShow && !state.drownDownTransition){
            state.panelShow = true
          }
        })
        document.addEventListener('click',(e)=>{
            if(e.target === inputRef.current || penelRef.current.contains(e.target) )return
                 if(!timeout){
                    changeShow(true)
                  }
            // if( e.target === penelRef) return

        })
      //   inputRef.current.addEventListener('blur',(e)=>{
      //     if(!timeout){
      //       changeShow(true)
      //     }
      // })
      }
  },[inputRef.current])

  return <div className={classNames(prefix_cls)} >
        {/* 输入框 */}
       <div  className={classNames(prefix_cls+'-input')}>
           <input ref={inputRef} placeholder="请选择日期"  type="text"/>
       </div>
        {/* Date panel */}
       <div ref={penelRef} style={{display:state.panelShow?'block':'none'}}  className={classNames(prefix_cls+'-panel',{
           drownDown:state.panelShow,
           drownDownHide:state.drownDownTransition
       })}>
         <GeneratePicker pickerType={picker}  generateConfig={{onChange}}  />
       </div>
  </div>
}



