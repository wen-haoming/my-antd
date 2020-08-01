import React from 'react'
import {render} from 'react-dom'
import {DatePicker} from './component/index'
import './index.css';

function App (){
    return <div style={{marginTop:'50px'}}>
        <DatePicker format="YYYY-MM-DD" onChange={(time)=>{
                     console.log(time,'=====');
        }}></DatePicker>
    </div>
}

export default render(<App></App>, document.getElementById('root'))