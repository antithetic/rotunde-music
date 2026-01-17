import {SITE_NAME} from '@repo/constants'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {singletonTools} from 'sanity-plugin-singleton-management'

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
