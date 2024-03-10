import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Header from './components/Header';
import InputBar from './components/InputBar';
import { ScrollView } from 'react-native';

export default function Playground() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1 }}></ScrollView>
            <InputBar />
        </GestureHandlerRootView>
    )
}
