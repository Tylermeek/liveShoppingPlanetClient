import { Icon, TabView, Text } from '@rneui/themed'
import GoBack from 'components/GoBack'
import SearchBanner from 'components/SearchBanner'
import { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import OrderTab, { orderTabList } from './components/OrderTab'
import OrderList from './components/OrderList'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setCurrentTab } from 'slice/order'

export default function Order() {
    const [searchOrder, setSearchOrder] = useState("")
    const { currentTab } = useAppSelector(state => state.order)
    const dispatch = useAppDispatch()
    const handleTabChange = (newTab: number) => {
        dispatch(setCurrentTab(newTab))
    }

    const handlePressSearch = (search: string) => {
        console.log("test");
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SearchBanner
                LeftIcon={GoBack}
                RightIcon={() => <Icon name='more-horiz' />}
                searchProps={{
                    initContent: searchOrder,
                    placeholder: "搜索订单",
                    editable: true,
                    updateSearchCb: (val) => setSearchOrder(val),
                }}
                handlePressSearch={handlePressSearch}
            />
            <OrderTab />
            <TabView value={currentTab} onChange={handleTabChange}>
                {
                    orderTabList.map(order => (
                        <TabView.Item key={order.tabIndex} style={{ flex: 1 }}>
                            <OrderList tabIndex={order.tabIndex} />
                        </TabView.Item>
                    ))
                }
            </TabView>
        </GestureHandlerRootView>
    )
}
