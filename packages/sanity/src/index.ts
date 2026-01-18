import {SITE_NAME} from '@repo/constants'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {singletonTools} from 'sanity-plugin-singleton-management'
import {tags} from 'sanity-plugin-tags-v4'
import {userSelect} from 'sanity-plugin-user-select-input'

import {schemaTypes} from './schema'

export default defineConfig({
  name: 'rotunde',
  title: SITE_NAME,

  projectId: 'dm359cdv',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    media(),
    singletonTools(),
    tags(),
    userSelect(),
  ],

  schema: {
    types: schemaTypes,
  },
})
