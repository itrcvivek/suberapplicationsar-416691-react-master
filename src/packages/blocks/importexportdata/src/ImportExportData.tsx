import React from "react";

import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Platform,
  // Customizable Area Start
  Alert
  // Customizable Area End
} from "react-native";

import ImportExportDataController, {
  Props,
  configJSON
} from "./ImportExportDataController";

export default class ImportExportData extends ImportExportDataController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            <Button
              testID="downloadCsv"
              title={
                this.state.loadingCSV
                  ? configJSON.loadingText
                  : configJSON.exportCsvLabel
              }
              onPress={this.downloadCSVData}
              disabled={this.state.loadingCSV}
            />
            <View style={styles.separator} />
            <Button
              testID="downloadJson"
              title={
                this.state.loadingJson
                  ? configJSON.loadingText
                  : configJSON.exportJsonLabel
              }
              onPress={this.downloadJsonData}
              disabled={this.state.loadingJson}
            />
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
    paddingTop: 30
  },
  separator: {
    marginTop: 20
  }
});
// Customizable Area End
