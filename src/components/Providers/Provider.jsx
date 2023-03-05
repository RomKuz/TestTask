import * as React from 'react';
import s from './Provider.scss'


const Provider = (props) => {

    const percentage = Math.round(props.price)
    const minimal = 'minimal-'
    console.log(props.logo)
    return <div className='infoContainer'><img src={props.logo} alt=""/><dd className={`percentage percentage-${percentage} ${props.min ? minimal + props.name : null} `}><span
        className="text">

        {props.name} price {props.price.toFixed(2)}
        {props.radio === 'HDD' ? <span className='spanWithInput'>
                    <input type="radio" onChange={props.isHddOnChange} name={props.name} defaultChecked value='HDD'/>
                        <label>HDD</label>
                    <input type="radio" name={props.name} onChange={props.isHddOnChange} value='SSD'/>
                        <label>SSD</label>
                </span> : null}
        {props.radio === 'Multi' ? <span className='spanWithInput'>
                    <input type="radio" name={props.name} onChange={props.isMultiOnChange} defaultChecked
                           value='Multi'/>
                        <label>Multi</label>
                    <input type="radio" name={props.name} onChange={props.isMultiOnChange} value='Single'/>
                        <label>Single</label>
                </span> : null}
        </span>
    </dd>
    </div>


}
export default Provider