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
    }),
  ],
})
