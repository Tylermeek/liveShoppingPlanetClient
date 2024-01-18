import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import { SuggestionsList } from "axios/api/search";
import { uniqueId } from "lodash-es";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Views } from "types/config";
import { scaleSizeH } from "utlis/scaleSize";

export type SuggestionListProps = {
    suggestionList: SuggestionsList
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestionList }) => {
    const navigation = useNavigation()


    const handlePress = (content: string) => {
        // getSearchResultList
        navigation.navigate(Views.SearchResultList,{
            content
        })
    }
    return <>
        {suggestionList.map((suggestion) => {
            return (
                <ListItem bottomDivider key={uniqueId(suggestion)}>
                    <ListItem.Content>
                        <TouchableOpacity onPress={()=>handlePress(suggestion)}>
                            <ListItem.Title style={{fontSize:scaleSizeH(12)}}>{suggestion}</ListItem.Title>
                        </TouchableOpacity>
                    </ListItem.Content>
                </ListItem>
            )

        })}
    </>
}

const styles = StyleSheet.create({

})

export default SuggestionList
