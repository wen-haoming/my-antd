import React, { useContext, memo, useCallback, useMemo } from "react";
import { prefix_cls } from "../../DatePicker/index";
import classnames from "classnames";
import { Context, ContextType } from "../index";
import {useReactive} from 'v-reactive-hooks'

interface Props {
    llBtn?:()=>void;
    lBtn?:()=>void;
    rBtn?:()=>void;
    rrBtn?:()=>void;
    yearBtn?:()=>void;
    monthBtn?:()=>void;
}

function Header(props: Props) {
  const {
    llBtn = ()=>{},
    lBtn= ()=>{},
    rBtn= ()=>{},
    rrBtn= ()=>{},
    yearBtn= ()=>{},
    monthBtn= ()=>{},
  } = props

  let {
    pickerType,
    year,
    month,
  } = useContext<ContextType>(Context);

  const yearBtnClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    e.preventDefault()
    e.stopPropagation()
    yearBtn()
  },[])

  const monthBtnClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    e.preventDefault()
    e.stopPropagation()
    monthBtn()
  },[])

  return (
    <div className={classnames(`${prefix_cls}-header`)}>
      <div className={classnames(`${prefix_cls}-header-left`)}>
        <button onClick={llBtn}>
          <span className="iconfont arrow">&#xe7ed;</span>
        </button>
      { pickerType !== 'month' &&  <button  onClick={lBtn}>
     <span className="iconfont arrow">&#xe7ec;</span>
        </button>}
      </div>
      <div className={classnames(`${prefix_cls}-header-mid`)}>
        <div
          onClick={yearBtnClick}
          className={classnames(`${prefix_cls}-header-midbtn`)}
        >
          {year}年
        </div>
        <div
          onClick={monthBtnClick}
          className={classnames(`${prefix_cls}-header-midbtn`)}
        >
          {month}月
        </div>
      </div>
      <div className={classnames(`${prefix_cls}-header-right`)}>
     {  pickerType !== 'month' &&  <button onClick={rBtn}>
          <span className="iconfont arrow">&#xe7eb;</span>
        </button>}
        <button onClick={rrBtn}>
          <span className="iconfont arrow">&#xe7ee;</span>
        </button>
      </div>
    </div>
  );
}

export default memo(Header);
