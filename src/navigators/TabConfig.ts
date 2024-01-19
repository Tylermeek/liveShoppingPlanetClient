import Home from "screens/Home"
import Live from "screens/Live"


// TODO Tab栏完善
export const tabConfig = [
    {
        name:"Home",
        component:Home,
        options:{
            title:"首页"
        }
    },
    {
        name:"Live",
        component: Live,
        options:{
            title:"直播"
        }
    }
]

export enum TabIconName {
    Home = "home",
    Live = "cast"
}
