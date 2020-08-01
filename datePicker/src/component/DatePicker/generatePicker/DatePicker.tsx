import React,{useContext,useEffect,useMemo, memo, useCallback} from 'react'
import {prefix_cls} from '../../DatePicker/index'
import classnames from 'classnames'
import{Context,ContextType } from '../index';
import moment from 'moment';
import Header from './Header';
import {useRenderDate} from '../../hooks'

let weekArr = ['一','二','三','四','五','六','日']


let date = new Date()



 function DatePicker(){
  const {year,month,format,changeDate,inputVal,closePanel,changePicker} = useContext<ContextType>(Context)

  useEffect(() => {
    window['moment'] = moment;
  }, [moment]);


  // 渲染日历面板
  let renderDate = useRenderDate()

  return <>
 
    <div className={classnames(`${prefix_cls}-body`)} >
      <table className={classnames(`${prefix_cls}-content`)}>
            <thead>
                <tr>
                {
                   weekArr.map((item,idx)=>{
                   return <th key={idx}>{item}</th>
                   })
                 }
                </tr>
            </thead>
            <tbody>
                 {
                   renderDate.map((trItem,trIdx)=>{
                   return <tr key={'trItem'+trIdx}>{
                    trItem.map((tdItem,tdIdx)=>{
                    return <td key={'tdItem'+tdIdx}>
                      <div onClick={(e)=>{
                        e.stopPropagation()
                        changeDate(tdItem.year,tdItem.month,tdItem.date,true);
                        closePanel() 
                      }} 
                      title={tdItem.title}
                       className={classnames(`${prefix_cls}-cell-inner`,{
                          view:tdItem.type === 'curDate',
                          nowDate:tdItem.isNowDate,
                          select:inputVal === tdItem.title
                      })}>
                        {tdItem.date}
                      </div>
                    </td>
                    })
                     }</tr>
                   })
                 }
            </tbody>
      </table>
    </div>
  </>
}


export default memo(DatePicker)