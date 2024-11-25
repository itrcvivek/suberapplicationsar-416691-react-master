import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  PixelRatio,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  Platform,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import CheckBox from "@react-native-community/checkbox"
import Picker from "@react-native-picker/picker"

let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Customizable Area End

import AudiototextController, {
  Props,
  configJSON,
} from "./AudiototextController";

export default class Audiototext extends AudiototextController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (event) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
        testID="touchableWithoutFeedback"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            <Text
              testID="labelBody"
              style={styles.body}
            >
              {" "}
              {configJSON.labelBodyText}
            </Text>

            <Text testID="txtSaved">
              This is the reviced value:
              {this.state.txtSavedValue}{" "}
            </Text>

            <View style={styles.bgPasswordContainer}>
              <TextInput
                testID="txtInput"
                style={styles.bgMobileInput}
                placeholder={configJSON.txtInputPlaceholder}
                {...this.txtInputProps}
              />

              <TouchableOpacity
                testID={"btnShowHide"}
                style={styles.showHide}
                {...this.btnShowHideProps}
              >
                <Image
                  testID={"btnShowHideImage"}
                  style={styles.imgShowhide}
                  {...this.btnShowHideImageProps}
                />
              </TouchableOpacity>
            </View>

            <Button
              testID={"btnExample"}
              title={configJSON.btnExampleTitle}
              {...this.btnExampleProps}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
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
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: {},
});
// Customizable Area End
