// Customizable Area Start
import React from "react";

import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import Loader from "../../../components/src/Loader";
import {
  imgFacebook,
  imgInstagram,
  imgReferFreind,
  imgTwitter,
  imgWhatsapp,
} from "./assets";
import ReferralsController, { Props } from "./ReferralsController";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

export default class Referrals extends ReferralsController {
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

      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          testID="hideKeyboard"
          onPress={() => {
            this.hideKeyboard();
          }}>
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          {!this.state.isLoading ? (
            <View>
              <View style={styles.mainContainer}>
                <Text style={styles.title}>Refer a Friend</Text>
                <Image source={imgReferFreind} style={styles.imgReferFreind} />
              </View>
              <View style={styles.mainContainer2}>
                <Text style={styles.subTitle}>Your Referral code</Text>
                <Text style={styles.title2}>{this.state.referralCode}</Text>
                <View style={styles.buttonView}>
                  <View style={styles.button}>
                    <Text style={styles.btnText}>Invite Friend</Text>
                  </View>
                </View>

                <View style={styles.icons}>
                  <TouchableOpacity
                    testID="shareOnFacebook"
                    style={styles.iconsView}
                    onPress={() => this.shareOnSocialMedia("FACEBOOK")}>
                    <Image source={imgFacebook} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="shareOnWhatsapp"
                    style={styles.iconsView}
                    onPress={() => this.shareOnSocialMedia("WHATSAPP")}>
                    <Image source={imgWhatsapp} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="shareOnInstagram"
                    style={styles.iconsView}
                    onPress={() => this.shareOnSocialMedia("INSTAGRAM")}>
                    <Image source={imgInstagram} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID="shareOnTwitter"
                    style={styles.iconsView}
                    onPress={() => this.shareOnSocialMedia("TWITTER")}>
                    <Image source={imgTwitter} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <Loader loading />
          )}
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </SafeAreaView>

      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: width,
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    fontSize: 26,
    textAlign: "center",
    marginVertical: 8,
    color: "#fff",
    fontFamily: "Roboto",
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  mainContainer: {
    width,
    height: (3 * height) / 5,
    backgroundColor: "#A04EEC",
    color: "#fff",
  },
  mainContainer2: {
    width,
  },
  imgReferFreind: {
    width: width - 10,
    height: (2 * height) / 4,
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    marginTop: "auto",
    borderRadius: 30,
  },
  subTitle: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
    fontSize: 12,
    fontFamily: "Roboto",
  },
  title2: {
    textAlign: "center",
    color: "#000",
    fontSize: 36,
    fontFamily: "Roboto",
  },
  buttonView: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#A04EEC",
    width: width / 2,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "Roboto",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  iconsView: {
    elevation: 4,
    marginLeft: 12,
    width: 60,
    height: 60,
    backgroundColor: "#A04EEC",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
// Customizable Area End
