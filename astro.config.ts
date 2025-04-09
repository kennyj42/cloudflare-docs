import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightImageZoom from "starlight-image-zoom";
import liveCode from "astro-live-code";
import starlightLinksValidator from "starlight-links-validator";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import { readdir } from "fs/promises";
import { fileURLToPath } from "url";

import rehypeTitleFigure from "rehype-title-figure";
import rehypeMermaid from "./src/plugins/rehype/mermaid.ts";
import rehypeAutolinkHeadings from "./src/plugins/rehype/autolink-headings.ts";
import rehypeExternalLinks from "./src/plugins/rehype/external-links.ts";
import rehypeHeadingSlugs from "./src/plugins/rehype/heading-slugs.ts";

async function autogenSections() {
	const sections = (
		await readdir("./src/content/docs/", {
			withFileTypes: true,
		})
	)
		.filter((x) => x.isDirectory())
		.map((x) => x.name);
	return sections.map((x) => {
		return {
			label: x,
			autogenerate: {
				directory: x,
				collapsed: true,
			},
		};
	});
}

async function autogenStyles() {
	const styles = (
		await readdir("./src/styles/", {
			withFileTypes: true,
			recursive: true,
		})
	)
		.filter((x) => x.isFile())
		.map((x) => x.parentPath + x.name);

	return styles;
}

const sidebar = await autogenSections();
const customCss = await autogenStyles();

const runLinkCheck = process.env.RUN_LINK_CHECK || false;

// https://astro.build/config
export default defineConfig({
	site: "https://developers.cloudflare.com",
	markdown: {
		smartypants: false,
		rehypePlugins: [
			rehypeMermaid,
			rehypeExternalLinks,
			rehypeHeadingSlugs,
			rehypeAutolinkHeadings,
			// @ts-expect-error plugins types are outdated but functional
			rehypeTitleFigure,
		],
	},
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				limitInputPixels: false,
			},
		},
	},
	experimental: {
		contentIntellisense: true,
	},
	server: {
		port: 1111,
	},
	integrations: [
		starlight({
			title: "Cloudflare Docs",
			logo: {
				src: "./src/assets/logo.svg",
			},
			favicon: "/favicon.png",
			social: {
				github: "https://github.com/cloudflare/cloudflare-docs",
				"x.com": "https://x.com/cloudflare",
				youtube: "https://www.youtube.com/cloudflare",
			},
			editLink: {
				baseUrl:
					"https://github.com/cloudflare/cloudflare-docs/edit/production/",
			},
			components: {
				Footer: "./src/components/overrides/Footer.astro",
				Head: "./src/components/overrides/Head.astro",
				Header: "./src/components/overrides/Header.astro",
				Hero: "./src/components/overrides/Hero.astro",
				MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
				Sidebar: "./src/components/overrides/Sidebar.astro",
				PageTitle: "./src/components/overrides/PageTitle.astro",
				TableOfContents: "./src/components/overrides/TableOfContents.astro",
			},
			sidebar,
			customCss,
			pagination: false,
			plugins: [
				...(runLinkCheck
					? [
							starlightLinksValidator({
								errorOnInvalidHashes: false,
								errorOnLocalLinks: false,
								exclude: [
									"/api/",
									"/api/**",
									"/changelog/**",
									"/http/resources/**",
									"{props.*}",
									"/",
									"**/glossary/?term=**",
									"/products/?product-group=*",
									"/products/",
									"/rules/snippets/examples/?operation=*",
									"/rules/transform/examples/?operation=*",
									"/ruleset-engine/rules-language/fields/reference/**",
									"/workers/examples/?languages=*",
									"/workers/examples/?tags=*",
									"/workers-ai/models/**",
								],
							}),
						]
					: []),
				starlightDocSearch({
					clientOptionsModule: "./src/plugins/docsearch/index.ts",
				}),
				starlightImageZoom(),
			],
			lastUpdated: true,
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		liveCode({}),
		icon(),
		sitemap({
			filter(page) {
				return !page.startsWith(
					"https://developers.cloudflare.com/style-guide/",
				);
			},
			serialize(item) {
				item.lastmod = new Date().toISOString();
				return item;
			},
		}),
		react(),
	],
	vite: {
		resolve: {
			alias: {
				"./Page.astro": fileURLToPath(
					new URL("./src/components/overrides/Page.astro", import.meta.url),
				),
				"../components/Page.astro": fileURLToPath(
					new URL("./src/components/overrides/Page.astro", import.meta.url),
				),
			},
		},
	},
});
