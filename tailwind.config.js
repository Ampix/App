/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{ts,vue}', 'index.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Quicksand"'],
            },
            screens: {
                '3xl': '2000px',
            },
        },
    },
    plugins: [
        ({ addVariant }) => {
            addVariant('child', '& > *')
            addVariant('child-hover', '& > *:hover')
        },
    ],
}
