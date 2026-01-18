import {Ticket} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: Ticket,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})
