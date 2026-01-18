import type {FieldGroupDefinition} from 'sanity'

export const GROUP = {
  SEO: 'seo',
  MAIN_CONTENT: 'main-content',
  CARD: 'card',
  RELATED: 'related',
  OG: 'og',
  SETTINGS: 'settings',
  // Settings groups
  GENERAL_INFO: 'general-info',
  OPERATIONS: 'operations',
  SEO_SOCIAL: 'seo-social',
}

export const GROUPS: FieldGroupDefinition[] = [
  {
    name: GROUP.MAIN_CONTENT,
    title: 'Content',
    default: true,
  },
  {
    name: GROUP.SEO,
    title: 'SEO',
  },
  {
    name: GROUP.SETTINGS,
    title: 'Settings',
  },
]

export const SETTINGS_GROUPS: FieldGroupDefinition[] = [
  {
    name: GROUP.GENERAL_INFO,
    title: 'General Information',
    default: true,
  },
  {
    name: GROUP.OPERATIONS,
    title: 'Operations',
  },
  {
    name: GROUP.SEO_SOCIAL,
    title: 'SEO & Social',
  },
]

// export const GROUPS: FieldGroupDefinition[] = [
//   // { name: CONST.MAIN_CONTENT, default: true },
//   {
//     name: GROUP.MAIN_CONTENT,
//     icon: ComposeIcon,
//     title: "Content",
//     default: true,
//   },
//   { name: GROUP.SEO, icon: SearchIcon, title: "SEO" },
//   {
//     name: GROUP.OG,
//     icon: InsertAboveIcon,
//     title: "Open Graph",
//   },
//   {
//     name: GROUP.CARD,
//     icon: BlockElementIcon,
//     title: "Card",
//   },
//   {
//     name: GROUP.RELATED,
//     icon: InlineElementIcon,
//     title: "Related",
//   },
// ];
