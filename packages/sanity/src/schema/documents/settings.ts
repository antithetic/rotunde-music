import {SITE_NAME, SITE_URL} from '@repo/constants'
import {Cog} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: Cog,
  options: {
    singleton: true, // Identify this document as a singleton
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: SITE_NAME,
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      initialValue: SITE_URL.toString(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
