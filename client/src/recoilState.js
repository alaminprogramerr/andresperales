import {atom} from 'recoil'

export const myID=atom({
    key:'myID',
    default:''
})

export const allUser=atom({
    key:'allUser',
    default:[]
})

export const callReciveModal=atom({
    key:'callReciveModal',
    default:false
})

export const callModal=atom({
    key:'callModal',
    default:false
})


export const callAccepted=atom({
    key:'callAccepted',
    default:false
})

export const myVideo=atom({
    key:'myVideo',
    default:null
})