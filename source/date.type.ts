import { z } from 'zod'

// TODO: replace with `z.string().date()` when implemented https://github.com/colinhacks/zod/pull/1766
export const StrDate = z.string().regex(/\d{4}-\d{2}-\d{2}$/)
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StrDate = z.infer<typeof StrDate>

export const StrDateTime = z.string().regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StrDateTime = z.infer<typeof StrDateTime>

export const StrDateTimeMs = z.string().regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}$/)
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type StrDateTimeMs = z.infer<typeof StrDateTimeMs>
