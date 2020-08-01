import React,{useContext,useEffect,useMemo,memo, useCallback} from 'react'
import {prefix_cls} from '../../DatePicker/index'
import classnames from 'classnames'
import{Context,ContextType } from '../index';
import moment from 'moment'
import Header from './Header'
import{useRenderMonth} from '../../hooks'

const MonthPicker = ()=>{
    const {month,changeDate,format,year,date,changePicker,pickerType,inputVal,picker} = useContext<ContextType>(Context)

    // 渲染月份
    const renderArr = useRenderMonth()

    return<>
    <div className={classnames(`${prefix_cls}-body`)} >
    <table className={classnames(`${prefix_cls}-content`)}>
    <tbody>
          {
              renderArr.map((trItem,trIdx)=>{
                return <tr key={trIdx}>
                      {
                           trItem.map((tdItem,tdIdx)=>{
                           let curYear = +moment(inputVal||year).format('YYYY')
                           let curMonth = +moment(inputVal||month).format('MM')
                           return <td key={tdIdx}>
                               <span title={tdItem.title}  className={(classnames(`${prefix_cls}-cell-inner`,{
                                   select:tdItem.year === curYear && tdItem.month === curMonth,
                                   nowDate:tdItem.isNowDate
                               }))}
                               onClick={()=>{

                                changeDate(tdItem.year,tdItem.month,false,true)
                                if(picker==='date'){
                                    changePicker('date')
                                }
                               }}
                               >
                               {tdItem.text}
                               </span>
                               </td>
                           })
                      }
                </tr>
              })
          }
    </tbody>
    </table>
</div>
</>
}

export default memo(MonthPicker)