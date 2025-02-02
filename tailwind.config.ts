import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.625rem", // 10px
        sm: "0.75rem", // 12px
        base: "0.875rem", // 14px
        lg: "1rem", // 16px
        xl: "1.25rem", //20px
        "2xl": "1.5rem", //24px
        "3xl": "2rem", //32px
        "4xl": "2.5rem", //40px
        "5xl": "3rem", //48px
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      borderRadius: {
        none: "0rem",
        sm: "0.375rem", //6px
        md: "0.625rem", //10px
        lg: "1.25rem", //20px
        full: "9999px",
      },
      maxWidth: {
        "24": "6.625rem", //106px
        "40": "9.688rem", //155px
        "42": "11.188rem", //179px
        "48": "12.375rem", //198px
        "52": "13.625rem", //218px
        "60": "30rem", //480px
        "61": "30.625rem", //490px
        "70": "48.125rem", //770px
      },
      minWidth: {
        "60": "30rem", //480px
        "61": "30.625rem", //490px
        "70": "48.125rem", //770px
      },
      height: {
        "50": "31.25rem", //500px
        "64": "40rem", //640px
        "89": "56rem", //896px
      },
      colors: {
        black: "#393939",
        light: "#FFFFFF",
      },
    },
  },
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            foreground: "#393939",

            primary: {
              900: "#1a374d",
              800: "#1f4d6d",
              700: "#215a83",
              600: "#2870a1",
              500: "#388cbf",
              400: "#5da7d3",
              300: "#95c5e4",
              200: "#c7dff0",
              100: "#f3f7fc",
              foreground: "#ffffff",
              DEFAULT: "#1a374d",
            },
            danger: {
              900: "#1d2a34",
              800: "#2c404e",
              700: "#304b5c",
              600: "#37576d",
              500: "#406882",
              400: "#5586a2",
              300: "#77a1b9",
              200: "#a6c2d3",
              100: "#d0dee7",
              50: "#eaeff4",
              foreground: "#FFFFFF",
              DEFAULT: "#1d2a34",
            },
            success: {
              900: "#094E28",
              800: "#0F5E2B",
              700: "#187531",
              600: "#238C35",
              500: "#30A33A",
              400: "#5EC75E",
              300: "#8CE383",
              200: "#BDF5B0",
              100: "#E0FAD7",
              foreground: "#187531",
            },
            secondary: {
              900: "#0B493E",
              800: "#0C594A",
              700: "#0D7C66",
              600: "#0F8C70",
              500: "#1BAE8A",
              400: "#3FC8A2",
              300: "#76DFBE",
              200: "#ACEED6",
              100: "#D4F7E8",
              foreground: "#0D7C66",
              DEFAULT: "#ACEED6",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
