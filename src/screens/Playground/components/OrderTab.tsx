import { Tab } from '@rneui/themed'
import React, { useState } from 'react'

export default function OrderTab() {
    const [activeTab, setActiveTab] = useState(0)

    const orderTabList = [
        {
            title: "全部",
            tabIndex: 0
        },
        {
            title: "待付款",
            tabIndex: 1
        },
        {
            title: "待发货",
            tabIndex: 2
        },
        {
            title: "待收货",
            tabIndex: 3
        },
        {
            title: "待评价",
            tabIndex: 4
        },
        {
            title: "退款/售后",
            tabIndex: 5
        },
    ]

    return (<>
        <Tab value={activeTab} onChange={setActiveTab} dense>
            <Tab.Item>Tab</Tab.Item>
            {
                orderTabList.map(tab => (
                    <Tab.Item key={tab.tabIndex}>{tab.title}</Tab.Item>
                ))
            }
        </Tab>
    </>
    )
}
