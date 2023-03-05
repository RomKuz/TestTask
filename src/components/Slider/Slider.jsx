import {Slider} from "@mui/material";
import s from './Slider.module.css'
import {useEffect, useState} from "react";

const Sliding = (props)=>{


return (
    <div className={s.slider}>
        <p>{props.text} {props.storageValue} {props.value}</p>

        <Slider
                min={1}
                step={1}
                max={1000}
                onChange={props.storageOnChange}
                // onChange={props.checkPrice}
                valueLabelDisplay="auto"
                aria-labelledby="Storage GB"
        />
        <p>Transfer {props.transferValue} </p>
        <Slider
            min={1}
            step={1}
            max={1000}
            onChange={props.transferOnChange}
            valueLabelDisplay="auto"
            aria-labelledby="Storage GB"
        />
    </div>

)}
export default Sliding