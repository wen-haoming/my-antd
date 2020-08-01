import {useEffect,useState,useRef} from 'react'


export function useDelay(syncFn:()=>void,delayFn:()=>void,delay:number){
  let [flag,setFlag] =  useState(false)
  let {current:timeout} = useRef(0)
  useEffect(()=>{
      if(!flag)return
      setFlag(false)
      if(flag){
        syncFn()
        timeout = setTimeout(()=>{
          delayFn()
        },delay)
      }
      return ()=>{
        timeout = null
      }
  },[flag])
  return [flag,setFlag] as [typeof flag, typeof setFlag]
}
