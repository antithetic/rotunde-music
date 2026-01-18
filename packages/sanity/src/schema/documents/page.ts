import {File} from 'lucide-react'
import {defineField, defineType} from 'sanity'

import {GROUP, GROUPS} from '../../utils/groups'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: File,
  description:
    "Create a new page for your website, like an 'About Us' or 'Contact' page. Each page has its own web address and content that you can customize.",
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'The main heading that appears at the top of your page and in browser tabs',
      validation: (Rule) => Rule.required().error('A page title is required'),
      group: GROUP.MAIN_CONTENT,
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
      validation: (Rule) => Rule.required().error('A page slug is required'),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      group: GROUP.MAIN_CONTENT,
    }),
    // SEO Fields
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description:
        'A brief description of the page for search engines (recommended: 150-160 characters)',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning(
          'Meta descriptions should be no longer than 160 characters for optimal SEO',
        ),
      group: GROUP.SEO,
    }),
    defineField({
      name: 'keywords',
      type: 'tags',
      title: 'SEO Keywords',
      description: 'Keywords for search engine optimization',
      group: GROUP.SEO,
      options: {
        includeFromRelated: 'keywords',
      },
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description:
        'Image displayed when the page is shared on social media (recommended: 1200x630px)',
      options: {
        hotspot: true,
      },
      group: GROUP.SEO,
    }),
    defineField({
      name: 'ogTitle',
      type: 'string',
      title: 'Open Graph Title',
      description:
        'Custom title for social media sharing (defaults to page title if not set)',
      group: GROUP.SEO,
    }),
    defineField({
      name: 'ogDescription',
      type: 'text',
      title: 'Open Graph Description',
      description:
        'Custom description for social media sharing (defaults to meta description if not set)',
      rows: 3,
      group: GROUP.SEO,
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
      description:
        'The canonical URL for this page (optional, defaults to the page URL)',
      group: GROUP.SEO,
    }),
    // Author/Editor Tracking
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Date created',
      description: 'Date and time when this page was created',
      group: GROUP.SETTINGS,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'createdBy',
      type: 'userSelect',
      title: 'Created By',
      description: 'User who created this page',
      // readOnly: true,
      group: GROUP.SETTINGS,
    }),
    defineField({
      name: 'lastModifiedAt',
      type: 'datetime',
      title: 'Last Modified Date',
      description: 'Date and time when this page was last modified',
      group: GROUP.SETTINGS,
    }),
    defineField({
      name: 'lastModifiedBy',
      type: 'userSelect',
      title: 'Last Modified By',
      description: 'User who last modified this page',
      // readOnly: true,
      group: GROUP.SETTINGS,
    }),
  ],
})
