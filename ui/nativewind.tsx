import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

export const NativeWind = resolveConfig(tailwindConfig)
export const NativeWindColors = resolveConfig(tailwindConfig).theme.colors
