import tailwindConfig from '@/tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'

export const NativeWind = resolveConfig(tailwindConfig)
export const NativeWindColors = resolveConfig(tailwindConfig).theme.colors
