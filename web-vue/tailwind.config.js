/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{vue,html,js}"],
	theme: {
		extend: {
			fontSize: {
				"7xl": "60vw",
				"8xl": "50vh",
			}
		},
	},
	plugins: [],
}
