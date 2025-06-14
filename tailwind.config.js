/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    presets: [require('nativewind/preset')],
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./ui/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Urbanist'],
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: colors.white,
            black: colors.black,
            brown: {
                100: '#F7F4F2',
                200: '#E8DDD9',
                300: '#D6C2B8',
                400: '#C0A091',
                500: '#AC836C',
                600: '#926247',
                700: '#704A33',
                800: '#4F3422',
                900: '#372315',
                950: '#372315',
            },
            gray: {
                100: '#F5F5F5',
                200: '#E1E1E0',
                300: '#C9C7C5',
                400: '#ACA9A5',
                500: '#928D86',
                600: '#736B66',
                700: '#5A554E',
                800: '#3F3C36',
                900: '#292723',
                950: '#161513',
            },
            green: {
                100: '#F2F5EB',
                200: '#E5EAD7',
                300: '#CFD9B5',
                400: '#B4C48D',
                500: '#9BB068',
                600: '#7D944D',
                700: '#5A6B38',
                800: '#3D4A26',
                900: '#29321A',
                950: '#191E10',
            },
            orange: {
                100: '#FFEEE2',
                200: '#FFC89E',
                300: '#F6A360',
                400: '#ED7E1C',
                500: '#C96100',
                600: '#AA5500',
                700: '#894700',
                800: '#663600',
                900: '#432500',
                950: '#2E1200',
            },
            yellow: {
                100: '#FFF4E0',
                200: '#FFEBC2',
                300: '#FFDB8F',
                400: '#FFCE5C',
                500: '#FFBD1A',
                600: '#E0A500',
                700: '#A37A00',
                800: '#705600',
                900: '#4D3C00',
                950: '#2E2500',
            },
            purple: {
                100: '#F6F1FF',
                200: '#DDD1FF',
                300: '#C2B1FF',
                400: '#A694F5',
                500: '#8978E3',
                600: '#6C5FC8',
                700: '#5349A5',
                800: '#3C357C',
                900: '#292350',
                950: '#161324',
            },
        },
    },
    plugins: [],
};
