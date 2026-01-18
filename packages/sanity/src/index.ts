import {SITE_NAME} from '@repo/constants'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {singletonTools} from 'sanity-plugin-singleton-management'

import {schemaTypes} from './schema'

export default defineConfig({
  name: 'default',
  title: SITE_NAME,

  projectId: 'dm359cdv',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), media(), singletonTools()],

  schema: {
    types: schemaTypes,
  },
})
