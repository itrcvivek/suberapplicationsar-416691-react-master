import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff"
    }
  },
  typography: {
    h6: {
      fontWeight: 500
    },
    subtitle1: {
      margin: "20px 0px"
    }
  }
});
// Customizable Area End

import ImportExportDataController, {
  Props,
  configJSON
} from "./ImportExportDataController.web";

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
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.loadingCSV}
              style={webStyle.buttonStyle}
              data-test-id="downloadCsv"
              onClick={this.downloadCSVData}
            >
              {this.state.loadingCSV
                ? configJSON.loadingText
                : configJSON.exportCsvLabel}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.downloadJsonData}
              disabled={this.state.loadingJson}
              style={webStyle.buttonStyle}
              data-test-id="downloadJson"
            >
              {this.state.loadingJson
                ? configJSON.loadingText
                : configJSON.exportJsonLabel}
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff"
  },
  buttonStyle: {
    marginTop: "30px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)"
  }
};
// Customizable Area End
