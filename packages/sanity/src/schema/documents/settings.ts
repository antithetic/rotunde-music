import {SITE_NAME, SITE_URL} from '@repo/constants'
import {Cog} from 'lucide-react'
import {defineField, defineType} from 'sanity'

import {GROUP, SETTINGS_GROUPS} from '../../utils/groups'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: Cog,
  options: {
    singleton: true, // Identify this document as a singleton
  },
  groups: SETTINGS_GROUPS,
  fields: [
    // General Information Group
    defineField({
      name: 'venueName',
      title: 'Venue Name',
      type: 'string',
      description: 'The official name of the venue',
      validation: (Rule) => Rule.required(),
      group: GROUP.GENERAL_INFO,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main logo for the venue',
      options: {
        hotspot: true,
      },
      group: GROUP.GENERAL_INFO,
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: GROUP.GENERAL_INFO,
      fields: [
        defineField({
          name: 'street',
          title: 'Street Address',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'state',
          title: 'State/Province',
          type: 'string',
        }),
        defineField({
          name: 'zipCode',
          title: 'ZIP/Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      group: GROUP.GENERAL_INFO,
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
        }),
        defineField({
          name: 'bookingEmail',
          title: 'Booking Email',
          type: 'email',
          description: 'Email address for artist bookings and inquiries',
        }),
      ],
    }),

    // Operations Group
    // update with availability plug-in
    defineField({
      name: 'hours',
      title: 'Operating Hours',
      type: 'object',
      description: 'e.g., 5:00 PM - 12:00 AM or Closed',
      group: GROUP.OPERATIONS,
      fields: [
        defineField({
          name: 'monday',
          title: 'Monday',
          type: 'string',
          placeholder: 'e.g., 5:00 PM - 12:00 AM or Closed',
        }),
        defineField({
          name: 'tuesday',
          title: 'Tuesday',
          type: 'string',
          placeholder: 'e.g., 5:00 PM - 12:00 AM or Closed',
        }),
        defineField({
          name: 'wednesday',
          title: 'Wednesday',
          type: 'string',
          placeholder: 'e.g., 5:00 PM - 12:00 AM or Closed',
        }),
        defineField({
          name: 'thursday',
          title: 'Thursday',
          type: 'string',
          placeholder: 'e.g., 5:00 PM - 12:00 AM or Closed',
        }),
        defineField({
          name: 'friday',
          title: 'Friday',
          type: 'string',
          placeholder: 'e.g., 5:00 PM - 1:00 AM or Closed',
        }),
        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          placeholder: 'e.g., 5:00 PM - 1:00 AM or Closed',
        }),
        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          placeholder: 'e.g., 5:00 PM - 12:00 AM or Closed',
        }),
      ],
    }),
    defineField({
      name: 'booking',
      title: 'Booking Information',
      type: 'object',
      group: GROUP.OPERATIONS,
      fields: [
        defineField({
          name: 'reservationsEnabled',
          title: 'Reservations Enabled',
          type: 'boolean',
          description: 'Whether table reservations are available',
          initialValue: false,
        }),
        defineField({
          name: 'reservationUrl',
          title: 'Reservation URL',
          type: 'url',
          description: 'Link to reservation system (e.g., OpenTable, Resy)',
          hidden: ({parent}) => !parent?.reservationsEnabled,
        }),
        defineField({
          name: 'bookingInstructions',
          title: 'Booking Instructions',
          type: 'text',
          description:
            'Instructions for artists or performers who want to book a show',
          rows: 3,
        }),
      ],
    }),

    defineField({
      name: 'ageRestriction',
      title: 'Age Restriction',
      type: 'string',
      description: 'e.g., "21+", "18+", "All Ages"',
      initialValue: '21+',
      group: GROUP.OPERATIONS,
    }),
    defineField({
      name: 'coverCharge',
      title: 'Cover Charge Policy',
      type: 'text',
      description: 'Information about cover charges or entry fees',
      rows: 2,
      group: GROUP.OPERATIONS,
    }),

    // SEO & Social Group
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: SITE_NAME,
      group: GROUP.SEO_SOCIAL,
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      initialValue: SITE_URL.toString(),
      description: 'The main website URL',
      group: GROUP.SEO_SOCIAL,
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description:
        'A brief description of the venue for SEO and social sharing',
      group: GROUP.SEO_SOCIAL,
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords for search engine optimization',
      group: GROUP.SEO_SOCIAL,
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      group: GROUP.SEO_SOCIAL,
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        }),
        defineField({
          name: 'spotify',
          title: 'Spotify URL',
          type: 'url',
          description: 'Spotify profile or playlist URL',
        }),
        defineField({
          name: 'soundcloud',
          title: 'SoundCloud URL',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      venueName: 'venueName',
      logo: 'logo',
    },
    prepare({venueName, logo}) {
      return {
        title: venueName || 'Settings',
        media: logo,
      }
    },
  },
})
