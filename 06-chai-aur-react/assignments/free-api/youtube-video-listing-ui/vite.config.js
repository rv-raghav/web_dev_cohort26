import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web_dev_cohort26/06-chai-aur-react/assignments/free-api/youtube-video-listing-ui/',
})
