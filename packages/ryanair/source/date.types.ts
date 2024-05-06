import { z } from 'zod'

export const StrDate = z.string().date()
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StrDate = z.infer<typeof StrDate>

export const StrDateTime = z.string().datetime({ local: true })
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StrDateTime = z.infer<typeof StrDateTime>

export const StrDateTimeMs = z.string().datetime({ local: true, precision: 3 })
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StrDateTimeMs = z.infer<typeof StrDateTimeMs>
