import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
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
  ],
})
