// Customizable Area Start
import React from "react";

import {
    Container,
    Box,
    Typography,
} from "@material-ui/core";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

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

import NotificationScreenController, {
    NotificationType,
    Props,
} from "./NotificationScreenController";

export default class NotificationScreen extends NotificationScreenController {
    constructor(props: Props) {
        super(props);
    }


    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth={"sm"}>
                    <Box sx={webStyle.wrapper}>
                        {
                            this.state.notificationData.length > 0 ? this.state.notificationData.map((item: NotificationType, index: number) => {
                                return <Box key={index} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', width: '90%', alignSelf: 'center', padding: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 10, marginTop: 5, marginBottom: 5 }}>
                                    <Typography style={{ fontSize: 16 }}>{item.attributes.headings}</Typography>
                                </Box>
                            }) : <Box><Typography>No notifications found</Typography></Box>
                        }
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

const webStyle = {
    wrapper: {
        background: "#fff",
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "30px",
        fontFamily: "Roboto-Medium",
    },
};

// Customizable Area End
