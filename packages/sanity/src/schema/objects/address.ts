import {defineField, defineType} from 'sanity'

export const address = defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  description: 'The address of the venue',
  options: {
    columns: 2,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'street',
      title: 'Street',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'State / Region',
      type: 'string',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal code',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
  ],
})
