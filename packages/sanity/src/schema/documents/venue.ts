import {MapPin} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const venue = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: MapPin,
  fields: [
    defineField({
      name: 'name',
      title: 'Venue Name',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
  ],
})
