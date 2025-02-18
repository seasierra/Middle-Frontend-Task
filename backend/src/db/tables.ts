import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

export const MarksTable = sqliteTable('marks', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  x: real('latitude').notNull(),
  y: real('longitude').notNull(),
  comment: text('comment'),
})
