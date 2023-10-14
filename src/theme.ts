import { ThemeOptions, createTheme } from "@mui/material/styles";
import { createContext } from "react";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const theme: ThemeOptions = {
  // @ts-ignore
  shadows: [...Array(25).fill("none")],
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Consolas",
    fontSize: 12,
    body1: {},
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#fcfcfc",
            width: "0.6em",
            height: "0.6em",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            backgroundColor: "#bdbdbd",
            minHeight: 12,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme(theme, {
  palette: {
    mode: "light",
    divider: "#ebecf0",
    background: {
      default: "#f7f8fa",
    },
    text: {
      primary: "#1e1e1e",
    },
  },
} as ThemeOptions);

export const darkTheme = createTheme(theme, {
  palette: {
    mode: "dark",
    background: {
      default: "#2b2d30", // "#181818",
    },
    text: {
      primary: "#ced0d6",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#4d4e51",
            width: "0.6em",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            minHeight: 12,
            backgroundColor: "#5c5d5e",
          },
        },
      },
    },
  },
});