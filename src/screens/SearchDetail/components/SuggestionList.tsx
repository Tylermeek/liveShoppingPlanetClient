import { ListItem } from "@rneui/themed";
import { SuggestionsList } from "axios/api/search";
import { uniqueId } from "lodash-es";
import React from "react";
import { StyleSheet } from "react-native";

export type SuggestionListProps = {
    suggestionList: SuggestionsList
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestionList }) => {
    return <>
        {suggestionList.map((suggestion) => {
            return (
                <ListItem bottomDivider key={uniqueId(suggestion)}>
                    <ListItem.Content>
                        <ListItem.Title>{suggestion}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            )

        })}
    </>
}

const styles = StyleSheet.create({

})

export default SuggestionList
