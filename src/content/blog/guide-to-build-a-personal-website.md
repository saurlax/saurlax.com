---
title: 个人网站搭建指南
date: 2025-04-02T12:55:40+08:00
tags: []
---

这篇文章将会从零开始，教你如何搭建一个个人网站。我们将会从框架选择、域名注册、服务器选择，以及网站部署、SEO 优化和美化等方面进行详细讲解。无论你是一个初学者还是有一定经验的开发者，这篇文章都将为你提供实用的指导和建议。

## 框架选择

目前来说，搭建个人网站有非常多的选择，有些还带有 CMS（内容管理系统）功能，但是总体可以分成下面几类：

- 静态网站生成器：如 Hugo、Jekyll、Hexo 等，适合技术人员使用，一般使用 Markdown 写作，主题主要通过模板语言实现。适合博客、文档等类型的网站。因为是静态网站，所以速度快，安全性高，维护成本低。
- 前端框架：如 Astro、Next.js、Nuxt.js 等，适合有一定前端基础的开发者使用，可以按照自己的需求进行定制，支持服务端渲染（SSR）和静态网站生成（SSG），适合需要动态交互的网站，可以部署到 Serverless 平台，成本较低。
- 无头 CMS：如 Hygraph、Contentful、Ghost 等，通常可以在线编辑内容，适合需要频繁更新内容的网站，支持 API 接口，可以与前端框架结合使用。
- 传统 CMS：如 WordPress、Typecho、Halo 等，可以直接在线编辑内容，适合不想折腾的用户，功能强大，但是维护成本高，安全性差，速度慢。

从上到下，部署成本和维护成本逐渐增加，速度和安全性逐渐降低。静态网站生成器和前端框架因为一般使用本地 Markdown 写作，所以可以使用 Git 进行版本控制，免去了备份的担忧。无头 CMS 和传统 CMS 一般使用数据库存储内容，虽然可以在线编辑，但是需要定期备份数据库，同时因为需要使用服务器，所以需要定期维护，安全性和速度都不如静态网站生成器和前端框架。但是他们提供的在线编辑功能非常方便，可以在移动设备上进行编辑，而且有更多可以开箱即用的功能。

| 类型           | 编辑方式 | 存储方式 | 部署方式                                                       |
| -------------- | -------- | -------- | -------------------------------------------------------------- |
| 静态网站生成器 | 本地     | Git      | 完全静态，通常免费                                             |
| 前端框架       | 本地     | Git      | Serverless 平台，有一定免费额度                                |
| 无头 CMS       | 在线     | 数据库   | 无头 CMS 平台通常会提供免费 API 额度，前端可以选择以上两种方式 |
| 传统 CMS       | 在线     | 数据库   | 需要购买服务器                                                 |

### 静态网站生成器

静态网站生成器是最简单的选择，适合技术人员使用。它们都支持 Markdown 写作，有的还支持 MDX 等更高级的写作方式。它们的主要区别在于使用的模板语言和编程语言。

- [Hexo](https://hexo.io/zh-cn/)：是 Node.js 编写的静态网站生成器，速度快，支持 Markdown 和 EJS 模板语言。因为是 Node.js 编写的，所以很多内容可以通过 js 预先渲染，速度更快。
- [Hugo](https://gohugo.io/)：是 Go 语言编写的静态网站生成器，速度快，支持 Markdown 和 Go 模板语言。但是对于数学公式渲染等需求，通常需要在前端渲染，没有预先渲染的快。
- [Jekyll](https://jekyllcn.com/docs/home/)：是 GitHub Pages 的默认静态网站生成器，使用 Ruby 编写，支持 Markdown 和 Liquid 模板语言。优点是不需要任何配置即可直接在 GitHub 上部署，缺点是速度较慢，功能较少。
- [Zola](https://www.getzola.org/)：是 Rust 编写的静态网站生成器，速度快，支持 Markdown 和 Tera 模板语言。

以下是一些静态文档网站生成器，适合搭建文档网站。较上面的生成器来说通用性较差，但是针对文档的组织和展示进行了优化，通常会有更好的体验。

- [Docusaurus](https://docusaurus.io/zh-CN/)：是一个基于 React 的静态网站生成器，支持 Markdown 和 React 组件。适合搭建文档网站。生成出来的网站通常非常美观。
- [VitePress](https://vitepress.dev/zh/)：是一个基于 Vite 的静态网站生成器，支持 Markdown 和 Vue 组件。适合搭建文档网站，速度快，插件少。
- [VuePress](https://vuepress.vuejs.org/zh/)：是一个基于 Vue.js 的静态网站生成器，支持 Markdown 和 Vue 组件。适合搭建文档网站，启动速度较 VitePress 慢，但是功能更强大。
- [MkDocs](https://www.mkdocs.org/)：是一个专注于文档的网站生成器，使用 Python 编写，支持 Markdown 和 Jinja2 模板语言。适合搭建文档网站，常见于 Python 项目。
- [mdBook](https://rust-lang.github.io/mdBook/)：是一个基于 Rust 的静态网站生成器，支持 Markdown 和 Rust 组件。适合搭建文档网站，常见于 Rust 项目。

### 前端框架

前端框架的通用性相比上述静态网站生成器要高很多，适合有一定前端基础的开发者使用。它们通常支持服务端渲染（SSR）和静态网站生成（SSG），可以根据需求进行选择。它们的主要区别在于使用的编程语言和框架。

- [Astro](https://astro.build/)：是一个新的前端框架，支持多种前端框架（React、Vue、Svelte 等）。可以通过强大的插件系统快速调用别人的组件，如 SEO、Sitemap、RSS 等。适合想要完全自己定制网站，但不希望重复造轮子的用户。
- [Next.js](https://nextjs.org/)：是一个 React 框架，支持服务端渲染（SSR）和静态网站生成（SSG）。
- [Nuxt](https://nuxt.com/)：是一个 Vue 框架，支持服务端渲染（SSR）和静态网站生成（SSG）。

### 无头 CMS

无头 CMS 是一种新的内容管理系统，它们通常由平台提供在线编辑功能，适合需要频繁更新内容的网站。前端框架通过在编译时或运行时调用 API 接口获取内容。

- [Hygraph](https://hygraph.com/)：开源，基于 GraphQL 的无头 CMS，支持 Markdown 和 React 组件。有免费计划。
- [Contentful](https://www.contentful.com/)：开源，基于 GraphQL 的无头 CMS，支持 Markdown 和 React 组件。有免费计划。
- [Ghost](https://ghost.org/)：开源，基于 Node.js 的无头 CMS，支持 Markdown 和 Handlebars 模板语言。官方版本无免费计划，支持自建。

### 传统 CMS

传统 CMS 将前端和后端紧密结合在一起，适合不想折腾的用户。它们通常提供在线编辑功能，适合需要频繁更新内容的网站。

- [Halo](https://www.halo.run/)：开源，基于 Java 的传统 CMS，支持 Markdown 和 Handlebars 模板语言。仅支持自建。
- [WordPress](https://wordpress.org/)：开源，基于 PHP 的传统 CMS，支持 Markdown 和 PHP 模板语言。安全漏洞较多，需谨慎使用。

## 文章编写

显然，为了维持个人网站的活跃度，我们需要定期更新网站的内容。因为 CMS 一般带有自带的编辑器可以直接在线编辑，所以这里主要介绍静态网站生成器和前端框架的写作方式。常见的编辑器有：

- [Typora](https://typora.io/)：一款非常好用的 Markdown 编辑器，支持实时预览、数学公式渲染、Mermaid 流程图和导出 PDF 等功能。需要付费。
- [Obsidian](https://obsidian.md/)：免费的 Markdown 知识库管理软件，插件系统非常强大。
- [思源笔记](https://b3log.org/siyuan/)：免费的个人知识管理系统，支持融合块、大纲和双向链接。

### VSCode

既然前端已经是在 VSCode 中编写的了，那为什么不也在 VSCode 中编写 Markdown 呢？VSCode 的 Markdown 编辑器非常强大，支持实时预览、语法高亮、自动补全等功能。可以通过安装一些插件来增强编辑器的功能，如：

- Markdown All in One：提供 Markdown 的自动补全，数学公式渲染，目录生成等功能。
- Mermaid Markdown Syntax Highlighting：如果你使用 Mermaid 绘制流程图和时序图，可以安装这个插件来增强语法高亮。
- Markdown Preview Mermaid Support：如果你使用 Mermaid 绘制流程图和时序图，可以安装这个插件来增强预览功能。
- Markdown Checkboesk：提供 Markdown 的复选框功能。
- MDX：提供 MDX 的语法高亮和预览功能。
- Prettier：提供代码格式化功能，同样也支持格式化 Markdown。他可以自动帮你在中英文之间加上空格。具体详见[中文排版指南](https://github.com/aaranxu/chinese-copywriting-guidelines)。

此外，VSCode 本身还支持拖动添加图片和文件，直接将文件拖到 Markdown 中即可添加链接。读者可以参考我的配置文件：

```jsonc
// .vscode/settings.json
// 只在工作区内生效，你也可以添加到全局 VSCode 配置文件中
{
  "markdown.copyFiles.destination": {
    "src/content/**/*.md": "./images/image.jpg"
    // 设置图片存放路径
  }
}
```

此外，还可以添加 Snippet 来快速插入 Frontmatter：

```jsonc
{
  "Frontmatter": {
    "scope": "markdown",
    "prefix": "frontmatter",
    "body": [
      "---",
      "title: $TM_FILENAME_BASE",
      "date: $CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T$CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND+08:00",
      "tags: []",
      "---",
      "$0"
    ],
    "description": "Frontmatter"
  }
}
```

Markdown 默认不使用 Snippet，所以需要在 VSCode 的设置中添加：

```jsonc
// .vscode/settings.json
{
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "other": "on",
      "comments": "off",
      "strings": "off"
    }
  }
}
```

## 网站部署

根据使用的框架类型，网站部署方式也有所不同。对于静态网站生成器和前端框架来说，通常可以选择 Serverless 平台进行部署。对于无头 CMS 和传统 CMS 来说，通常需要购买服务器进行部署。

### 静态网站生成器和前端框架

Serverless 平台通常针对常见静态网站生成器和前端框架已预先配置好了相应的部署脚本，只需要授权访问对应的 Git 仓库即可快速自动部署。

- [Cloudflare Pages](https://pages.cloudflare.com/)：有免费额度，支持自定义域名（需要将域名解析服务器设置到 Cloudflare 上），支持 HTTPS，支持直接通过 GitHub、GitLab 和 Bitbucket 部署。国内某些地区访问较慢。
- [Vercel](https://vercel.com/)：有免费额度，支持自定义域名，支持直接通过 GitHub、GitLab 和 Bitbucket 部署。以往有被墙的情况。
- [Netlify](https://www.netlify.com/)：有免费额度，支持自定义域名，支持直接通过 GitHub、GitLab 和 Bitbucket 部署。
- [GitHub Pages](https://pages.github.com/)：免费，支持自定义域名，支持直接通过 GitHub 部署。对于除 Jekyll 以外的静态网站生成器，需要编写 GitHub Actions 配置进行部署。访问速度较慢。
- [Zeabur](https://zeabur.com/zh-CN)：有免费额度，支持自定义域名，支持直接通过 GitHub、GitLab 和 Bitbucket 部署。国内访问速度较快。
- [EdgeOne Pages](https://edgeone.ai/zh/products/pages)：目前免费，仅支持 GitHub。国内访问速度快。

### 无头 CMS 和传统 CMS

无头 CMS 和传统 CMS 通常需要购买服务器进行部署。可以选择 VPS（虚拟专用服务器）或云服务器，通常需要注意流量消耗问题和 DDoS 攻击问题。可以通过 Cloudflare 等 CDN 服务进行加速和防护。但是国内访问 Cloudflare 的速度较慢，而国内的防护服务又通常较贵，需要读者自行权衡。

对于学生来说，很多厂商都有提供免费或低价服务器的计划，可以申请使用。但是这些机器通常配置较低，而且计划结束后要考虑迁移的问题。

如果使用的服务器在大陆，还要注意备案问题。通常会选择中国香港的服务器，国内访问速度较快且不需要备案。

- 阿里云：[高校计划](https://university.aliyun.com/)有 300 元代金券可用于免费领取 2C2G 服务器，流量按量计费。此外 99 计划的服务器可以无限续费，省去了经常迁移的麻烦。
- 腾讯云：[云+校园](https://cloud.tencent.com/act/campus?utm_source=qcloud&utm_medium=navigation&utm_campaign=campus)有国内 2C2G4M 112 元/年的优惠，总共可以续费 3 次。
- Azure：通过 GitHub 学生认证后可以领取 200 美元代金券，但是只能购买最低的 1C0.5G 服务器，流量按量计费。
- DigitalOcean：通过 GitHub 学生认证后可以领取 200 美元代金券。

## 网站优化

当你的网站初步搭建完成后，接下来就可以开始考虑购买一个响亮的域名和进行一些 SEO 优化了。

### 域名

域名是网站的门面，选择一个好的域名可以提升网站的专业性和可信度。[某些网站](https://www.nazhumi.com/)可以查看哪些域名后缀在哪些平台上最便宜，但是据我实测可能并不准确。如果域名在国内注册还需要进行实名认证，注意实名认证和网站备案并不是一个东西。

- 阿里云：注意注册和续费域名时可以获取一下[优惠口令](https://help.aliyun.com/zh/dws/support/discount-codes)，折扣还是比较不错的。
- 腾讯云：基本上没有优惠。
- Cloudflare：对于 .org 等国内无法实名认证的域名我通常会在 Cloudflare 上注册，价格算是比较便宜的，而且正好也可以使用 Cloudflare 的一些免费服务。
- Namecheap：正如其名，大多数时候这上面域名比较便宜。但是据我实测好像没有便宜多少。

如果你希望好好运营你的网站，推荐使用 `.com`, `.net`, `.org` 或 `.cn` 等常用的域名后缀。`.com` 是最常用的域名后缀，适合个人网站和商业网站；`.net` 通常用于网络服务提供商和技术公司；`.org` 通常用于非营利组织；`.cn` 是中国的国家顶级域名，适合中国的网站。不然如果一开始随便注册的域名，后续想要换域名的话，可能会导致 SEO 和流量损失。

域名方面我们主要使用 A 记录和 CNAME 记录。A 记录是将域名解析到服务器的 IP 地址，CNAME 记录是将域名解析到另一个域名。个人网站一般会同时添加上 www 和 @ 的记录，即 `www.example.com` 和 `example.com`。但是需要特别注意的是，一级域名（`@`，如 `example.com`）不能添加 CNAME 记录，这可能会导致其他的 MX 记录失效，或造成其他问题。此时有两种方法：

- 使用 A 记录将一级域名解析到服务器的 IP 地址。如若使用 [Vercel](https://vercel.com/docs/domains/working-with-dns) 则解析到 `76.76.21.21`，[Netlify](https://docs.netlify.com/domains/configure-domains/configure-external-dns/#configure-an-apex-domain) 则解析到 `75.2.60.5`。
- 使用 Cloudflare 的 CNAME Flattening 功能。Cloudflare 会自动将 CNAME 记录转换为 A 记录，避免上述问题。但是这个拉平操作貌似是在 Cloudflare 的边缘服务器上进行解析的，所以可能会导致访问速度比上面的方案还要慢。

### 网站分析

网站分析可以帮助你了解网站的访问情况和用户行为，从而优化网站的内容和结构。常用的网站分析工具有 Google Analytics、百度统计等。

- [百度站长工具](https://ziyuan.baidu.com/site/index#/)：可以查看网站在百度的收录情况和流量情况。
- [Bing Webmaster](https://www.bing.com/webmasters/about)：可以查看网站在 Bing 的收录情况和流量情况。
- [Google Search Console](https://search.google.com/search-console/about?hl=zh-CN)：可以查看网站在 Google 的收录情况和流量情况。
- [Google Analytics](https://analytics.google.com/analytics/web/)：可以查看网站的访问情况和用户行为。
- [Umami](https://umami.is/)：开源的自建网站分析工具，可以查看网站的访问情况和用户行为，支持使用官方云服务和自建。

如果你的网站使用 Cloudflare 的 CDN 服务，也可以直接在 Cloudflare 的面板中查看网站的访问情况和流量情况。

### SEO 优化

为了让你的网站在搜索引擎中获得更好的排名，你需要进行一些 SEO 优化。可以在上面的网站分析工具中查看网站的 SEO 优化情况，并根据建议进行优化。常见的 SEO 优化方法有：

- 标题和描述：在网站的 `<head>` 标签中添加 `<title>` 和 `<meta name="description">` 标签，设置网站的标题和描述。
- 关键词：在网站的 `<head>` 标签中添加 `<meta name="keywords">` 标签，设置网站的关键词。
- sitemap：在网站的根目录下添加 `sitemap.xml` 文件，列出网站的所有页面，方便搜索引擎抓取。
- robots.txt：在网站的根目录下添加 `robots.txt` 文件，设置搜索引擎抓取的规则。

需要注意的是，对于百度来说，未备案的域名的权重会非常低，基本无法搜索到。

此外，还可以通过和其他网站交换友情链接、在社交媒体上分享网站链接等方式来提高网站的曝光率和流量。例如本站的友情链接可以在[这里](/friends)进行申请。也欢迎大家将自己的博客链接添加到 [NAOSI Blogroll](https://blogroll.naosi.org/) 当中。读者还可以尝试参加以下项目：

- [十年之约](https://www.foreverblog.cn/)：十年之约，即从加入这个活动起，我们的博客十年不关闭，保持更新和活力！
- [开往](https://www.travellings.cn/)：让传统友链“活跃”，让网页相互接力，让流量相互流动，让网络开放起来

### 网站美化

有很多可以直接通过 `<script>` 标签引入的 CSS 和 JS 库，可以快速美化你的网站。常用的有：

- [Font Awesome](https://fontawesome.com/)：提供了大量的图标，可以通过 `<i class="fa fa-icon"></i>` 的形式来使用。在 npm 上有现成的包，可以直接通过 [jsdelivr](https://www.jsdelivr.com/package/npm/font-awesome) 引入。
- [Google Fonts](https://fonts.google.com/)：提供了大量的字体，可以用于修改网站的字体。
- [Giscus](https://giscus.app/)：开源的评论系统，可以通过 GitHub Discussions 来进行评论。可以在 GitHub 上创建一个新的仓库，作为评论的存储库。
- [Live2D Widget](https://github.com/stevenjoezhang/live2d-widget)：在网页中添加 Live2D 看板娘。兼容 PJAX，支持无刷新加载。

## 实战演练

限于篇幅关系，这篇文章无法详细介绍每个框架的使用方法和配置文件的编写方法。读者可以参考各个框架的官方文档进行学习。在这里我将以 Astro 为例，选择一个主题，并将其部署到 Netlify 上。

首先你需要安装好 [Node.js](https://nodejs.org/zh-cn) 和 [Git](https://git-scm.com/downloads)。可以使用以下命令验证是否安装成功：

```bash
$ node -v
v20.16.0
$ npm -v
10.9.2
$ git --version
git version 2.33.1.windows.1
```

然后我们对 Git 进行配置，设置用户名和邮箱。可以使用以下命令进行配置：

```bash
# 注意用户名和邮箱要与你 GitHub 上的保持一致
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

之后，我们安装 `pnpm`，这是一个非常好用的包管理器，速度比 npm 快很多。可以使用以下命令安装：

```bash
# 设置国内镜像源
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
```

然后，我们在 Astro 的[主题列表](https://astro.build/themes/1/)中选择一个好看的主题，fork 它，然后 clone 你 fork 的仓库：

```bash
git clone https://github.com/your-name/your-repo.git
```

在本地运行网站：

```bash
# 具体可能需要根据主题的 README.md 文件进行安装
pnpm i
pnpm dev
```

当一切就绪时，推送你的更改到 GitHub 上：

```bash
git add .
git commit -m "commit message"
git push origin main
```

你也可以使用 VSCode 的源代码管理面板进行提交和推送。提交信息可以参考 [Git Commit message 编写指南](https://gitee.com/help/articles/4231)。

这时，登录到 [Netlify](https://app.netlify.com/) 上，点击 `New site from Git`，选择 `GitHub`，授权访问你的 GitHub 仓库。然后选择你刚刚 fork 的仓库，点击 `Deploy site`。Netlify 会自动检测到你使用的是 Astro，并自动配置好部署脚本。稍等片刻，你的网站就会自动部署完成。
