// Customizable Area Start
import React from "react";

import {
    View,
    Text,
    FlatList,
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End

import NotificationScreenController, {
    Props,
} from "./NotificationScreenController";

export default class NotificationScreen extends NotificationScreenController {
    constructor(props: Props) {
        super(props);

    }


    render() {
        // Merge Engine - render - Start
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <FlatList
                    testID="flatlist"
                    data={this.state.notificationData}
                    ListEmptyComponent={() => {
                        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>No notifications found</Text></View>
                    }}
                    renderItem={({ item }) => {
                        return <View style={{ width: '90%', alignSelf: 'center', marginVertical: 5, padding: 10, backgroundColor: 'white', borderWidth: 1, borderRadius: 5, borderColor: 'lightgrey' }}>
                            <Text>{item.attributes.headings}</Text>
                        </View>
                    }}
                />
            </View>
        );
        // Merge Engine - render - End
    }
}


// Customizable Area End
