import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//designacion colores
export const tokens =(mode) => ({
    ...(mode === 'dark'
    ?{
        green: {
            100: "#f2f4d6",
            200: "#e5eaae",
            300: "#d9df85",
            400: "#ccd55d",
            500: "#bfca34",
            600: "#99a22a",
            700: "#73791f",
            800: "#4c5115",
            900: "#26280a"
        },
        brown: {
            100: "#e4ddd6",
            200: "#cabbad",
            300: "#af9885",
            400: "#95765c",
            500: "#7a5433",
            600: "#624329",
            700: "#49321f",
            800: "#312214",
            900: "#18110a"
        },
        lightBrown: {
            100: "#ede9e7",
            200: "#dbd4ce",
            300: "#cabeb6",
            400: "#b8a99d",
            500: "#a69385",
            600: "#85766a",
            700: "#645850",
            800: "#423b35",
            900: "#211d1b"
        },
        gray: {
            100: "#ecebe9",
            200: "#dad7d3",
            300: "#c7c4be",
            400: "#b5b0a8",
            500: "#a29c92",
            600: "#827d75",
            700: "#615e58",
            800: "#413e3a",
            900: "#201f1d"
        },
        lightGray: {
            100: "#ecebe9",
            200: "#dad7d3",
            300: "#c7c4be",
            400: "#b5b0a8",
            500: "#a29c92",
            600: "#827d75",
            700: "#615e58",
            800: "#413e3a",
            900: "#201f1d"
        },

    }
    :{
        green: {
            100: "#26280a",
            200: "#4c5115",
            300: "#73791f",
            400: "#99a22a",
            500: "#bfca34",
            600: "#ccd55d",
            700: "#d9df85",
            800: "#e5eaae",
            900: "#f2f4d6",
        },
        brown: {
            100: "#18110a",
            200: "#312214",
            300: "#49321f",
            400: "#624329",
            500: "#7a5433",
            600: "#95765c",
            700: "#af9885",
            800: "#cabbad",
            900: "#e4ddd6",
        },
        lightBrown: {
            100: "#211d1b",
            200: "#423b35",
            300: "#645850",
            400: "#85766a",
            500: "#a69385",
            600: "#b8a99d",
            700: "#cabeb6",
            800: "#dbd4ce",
            900: "#ede9e7",
        },
        gray: {
            100: "#201f1d",
            200: "#413e3a",
            300: "#615e58",
            400: "#827d75",
            500: "#a29c92",
            600: "#b5b0a8",
            700: "#c7c4be",
            800: "#dad7d3",
            900: "#ecebe9",
        },
        lightGray: {
            100: "#201f1d",
            200: "#413e3a",
            300: "#615e58",
            400: "#827d75",
            500: "#a29c92",
            600: "#b5b0a8",
            700: "#c7c4be",
            800: "#dad7d3",
            900: "#ecebe9",
        },

    }),
    
});

// settings tema mui

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return{
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ?{
                    primary:{
                        main: colors.green[500],
                    },
                    secondary:{
                        main: colors.brown[500],
                    },
                    neutral: {
                        dark: colors.gray[700],
                        main: colors.gray[500],
                        light: colors.gray[100]
                    },
                    backbround:{
                        default: colors.green[500],
                    }
                }
             :{
                primary:{
                    main: colors.green[100],
                },
                secondary:{
                    main: colors.brown[500],
                },
                neutral: {
                    dark: colors.gray[700],
                    main: colors.gray[500],
                    light: colors.gray[100]
                },
                backbround:{
                    default: "#fcfcfc",
                }
             }
            )
        },
        typography:{
            fontFamily: ["Roboto"].join(","),
            fontSixe: 12,
            h1:{
                fontFamily: ["Roboto"].join(","),
                fontSixe: 40,
            },
            h2:{
                fontFamily: ["Roboto"].join(","),
                fontSixe: 32,
            },
            h3:{
                fontFamily: ["Roboto"].join(","),
                fontSixe: 24,
            },
            h4:{
                fontFamily: ["Roboto"].join(","),
                fontSixe: 20,
            },
            h5:{
                fontFamily: ["Roboto"].join(","),
                fontSixe: 16,
            },
            h6:{
                fontFamily: ["Roboto"].join(","),
                fontSixe: 12,
            },
        },
    };
};



// contexto

export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");
    const colorMode = useMemo (
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode];
}

