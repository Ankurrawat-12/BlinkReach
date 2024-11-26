import localFont from 'next/font/local'

export const proximaNova = localFont({
  src: [
    {
      path: './public/fonts/ProximaNova-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './public/fonts/ProximaNova-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-proxima-nova',
})