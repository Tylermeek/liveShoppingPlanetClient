import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Header from './components/Header'
import { ScrollView } from 'react-native'
import MessageBox, { MsgData } from './components/MessageBox'

export default function Playground() {
    const msgList: MsgData[] = [
        {
            "shop": {
                "avatar": "https://randomuser.me/api/portraits/men/12.jpg",
                "name": "美味餐厅"
            },
            "lastChatRecord": {
                "time": "2024-03-10 09:30",
                "message": "您好，我想预订一张四人桌，今晚6点。",
                "read": false
            }
        },
        {
            "shop": {
                "avatar": "https://randomuser.me/api/portraits/men/14.jpg",
                "name": "欢乐咖啡馆"
            },
            "lastChatRecord": {
                "time": "2024-03-09 14:45",
                "message": "请问你们有提供无糖咖啡吗？",
                "read": true
            }
        },
        {
            "shop": {
                "avatar": "https://randomuser.me/api/portraits/men/36.jpg",
                "name": "快乐小店"
            },
            "lastChatRecord": {
                "time": "2024-03-08 11:20",
                "message": "你好，我想了解一下你们的特价商品。",
                "read": true
            }
        }

    ]

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Header />
            <ScrollView>
                {
                    msgList.map((msg) => (
                        <MessageBox msg={msg} />
                    ))
                }
            </ScrollView>
        </GestureHandlerRootView>
    )
}
