import { got } from 'got'
import { debounce } from '~/client/hooks/debounce.ts'

export const DELAY_MS: number | [number, number] = 500

/**
 * Extend `got` http client so every time request is made there is a `rid.sig` cookie
 * that is needed for certain endpoints to work
 *
 * @returns A promise that resolves with the response data or rejects with an error
 */

export const get = got.extend({
  // headers: {
  //   cookie:
  //     'rid.sig=jyna6R42wntYgoTpqvxHMK7H+KyM6xLed+9I3KsvYZaVt7P36AL6zp9dGFPu5uVxaIiFpNXrszr+LfNCdY3IT3oCSYLeNv/ujtjsDqOzkY66AL3V6kH2vsK+au12X21HkZ4S8GaG8CoBmm/m0rLsOKYkxtw+U3+ejBaPc15jJjKXnc3owMBg82SNbqyKjVd6Z6qcsoE25p3RmlcaHuHC3GBf1yIGtlqeQun3Mj0vmSURVPQBjK65pge2zGBymoORV6PsmZ0Nabv73gS2VkhG+Eccz5iSIRPrZm5cloi/941TFo8oiXdyqvTMx/ozox2fkvaKB2vd/goSx543TxPdKoGKRLaDY3FoIepe6I46UFvXEZYszzugXHYRnp0lbIn/HPyvHH/iW/TXRrqsELQabKd1hH+Ut1ZgpfsKEtwDVyL7mVvi1qEOqHddSVKCN/439KxQqi9K03dQDm+knQaLRpzZL8EYqCeSaosMOeEhc2CAYWLW2D5jH5iTot0YiyaN3QJFE59H3MYDpGjoZfTfen83yVSpT8DBahOOr6Eibv62bKQXBxel5kIm75dZB26iUzmkBs1Iags291UJ8wpu/GtBD1rghlZoRJt9u3ASkAj3P85dBcV8MwGykVWJ4mCO; mkt=/gb/en/; .AspNetCore.Session=CfDJ8NJy2CjeBXdEiTlIkEo9jP1x6eP6igWNkoeL9uCto1qdz97HQLRlCAJWIhw97YY5uemEBnTrcLNnoB7lqKOnEJRzF%2F4yhGKN9A5COUteaQmZduO6o2whfYqdyD1Qd%2B%2BH6EXjFP4cd0DtvPDwguugs%2Bc684C2CSfw16lyvYFtSkvU; fr-correlation-id=b8d2a2fe-383b-44fa-8c4a-ba6cab8c994d; rid=034ed121-51ec-4cac-9196-97a50ee42d2c; RY_COOKIE_CONSENT=true; STORAGE_PREFERENCES={"STRICTLY_NECESSARY":true,"PERFORMANCE":false,"FUNCTIONAL":false,"TARGETING":false,"SOCIAL_MEDIA":false,"PIXEL":false,"GANALYTICS":true,"__VERSION":2}; myRyanairID='
  // },
  resolveBodyOnly: true,
  responseType: 'json',
  ...debounce(DELAY_MS)
})
