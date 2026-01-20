import {ListMusic} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const playlist = defineType({
  name: 'playlist',
  title: 'Playlist',
  type: 'document',
  icon: ListMusic,
  fields: [
    defineField({
      name: 'name',
      title: 'Playlist Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('A playlist name is required'),
    }),
    defineField({
      name: 'songs',
      title: 'Songs',
      type: 'array',
      of: [{type: 'reference', to: {type: 'song'}}],
    }),
  ],
})
