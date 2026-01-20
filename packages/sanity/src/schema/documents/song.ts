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
      validation: (Rule) => Rule.min(1900).max(2100).integer(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required().error('A song slug is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist',
      album: 'album',
      year: 'releaseDate',
    },
    prepare({title, artist, album, year}) {
      const parts = []
      if (artist) parts.push(artist)
      if (album) parts.push(album)
      if (year) parts.push(`${year}`)

      return {
        title: title,
        subtitle: parts.length > 0 ? parts.join(' - ') : undefined,
      }
    },
  },
})
