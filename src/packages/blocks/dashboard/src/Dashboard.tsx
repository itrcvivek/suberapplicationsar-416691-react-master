import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
  ActivityIndicator
} from "react-native";
import { configJSON } from "./DashboardController";
// Customizable Area End
import DashboardController, { Props } from "./DashboardController";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import moment from "moment";
export default class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  renderDashboardItems = ({ item }: {item: {
    type: string;
    quantity: string;
}}) => {
    let stateObj = this.state.dashboardData?.attributes.total_candidates || 0.1
    return (
      <View style={styles.renderItemsViewStyle}>
        <View style={styles.progressTitleTextFlexRowView}>
            <Text style={styles.progressTitleTextLabel}>
              {item.type}
            </Text>
            <Text style={styles.progressTitleTextLabel}>
              {item.quantity}
            </Text>
            </View>

            <View style={styles.progressBgView}>
              <View style={[styles.progressView,{
                width: this.getPercentageFun(Number(item.quantity)/stateObj),
                backgroundColor: this.getPercentageColor(item.type)
              }]}>
              </View>
            </View>
        </View>
    );
  };
  // Customizable Area End
    
  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={styles.parentView}>
            {this.state.loading ? (
              <ActivityIndicator style={styles.loaderStyles} size="large" />
            ) : null}
              <View
                style={styles.cardView}
              >
                <View style={styles.totalCandidatesInfo}>
                  <Text style={styles.totalCandidatesTitleText}>
                    {configJSON.totalCandidateslabelTitleText}
                  </Text>
                  <Text style={styles.totalCandidatesCountText}>
                    {this.state.dashboardData.attributes.total_candidates}
                  </Text>
                  <Text style={styles.totalCandidatesLabelText}>
                    {configJSON.candidateslabelTitleText}
                  </Text>
                </View>
                <FlatList
                  testID="dashboardFlatlist"
                  data={this.state.dashboardData.attributes.sub_attributres}
                  showsVerticalScrollIndicator={false}
                  extraData={this.state}
                  renderItem={this.renderDashboardItems}
                  keyExtractor={(item, index) => index.toString()}
                />
                
              </View>
            
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffff"
  },
  dashboardItemView: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: hp("2%"),
    width: wp("90%"),
    maxWidth: wp("90%"),
    borderRadius: hp("3%"),
    backgroundColor: "#ffffff",
    shadowColor: "#c3c3c3",
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.62,
    elevation: 6
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  imgShowhide: { height: 30, width: 30 },
  parentView: {
    flex: 1,
    marginHorizontal: wp('2%'),
    backgroundColor: '#e6e3e3'
  },
  totalCandidatesInfo: {
    width : wp('100%'), 
    height: hp('32%'), 
    justifyContent: 'center', 
    alignItems:'center'
  },
  totalCandidatesTitleText :{
    fontSize: RFValue(32), 
    marginBottom: 24,
    color: '#000000'
  },
  totalCandidatesCountText :{
    fontSize: RFValue(48), 
    color: '#000000'
  },
  totalCandidatesLabelText :{
    fontSize: RFValue(28), 
    color: '#000000'
  },
  renderItemsViewStyle :{
    width: '92%', 
    margin: '4%'
  },
  progressTitleTextFlexRowView : {
  flexDirection: 'row', 
  justifyContent: 'space-between'
  },
  progressTitleTextLabel : {
     fontSize: RFValue(18),
      textAlign: "left", 
      marginBottom:8, 
      color:'#000000' 
  },
  loaderStyles: { flex: 1, opacity: 1 },
  cardView: {
    backgroundColor:'white',
    width: wp('96%'),
    margin: '2%',
    height: hp('74%')
  },
  errorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  progressBgView: {width: '100%', height: 12, backgroundColor: '#e6e3e3', borderRadius: 4,},
  progressView : {height: 12, borderRadius: 4}

});
// Customizable Area End
