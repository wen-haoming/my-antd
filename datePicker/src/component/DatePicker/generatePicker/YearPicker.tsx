import React,{useContext,useEffect,useMemo, memo, useCallback} from 'react'
import {prefix_cls} from '../../DatePicker/index'
import classnames from 'classnames'
import{Context,ContextType } from '../index';
import {useRenderYear} from '../../hooks'
import moment from 'moment'

const YearPicker = ()=>{
   const {changeDate,inputVal,year,picker,changePicker} =  useContext<ContextType>(Context)
   let renderArr = useRenderYear()


    return <>
       <div className={classnames(`${prefix_cls}-body`)} >
            <table className={classnames(`${prefix_cls}-content`)}>
            <tbody>
          {
              renderArr.map((trItem,trIdx)=>{
                return <tr key={trIdx}>
                      {
                           trItem.map((tdItem,tdIdx)=>{
                              const curYear = moment(inputVal||year).format('YYYY')
                              console.log(curYear)
                           return <td key={tdIdx}>
                               <span title={tdItem.title}  className={(classnames(`${prefix_cls}-cell-inner`,{
                                  nowDate:tdItem.isNowDate,
                                  select: +tdItem.year === +curYear
                               }))}
                               onClick={()=>{
                                 changeDate(+tdItem.year,false,false,true)
                                 if(picker==='date'){
                                    changePicker('date')
                                }
                               }}
                               >
                               {tdItem.year}
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

export default memo(YearPicker)