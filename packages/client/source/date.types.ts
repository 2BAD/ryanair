import { z } from 'zod'

export const StrDate = z.string().date()
export type StrDate = z.infer<typeof StrDate>

export const StrDateTime = z.string().datetime({ local: true })
export type StrDateTime = z.infer<typeof StrDateTime>

export const StrDateTimeMs = z.string().datetime({ local: true, precision: 3 })
export type StrDateTimeMs = z.infer<typeof StrDateTimeMs>
