import React from "react";

// Customizable Area Start
import { Container, Box } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { slider1, slider2, slider3 } from "./assets";
import Carousel from "react-material-ui-carousel";
// Customizable Area End

import CarouselDisplayController, {
  Props,
  configJSON,
} from "./CarouselDisplayController";

export default class CarouselDisplay extends CarouselDisplayController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderThumbnails() {
    return (
      <Box style={webStyle.indicatorIconWrap}>
        {this.state.imgData.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              onClick={() => this.setState({ index: index })}
              style={webStyle.indicatorIcon}
            >
              <Box
                style={{
                  flex: 1,
                  backgroundImage: `url(${item.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: `${
                    index === this.state.index
                      ? "3px solid #007aff"
                      : "3px solid #fff"
                  }`,
                  borderRadius: 100,
                }}
              />
            </Box>
          );
        })}
      </Box>
    );
  }
  // Customizable Area End

  render() {
    console.log(slider1);
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"}>
          <Carousel
            animation="slide"
            swipe={true}
            index={this.state.index}
            indicators={false}
          >
            {this.state.imgData.map((item: any, i: any) => {
              return (
                <Box key={i} style={webStyle.carousel}>
                  <img style={webStyle.carouselImage} src={item.img} />
                </Box>
              );
            })}
          </Carousel>
          {this.renderThumbnails()}
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  carouselImage: {
    width: "100%",
  },
  carousel: {
    flex: 1,
    maxHeight: 400,
    overflow: "hidden",
  },
  indicatorIconWrap: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center",
    transform: "translateY(-120%)",
  },
  indicatorIcon: {
    width: 35,
    height: 35,
    marginLeft: 5,
    marginRight: 5,
    overflow: "hidden",
    display: "flex",
  },
};
// Customizable Area End
