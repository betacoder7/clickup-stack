/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Poppins", "Arial", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      // Add more font sizes as needed
    },
    borderWidth: {
      1: "1px"
    },
    colors: {
      authbutton: "#5f55ee",
      textselected: "#66b8eb",
      todo: "#DBDBDB",
      pause: "#DBDBDB",
      progress: "#7F77F1",
      review: "#F6BB33",
      done: "#33A069",
    },
    textColor: {
      dark: "#000000",
      selected: "#0A35BD",
      light: "#FFFFFF",
    },
    backgroundColor: {
      primary: "#F3F2F7",
      red: "#EE2121",
      error: "#F3A1A1",
      warning: "#F2ECB5",
      success: "#B2E9B6",
    },
    borderColor: {
      inputauth: "#d6d9de",
      inputauthselected: "#adb3bd",
    },
    borderRadius: {
      primary: "8px",
      secondary: "5px"
    },
  },
};
export const plugins = [];
