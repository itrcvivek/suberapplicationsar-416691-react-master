import React from "react";
// Customizable Area Start
import { Box, Button, Typography, LinearProgress } from "@material-ui/core";
// Customizable Area End
import DashboardController, {
  Props,
  webConfigJSON
} from "./DashboardController.web";

export default class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <Box>
        <Box style={webStyles.container}>
          <Box style={webStyles.totalCandidates}>
            <Box style={webStyles.candidatesFontSize}>
              {webConfigJSON.totalCandidateslabelTitleText}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Typography style={webStyles.mediumFontSizeForType}>
                {this.state.totalCandidates}
              </Typography>
              <br />
              <Typography style={webStyles.fontSizeForType}>
                {webConfigJSON.candidateslabelTitleText}
              </Typography>
            </Box>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Box>
              {this.state.dashboardData.length > 0 &&
                this.state.dashboardData.map(
                  (
                    category: { type: string; quantity: string },
                    index: number
                  ) => (
                    <Box key={index} style={webStyles.itemStyle}>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography data-testid={"category-type-" + index}>
                          {category.type}
                        </Typography>
                        <Typography style={webStyles.fontSizeForType}>
                          {category.quantity}
                        </Typography>
                      </Box>
                      <LinearProgress
                        className={`progress-${index}`}
                        variant="determinate"
                        value={
                          (Number(category.quantity) /
                            Number(this.state.totalCandidates)) *
                          100
                        }
                      />
                    </Box>
                  )
                )}
            </Box>
            <Button style={webStyles.btn}>
              {webConfigJSON.viewDetailsBtn}
            </Button>
          </Box>
        </Box>
      </Box>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const webStyles = {
  container: {
    display: "grid",
    gridTemplateColumns: "3fr 7fr",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    width: "32rem",
    padding: "0.5rem 1rem",
    minHeight: "12rem",
    gap: "2rem"
  },
  totalCandidates: {
    display: "grid",
    gridTemplateRows: "3fr 7fr",
    alignItems: "start",
    justifyContent: "center",
    justifyItems: "center",
    color: "black",
    margin: "1rem 0rem"
  },
  candidatesFontSize: {
    fontSize: "1rem"
  },
  btn: {
    backgroundColor: "blue",
    color: "white",
    borderRadius: "0",
    marginTop: "0.5rem",
    padding: "0.125rem"
  },
  fontSizeForType: { fontSize: "1 rem" },
  mediumFontSizeForType: { fontSize: "3rem" },
  itemStyle: { margin: "1rem 0rem" },
  type: { fontSize: "0.8rem", textTransform: "capitalize" },
  titletext: {
    color: "grey",
    fontWeight: "lighter",
    fontSize: "3rem"
  },
  typeText: { fontSize: "0.8rem", textTransform: "capitalize" }
};
// Customizable Area End
