import s from './Calculator.module.css'
import {useState} from "react";
import Sliding from "../Slider/Slider";
import Provider from "../Providers/Provider";
import * as React from "react";
import bunnyLogo from '../../common/images/logos/bunny.jpg'
import backblazeLogo from '../../common/images/logos/backvlaze.jpg'
import scalewayLogo from '../../common/images/logos/scaleway.jpg'
import vultrLogo from '../../common/images/logos/vultr.jpg'

const Calculator = () => {

    const [storageValue, setStorageValue] = useState(1)
    const [isHdd, setIsHdd] = useState(true)
    const isHddOnChange = () => {
        setIsHdd(!isHdd)
    }
    const [isMulti, setIsMulti] = useState(true)
    const isMultiOnChange = () => {
        setIsMulti(!isMulti)
    }
    const storageOnChange = (e) => {
        setStorageValue(e.target.value)
        return storageValue
    }
    const [transferValue, setTransferValue] = useState(1)
    const transferOnChange = (e) => {
        setTransferValue(e.target.value)
        return transferValue
    }
    const providers = {
        backblaze: {
            min: 7,
            storage: 0.005,
            transfer: 0.01,
            logo:backblazeLogo
        },
        bunny: {
            max: 10,
            storage: {
                HDD: 0.01,
                SDD: 0.02
            },
            transfer: 0.01,
            logo: bunnyLogo
        },
        scaleway: {
            free: 75,
            storage: {
                multi: 0.06,
                single: 0.03
            },
            transfer: 0.02,
            logo:scalewayLogo
        },
        vultr: {
            min: 5,
            storage: 0.01,
            transfer: 0.01,
            logo:vultrLogo
        }

    }

    const checkPrice = (strValue, trValue, isHdd, isMulti, providers) => {
        const backblazePrice = calculateBackblazePrice(strValue, trValue, providers,)
        const bunnyPrice = calculateBunnyPrice(strValue, trValue, isHdd, providers)
        const scalwayPrice = calculateScalwayPrice(strValue, trValue, isMulti, providers)
        const vultrPrice = calculateVultr(strValue, trValue, providers)
        console.log(providers)
        return[{
            name: 'backblaze',
            price: backblazePrice,
            logo:providers.backblaze.logo
        }, {
            name: 'bunny',
            price: bunnyPrice,
            radio: 'HDD',
            logo:providers.bunny.logo
        }, {
            name: 'scalway',
            price: scalwayPrice,
            radio: 'Multi',
            logo:providers.scaleway.logo
        }, {
            name: 'vultr',
            price: vultrPrice,
            logo:providers.vultr.logo
        }]

    }
    const prices = checkPrice(storageValue, transferValue, isHdd, isMulti, providers)

    const lowest = Math.min(...prices.map(item => item.price))
    console.log('e   ',prices.map(e=>e))
    const list = prices.map(e => e.price === lowest ?
        <Provider name={e.name} price={e.price} isMultiOnChange={isMultiOnChange} logo={e.logo} isHddOnChange={isHddOnChange} min={true} radio={e.radio}/> :
        <Provider name={e.name} price={e.price} isMultiOnChange={isMultiOnChange} logo={e.logo} isHddOnChange={isHddOnChange} min={false} radio={e.radio}/>)


    return (
       <div>
            <div className={s.flexContainer}>
                <Sliding storageOnChange={storageOnChange} transferValue={transferValue} storageValue={storageValue}
                         transferOnChange={transferOnChange} text={'Storage'} value={'GB'}/>
            </div>
            <dl>
                {list}
            </dl>
        </div>
    )
}

const calculateBackblazePrice = (strValue, trValue, providers) => {
    const min = providers.backblaze.min
    let backblazePrice = providers.backblaze.storage * strValue + providers.backblaze.transfer * trValue
    backblazePrice = backblazePrice < min ? min : backblazePrice;
    return backblazePrice
}
const calculateBunnyPrice = (strValue, trValue, isHdd, providers) => {
    const max = providers.bunny.max
    let bunnyPrice = isHdd ? providers.bunny.storage.HDD * strValue + providers.bunny.transfer * trValue : providers.bunny.storage.SDD * strValue + providers.bunny.transfer * trValue;
    bunnyPrice = bunnyPrice < max ? bunnyPrice : max

    return bunnyPrice
}
const calculateScalwayPrice = (strValue, trValue, isMulti, providers) => {
    const free = providers.scaleway.free
    let scalewayStrPrice = 0
    let scalewayTrPrice = 0
    if (strValue > free) scalewayStrPrice = isMulti ? providers.scaleway.storage.multi * (strValue - free) : providers.scaleway.storage.single * (strValue - free)
    if (trValue > free) scalewayTrPrice = providers.scaleway.transfer * (trValue - free)
    return   scalewayStrPrice + scalewayTrPrice

}
const calculateVultr = (strValue, trValue, providers) => {
    const min = providers.vultr.min
    let vultrPrice = providers.vultr.storage * strValue + providers.vultr.transfer * trValue
    vultrPrice = vultrPrice < min ? min : vultrPrice;
    return vultrPrice
}
export default Calculator