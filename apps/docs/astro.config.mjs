// @ts-check
import { SITE_NAME, SITE_URL } from '@repo/constants'
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightThemeFlexoki from 'starlight-theme-flexoki'
import starlightDocSearch from '@astrojs/starlight-docsearch'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: SITE_NAME,
			// social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Project Overview',
					slug: 'index',
				},
				{
					label: 'Sanity',
					autogenerate: { directory: 'sanity' },
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			plugins: [starlightThemeFlexoki({
				accentColor: "yellow",
			}),
			starlightDocSearch({
				appId: '8YI0O6D19I',
				apiKey: '5a420334ea36fb52762b984e072829df',
				indexName: 'Rotunde Docs',
			}),
			],
		}),
	],
});
