import React, { useEffect, useRef, useMemo, createContext, useCallback } from "react";
import classNames from "classnames";
import { useReactive } from "v-reactive-hooks";
import { useDelay } from "../hooks";
import  GeneratePicker  from "./generatePicker";
import { PickerType } from "./generatePicker/type";
import { Moment } from "moment";
import moment from 'moment';
import "./index.less";
import { promises } from "fs";

interface Props {
  onChange?:(date:string) => void;
  picker?: PickerType;
  disableDate?: (current: Moment) => void;
  format?:string
  value?:string
  allowClear?:boolean
}

export const prefix_cls = "date-picker";

export const Context = createContext(null);

export type ContextType = {
  pickerType: PickerType
  picker: PickerType;
  changePicker: (type:PickerType)=>void
  year:number;
  month:number;
  date:number;
  addYear:()=>void
  subYear:()=>void
  addMonth:()=>void
  subMonth:()=>void
  format:string
  changeDate:(year:number|boolean,month:number|boolean,date:number|boolean,isChangeInput?:boolean)=>void
  inputVal:string
  closePanel:()=>void;
}

let date = new Date();

let nowYear = date.getFullYear();
let nowMonth = date.getMonth()+1;
let nowDate = date.getDate();


export const DatePicker: React.FC<Props> = (props) => {

  const {
    picker = "date",
    onChange =(date:string) => {},
    format = 'YYYY-MM-DD',
    value = new Date(),
    allowClear = false
   } = props;

  let initialVal = useMemo(
    () => ({
      panelShow: false,
      panelTransition: false,
      picker,
      year:nowYear,
      month:nowMonth,
      date:nowDate,
      inputVal:'',
      showAllowClear:false
    }),
    []
  );

  const state = useReactive(initialVal);

  const inputRef = useRef<HTMLInputElement>(null);
  const penelRef = useRef<HTMLInputElement>(null);
  const inputWrap = useRef<HTMLDivElement>(null);

  const [timeout, closePanel] = useDelay(
    () => {
        state.panelTransition = true
    },  
    () => {
      state.panelTransition = false
      state.panelShow = false
    },
    200
  );

  useEffect(() => {
        const hoverEvent = (e) => {
          e.stopPropagation()
            if(!state.inputVal) return 
            state.showAllowClear = true
       }
       const blurEvent = (e) => {
        e.stopPropagation()
          state.showAllowClear = false
     }
     const inputClickEvent = (e) => {
      e.stopPropagation()
       state.panelShow = true;
       state.panelTransition = false
   }
   const documentClickEvent = (e: any) => {
    e.stopPropagation()
      if (e.target === inputRef.current || penelRef.current.contains(e.target as any) || e.target.className === `${prefix_cls}-cell-inner` ) return;
      if (!timeout&&state.panelShow) {
        closePanel(true);
      }
      }
      inputWrap.current.addEventListener("mouseenter",hoverEvent );
      inputWrap.current.addEventListener("mouseleave",blurEvent );
      inputRef.current.addEventListener("click",inputClickEvent );
      document.addEventListener("click",documentClickEvent );
    return ()=>{
      inputRef.current.removeEventListener('hover',hoverEvent) 
      inputRef.current.removeEventListener('blur',blurEvent) 
      inputRef.current.removeEventListener('click',inputClickEvent) 
      document.removeEventListener("click",documentClickEvent );
    }
    // eslint-disable-next-line
  }, []);

  let contextValue = useMemo(()=>{
    return {
      pickerType: state.picker, // 组件内部的picker状态 
      picker, // 用户的picker 不能修改 
      changePicker: (type: PickerType) => {state.picker = type},
      year:state.year,
      month:state.month,
      date:state.date,
      closePanel:()=>{closePanel(true)},
      changeDate:(year:number|boolean ,month:number|boolean,date:number|boolean,isChangeInput:boolean)=> {
        year = year ? year: state.year
        month= month ?month: state.month
        date = date ?date: state.date;
        state.year  = year as number 
        state.month = month as number
        state.date = date as number 
        if(isChangeInput){
          state.inputVal = moment(`${state.year}-${state.month}-${state.date}`).format(format)
          onChange(state.inputVal)
        }
        },
      format:format,
      inputVal:state.inputVal,
    }
  },[state.picker,state.month,state.year,format,state.inputVal])
  
  const inputChange = useCallback((e)=>{
    state.inputVal =  (e.target.value)
  },[])

  return (
    <Context.Provider
      value={contextValue}
    >
      <div className={classNames(prefix_cls)}>
        {/* 输入框 */}
        <div ref={inputWrap} className={classNames(prefix_cls + "-input",{
          focused:state.panelShow
        })}>
          <input onChange={inputChange} value={ initialVal.inputVal } ref={inputRef} placeholder="请选择日期" type="text" />
          <span className={classNames(prefix_cls + "-dateIcon-box",'iconfont')}>
            <span style={{opacity:!state.showAllowClear?1:0}} className={classNames(prefix_cls +"-dateIcon",'iconfont')}>&#xe7d3;</span>
            <span onClick={()=>{
              state.inputVal = '';
              state.showAllowClear = false;
            }} style={{display:state.showAllowClear?'block':'none'}}  className={classNames(prefix_cls + "-closeIcon",'iconfont')}>&#xe844;</span>
          </span>
        </div>
        {/* Date panel */}
        <div
          ref={penelRef}
          className={classNames(prefix_cls + "-panel", {
            panelShow: state.panelShow,
            panelTransition: state.panelTransition,
          })}
        >
          <GeneratePicker/>
        </div>
      </div>
    </Context.Provider>
  );
};
