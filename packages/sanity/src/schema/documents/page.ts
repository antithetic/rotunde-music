import {File} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: File,
  description:
    "Create a new page for your website, like an 'About Us' or 'Contact' page. Each page has its own web address and content that you can customize.",
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'The main heading that appears at the top of your page and in browser tabs',
      validation: (Rule) => Rule.required().error('A page title is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'The URL-friendly version of the page title, used in the web address',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
