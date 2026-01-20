import {Newspaper} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const newsletter = defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  icon: Newspaper,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('A newsletter title is required'),
    }),
  ],
})
