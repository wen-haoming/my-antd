import {useEffect,useState,useRef,useMemo,useContext} from 'react'
import {ContextType,Context} from '../DatePicker'
import moment from 'moment'

let date = new Date()

let nowYear = date.getFullYear();
let nowMonth = date.getMonth() +1;
let nowDate = date.getDate();

/**
 * 
 * @param syncFn  同步函数
 * @param delayFn 延迟执行函数
 * @param delay 延迟描述
 */
export function useDelay(syncFn:()=>void,delayFn:()=>void,delay:number){
  let [flag,setFlag] =  useState(false)
      // eslint-disable-next-line
  let {current:timeout} = useRef(0)
  useEffect(()=>{
      if(!flag)return
      setFlag(false)
      if(flag){
        syncFn()
    // eslint-disable-next-line
        timeout = setTimeout(()=>{
          delayFn()
        },delay)
      }
      return ()=>{
        timeout = null
      }
// eslint-disable-next-line
  },[flag])
  return [flag,setFlag] as [typeof flag, typeof setFlag]
}

/**
 *  头部控制的hooks
 */
export function useHandleHeader(){
  const {year,month,format,changeDate,inputVal,closePanel,changePicker} = useContext<ContextType>(Context)

  return useMemo(()=>{
    return {
     rrBtn:()=>{
       changeDate((year)+1,false,false)
     },
   llBtn:()=>{
     changeDate((year)-1,false,false)
   },
   rBtn:()=>{
       if(month === 12){
         changeDate((year)+1,1,false)
       }else{
         changeDate(false,(month)+1,false)
       }
   },
   lBtn:()=>{
     if(month === 1){
       changeDate((year)-1,12,false)
     }else{
       changeDate(false,(month)-1,false)
     }
   },
   yearBtn(){
    changePicker('year')
   },
   monthBtn(){
    changePicker('month')
   }
    }
 },[year,month,changeDate])
}

/**
 *  日期面板的渲染逻辑hooks
 */
export function useRenderDate(){
   // 首先获取这个月 上个月 下个月的日期 天数
  // 确定这个月 1号星期几
  // 如果不是星期一 则获取上个月末尾的天数头部填补
  // 获取下个月的天数进行尾部填补
  const {year,month,format,changeDate,inputVal,closePanel,changePicker} = useContext<ContextType>(Context)

  return  useMemo(()=>{
    let newArr = []

    let day = moment(`${year}-${(+month)}`,'YYYY-MM') // 获取当前年月
    let curWeek = day.day(); // 获取当前月第一天星期几
    let curDate =  moment(day).daysInMonth() // 获取这个月有多少天
    let preDate =  moment(day.subtract(1,'month')).daysInMonth() // 获取上一个月有多少天

    let padStartDate = 0;
    let padEndDate = 0;
    // 计算当月1号前面应该空多少格
    if(curWeek !== 0){
      padStartDate = curWeek -1
    }else{
      padStartDate = 6
    }
    padEndDate = 42 - padStartDate - curDate
     for(let i = 0; i < 42; i++){
         if(i < padStartDate){
           let date = preDate - padStartDate + i + 1
           let preMonth = (month) -1 === 0? 12 :  Number(month) -1
           let preYear = preMonth === 12 ? year -1 : year
          newArr.push({
            date:date,
            month:preMonth,
            year:preYear,
            type:'preDate',
            title: moment(`${preYear}-${preMonth}-${date}`).format(format)
          })    
        }else if(i < curDate + padStartDate ){
          let date = i - padStartDate+1
          newArr.push({
            date:date ,
            month,
            type:'curDate',
            isNowDate:nowYear === year && nowMonth === month && nowDate === date ,
            title: moment(`${year}-${month}-${date }`).format(format),
          })
        }else{
          let date = i - curDate - padStartDate +1
          let nextMonth = (month) +1 === 13?1: (month) +1
          let nextYear = nextMonth === 1? year +1 : year
          newArr.push({
            date: date,
            month:nextMonth,
            year:nextYear,
            type:'nextDate',
            title: moment(`${nextYear}-${nextMonth}-${date}`).format(format)
          })
        }
     }
     
     newArr = newArr.reduce((arr,item,idx)=>{
           if(idx%7 === 0){
            arr[arr.length] = [item]
           }else{
            arr[arr.length - 1].push(item)
           }
           return arr
     },[])

     return newArr
},[year,month,format])

}

/**
 * 渲染月份
 */
export function useRenderMonth(){
  const {year,month,format,changeDate,inputVal,closePanel,changePicker} = useContext<ContextType>(Context)

  return  useMemo(()=>{
    let monthArr = []
          for(let i = 0; i < 12;i++){
               if(i%3 === 0){
                  monthArr[monthArr.length] = [{
                      month:i+1,
                      year,
                      text:(`${i+1}月`),
                      title: `${year}-${i+1}`,
                      isNowDate:nowYear === year && nowMonth === i+1 
                  }] 
               }else{
                monthArr[monthArr.length-1].push({
                    month:i+1,
                    year,
                    text:(`${i+1}月`),
                    title:`${year}-${i+1}`,
                    isNowDate:nowYear === year && nowMonth === i+1 
                })
               }
          }
       return monthArr          
},[year,month])
}

/**
 * 渲染年份
 */
export function useRenderYear(){
  const {year,month,format,changeDate,inputVal,closePanel,changePicker} = useContext<ContextType>(Context)
  return  useMemo(()=>{
    let yearArr = [];
    let newYear = Number(String(year).slice(0,3));
    for(let i = 0;i < 12;i ++){
         let val = i < 1? String(newYear - 1) +'9' : 
                   i> 10? String(newYear +1) + '1' :
                   String(newYear)+`${i - 1}`
         if(i%3 === 0){
            yearArr[yearArr.length] = [{year:val,
              isNowDate:nowYear === +val,
              title:`${val}年`,
              select:+val === year
            }]
         }else{
            yearArr[yearArr.length - 1].push({year:val, isNowDate:nowYear === +val, title:`${val}年`, select:+val === year})
         }
    }
    return yearArr
},[year])
}