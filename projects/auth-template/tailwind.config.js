/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./templates/**/*.html"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    400: 'rgb(251 146 60 / <alpha-value>)',
                    500: 'rgb(249 115 22 / <alpha-value>)',
                },
            }
        },
    },
    plugins: [],
}
