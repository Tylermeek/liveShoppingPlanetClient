import { Icon, TabView, Text } from '@rneui/themed'
import GoBack from 'components/GoBack'
import SearchBanner from 'components/SearchBanner'
import { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import OrderTab from './components/OrderTab'
import OrderLIst from './components/OrderLIst'
import { View } from 'react-native'

export default function Playground() {
    const [searchOrder, setSearchOrder] = useState("")

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SearchBanner
                LeftIcon={GoBack}
                RightIcon={() => <Icon name='more-horiz' />}
                searchProps={{
                    initContent: searchOrder,
                    placeholder: "搜索订单",
                    editable: true,
                    updateSearchCb: (val) => setSearchOrder(val)
                }}
            />
            <OrderTab />
            <TabView value={0}>
                <TabView.Item style={{flex:1}}>
                <OrderLIst />
                </TabView.Item>
            </TabView>
        </GestureHandlerRootView>
    )
}
