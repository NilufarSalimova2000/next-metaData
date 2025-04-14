import { createTheme } from "@mui/material";
import { colors } from "./colors";

export const theme = createTheme({
    typography: {
        h1: {
            
            
        },
        h2: {
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "122%",
            color: "#333",
        },
        h3:{
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "150%",
            color: "#333",
        },
        h4: {
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "150%",
            // color: `${colors.m3syslightonbackground}`,
        },
        h5: {
            fontWeight: 400,
            fontSize: "14px",
            color: "#333"
        },
        h6: {
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            color:"#999"
        },
        body1: {
            
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 320,
            md: 1200,
            lg: 1300,
            xl: 1480,
        }
    }
})