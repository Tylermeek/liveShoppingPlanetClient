import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SearchBanner from 'components/SearchBanner'
import GoBack from 'components/GoBack'
import SearchResList from './components/SearchResList';
import { useState } from 'react';

export default function Playground() {
    const [searchContent, setSearchContent] = useState("")
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SearchBanner
                LeftIcon={GoBack}
                RightIcon={() => <></>}
                searchProps={{
                    handlePressSearch:setSearchContent
                }}
            />
            <SearchResList searchContent={searchContent} />
        </GestureHandlerRootView>
    )
}
