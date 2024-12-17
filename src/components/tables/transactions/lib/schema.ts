import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  rows: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      status: z.string(),
      label: z.string(),
      priority: z.string(),
      month: z.string(),
      name: z.string(),
      summ: z.number(),
      type: z.string(),
      date: z.string(),
    })
  ),
  month: z.string(),
  name: z.string(),
  summ: z.number(),
  type: z.string(),
  date: z.string(),

})

export type Task = z.infer<typeof taskSchema>
