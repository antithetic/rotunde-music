import {AudioLines} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const song = defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  icon: AudioLines,
  fields: [
    defineField({
      name: 'title',
      title: 'Song Title',
      type: 'string',
    }),
    defineField({
      name: 'artist',
      title: 'Artist Name',
      type: 'string',
    }),
    defineField({
      name: 'album',
      title: 'Album Name',
      type: 'string',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'number',
      description: 'Year of release. e.g 1977',
      validation: (rule) => rule.min(4).max(4),
    }),
  ],
})
