/**
 * This file contains the CSS styles for the GitHub Markdown dark theme. 
 * It is used within the ReadmeShadowContainer component to style the 
 * Markdown content rendered in a Shadow DOM. 
 *
 * **Issues Encountered:**
 * 
 * 1. **CSS Import Problems**: Attempts to import the CSS directly using 
 *    `import githubMarkdownCss from "github-markdown-css/github-markdown-dark.css";` 
 *    led to TypeScript errors, specifically:
 *    "Cannot find module 'github-markdown-css/github-markdown-dark.css' or its corresponding type declarations.ts(2307)". 
 *    This issue arises because Next.js does not support default imports for CSS files 
 *    out of the box, causing TypeScript to not recognize CSS files as valid modules.
 * 
 * 2. **Global Style Leakage**: Directly importing CSS would apply styles globally, 
 *    which is undesirable for components using Shadow DOM. This encapsulation 
 *    is critical to avoid unintended styling impacts on other parts of the application.
 * 
 * **Design Decision**: 
 * 
 * To resolve these issues, we opted to define the necessary CSS styles directly 
 * within this TypeScript file as a template literal string. This approach:
 * - Encapsulates styles specifically for the Markdown rendering.
 * - Prevents any conflicts or overrides with global styles.
 * 
 * This solution ensures that the Markdown content can be styled appropriately 
 * without affecting the overall application styling.
 */

// Source URL: https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown-dark.css
// Lib: npm : github-markdown-css : https://www.npmjs.com/package/github-markdown-css

const css = `.markdown-body{color-scheme:dark;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin:0;color:#f0f6fc;background-color:#0d1117;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";font-size:16px;line-height:1.5;word-wrap:break-word;scroll-behavior:auto!important}.markdown-body .octicon{display:inline-block;fill:currentColor;vertical-align:text-bottom}.markdown-body h1:hover .anchor .octicon-link:before,.markdown-body h2:hover .anchor .octicon-link:before,.markdown-body h3:hover .anchor .octicon-link:before,.markdown-body h4:hover .anchor .octicon-link:before,.markdown-body h5:hover .anchor .octicon-link:before,.markdown-body h6:hover .anchor .octicon-link:before{width:16px;height:16px;content:' ';display:inline-block;background-color:currentColor;-webkit-mask-image:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");mask-image:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>")}.markdown-body details,.markdown-body figcaption,.markdown-body figure{display:block}.markdown-body summary{display:list-item}.markdown-body [hidden]{display:none!important}.markdown-body a{background-color:#fff0;color:#4493f8;text-decoration:none}.markdown-body abbr[title]{border-bottom:none;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}.markdown-body b,.markdown-body strong{font-weight:600}.markdown-body dfn{font-style:italic}.markdown-body h1{margin:.67em 0;font-weight:600;padding-bottom:.3em;font-size:2em;border-bottom:1px solid #3d444db3}.markdown-body mark{background-color:#bb800926;color:#f0f6fc}.markdown-body small{font-size:90%}.markdown-body sub,.markdown-body sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}.markdown-body sub{bottom:-.25em}.markdown-body sup{top:-.5em}.markdown-body img{border-style:none;max-width:100%;box-sizing:content-box}.markdown-body code,.markdown-body kbd,.markdown-body pre,.markdown-body samp{font-family:monospace;font-size:1em}.markdown-body figure{margin:1em 2.5rem}.markdown-body hr{box-sizing:content-box;overflow:hidden;background:#fff0;border-bottom:1px solid #3d444db3;height:.25em;padding:0;margin:1.5rem 0;background-color:#3d444d;border:0}.markdown-body input{font:inherit;margin:0;overflow:visible;font-family:inherit;font-size:inherit;line-height:inherit}.markdown-body [type=button],.markdown-body [type=reset],.markdown-body [type=submit]{-webkit-appearance:button;appearance:button}.markdown-body [type=checkbox],.markdown-body [type=radio]{box-sizing:border-box;padding:0}.markdown-body [type=number]::-webkit-inner-spin-button,.markdown-body [type=number]::-webkit-outer-spin-button{height:auto}.markdown-body [type=search]::-webkit-search-cancel-button,.markdown-body [type=search]::-webkit-search-decoration{-webkit-appearance:none;appearance:none}.markdown-body ::-webkit-input-placeholder{color:inherit;opacity:.54}.markdown-body ::-webkit-file-upload-button{-webkit-appearance:button;appearance:button;font:inherit}.markdown-body a:hover{text-decoration:underline}.markdown-body ::placeholder{color:#9198a1;opacity:1}.markdown-body hr::before{display:table;content:""}.markdown-body hr::after{display:table;clear:both;content:""}.markdown-body table{border-spacing:0;border-collapse:collapse;display:block;width:max-content;max-width:100%;overflow:auto}.markdown-body td,.markdown-body th{padding:0}.markdown-body details summary{cursor:pointer}.markdown-body a:focus,.markdown-body [role=button]:focus,.markdown-body input[type=radio]:focus,.markdown-body input[type=checkbox]:focus{outline:2px solid #1f6feb;outline-offset:-2px;box-shadow:none}.markdown-body a:focus:not(:focus-visible),.markdown-body [role=button]:focus:not(:focus-visible),.markdown-body input[type=radio]:focus:not(:focus-visible),.markdown-body input[type=checkbox]:focus:not(:focus-visible){outline:solid 1px #fff0}.markdown-body a:focus-visible,.markdown-body [role=button]:focus-visible,.markdown-body input[type=radio]:focus-visible,.markdown-body input[type=checkbox]:focus-visible{outline:2px solid #1f6feb;outline-offset:-2px;box-shadow:none}.markdown-body a:not([class]):focus,.markdown-body a:not([class]):focus-visible,.markdown-body input[type=radio]:focus,.markdown-body input[type=radio]:focus-visible,.markdown-body input[type=checkbox]:focus,.markdown-body input[type=checkbox]:focus-visible{outline-offset:0}.markdown-body kbd{display:inline-block;padding:.25rem;font:11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;line-height:10px;color:#f0f6fc;vertical-align:middle;background-color:#151b23;border:solid 1px #3d444db3;border-bottom-color:#3d444db3;border-radius:6px;box-shadow:inset 0 -1px 0 #3d444db3}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin-top:1.5rem;margin-bottom:1rem;font-weight:600;line-height:1.25}.markdown-body h2{font-weight:600;padding-bottom:.3em;font-size:1.5em;border-bottom:1px solid #3d444db3}.markdown-body h3{font-weight:600;font-size:1.25em}.markdown-body h4{font-weight:600;font-size:1em}.markdown-body h5{font-weight:600;font-size:.875em}.markdown-body h6{font-weight:600;font-size:.85em;color:#9198a1}.markdown-body p{margin-top:0;margin-bottom:10px}.markdown-body blockquote{margin:0;padding:0 1em;color:#9198a1;border-left:.25em solid #3d444d}.markdown-body ul,.markdown-body ol{margin-top:0;margin-bottom:0;padding-left:2em}.markdown-body ol ol,.markdown-body ul ol{list-style-type:lower-roman}.markdown-body ul ul ol,.markdown-body ul ol ol,.markdown-body ol ul ol,.markdown-body ol ol ol{list-style-type:lower-alpha}.markdown-body dd{margin-left:0}.markdown-body tt,.markdown-body code,.markdown-body samp{font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:12px}.markdown-body pre{margin-top:0;margin-bottom:0;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:12px;word-wrap:normal}.markdown-body .octicon{display:inline-block;overflow:visible!important;vertical-align:text-bottom;fill:currentColor}.markdown-body input::-webkit-outer-spin-button,.markdown-body input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none;appearance:none}.markdown-body .mr-2{margin-right:0.5rem!important}.markdown-body::before{display:table;content:""}.markdown-body::after{display:table;clear:both;content:""}.markdown-body>*:first-child{margin-top:0!important}.markdown-body>*:last-child{margin-bottom:0!important}.markdown-body a:not([href]){color:inherit;text-decoration:none}.markdown-body .absent{color:#f85149}.markdown-body .anchor{float:left;padding-right:.25rem;margin-left:-20px;line-height:1}.markdown-body .anchor:focus{outline:none}.markdown-body p,.markdown-body blockquote,.markdown-body ul,.markdown-body ol,.markdown-body dl,.markdown-body table,.markdown-body pre,.markdown-body details{margin-top:0;margin-bottom:1rem}.markdown-body blockquote>:first-child{margin-top:0}.markdown-body blockquote>:last-child{margin-bottom:0}.markdown-body h1 .octicon-link,.markdown-body h2 .octicon-link,.markdown-body h3 .octicon-link,.markdown-body h4 .octicon-link,.markdown-body h5 .octicon-link,.markdown-body h6 .octicon-link{color:#f0f6fc;vertical-align:middle;visibility:hidden}.markdown-body h1:hover .anchor,.markdown-body h2:hover .anchor,.markdown-body h3:hover .anchor,.markdown-body h4:hover .anchor,.markdown-body h5:hover .anchor,.markdown-body h6:hover .anchor{text-decoration:none}.markdown-body h1:hover .anchor .octicon-link,.markdown-body h2:hover .anchor .octicon-link,.markdown-body h3:hover .anchor .octicon-link,.markdown-body h4:hover .anchor .octicon-link,.markdown-body h5:hover .anchor .octicon-link,.markdown-body h6:hover .anchor .octicon-link{visibility:visible}.markdown-body h1 tt,.markdown-body h1 code,.markdown-body h2 tt,.markdown-body h2 code,.markdown-body h3 tt,.markdown-body h3 code,.markdown-body h4 tt,.markdown-body h4 code,.markdown-body h5 tt,.markdown-body h5 code,.markdown-body h6 tt,.markdown-body h6 code{padding:0 .2em;font-size:inherit}.markdown-body summary h1,.markdown-body summary h2,.markdown-body summary h3,.markdown-body summary h4,.markdown-body summary h5,.markdown-body summary h6{display:inline-block}.markdown-body summary h1 .anchor,.markdown-body summary h2 .anchor,.markdown-body summary h3 .anchor,.markdown-body summary h4 .anchor,.markdown-body summary h5 .anchor,.markdown-body summary h6 .anchor{margin-left:-40px}.markdown-body summary h1,.markdown-body summary h2{padding-bottom:0;border-bottom:0}.markdown-body ul.no-list,.markdown-body ol.no-list{padding:0;list-style-type:none}.markdown-body ol[type="a s"]{list-style-type:lower-alpha}.markdown-body ol[type="A s"]{list-style-type:upper-alpha}.markdown-body ol[type="i s"]{list-style-type:lower-roman}.markdown-body ol[type="I s"]{list-style-type:upper-roman}.markdown-body ol[type="1"]{list-style-type:decimal}.markdown-body div>ol:not([type]){list-style-type:decimal}.markdown-body ul ul,.markdown-body ul ol,.markdown-body ol ol,.markdown-body ol ul{margin-top:0;margin-bottom:0}.markdown-body li>p{margin-top:1rem}.markdown-body li+li{margin-top:.25em}.markdown-body dl{padding:0}.markdown-body dl dt{padding:0;margin-top:1rem;font-size:1em;font-style:italic;font-weight:600}.markdown-body dl dd{padding:0 1rem;margin-bottom:1rem}.markdown-body table th{font-weight:600}.markdown-body table th,.markdown-body table td{padding:6px 13px;border:1px solid #3d444d}.markdown-body table td>:last-child{margin-bottom:0}.markdown-body table tr{background-color:#0d1117;border-top:1px solid #3d444db3}.markdown-body table tr:nth-child(2n){background-color:#151b23}.markdown-body table img{background-color:#fff0}.markdown-body img[align=right]{padding-left:20px}.markdown-body img[align=left]{padding-right:20px}.markdown-body .emoji{max-width:none;vertical-align:text-top;background-color:#fff0}.markdown-body span.frame{display:block;overflow:hidden}.markdown-body span.frame>span{display:block;float:left;width:auto;padding:7px;margin:13px 0 0;overflow:hidden;border:1px solid #3d444d}.markdown-body span.frame span img{display:block;float:left}.markdown-body span.frame span span{display:block;padding:5px 0 0;clear:both;color:#f0f6fc}.markdown-body span.align-center{display:block;overflow:hidden;clear:both}.markdown-body span.align-center>span{display:block;margin:13px auto 0;overflow:hidden;text-align:center}.markdown-body span.align-center span img{margin:0 auto;text-align:center}.markdown-body span.align-right{display:block;overflow:hidden;clear:both}.markdown-body span.align-right>span{display:block;margin:13px 0 0;overflow:hidden;text-align:right}.markdown-body span.align-right span img{margin:0;text-align:right}.markdown-body span.float-left{display:block;float:left;margin-right:13px;overflow:hidden}.markdown-body span.float-left span{margin:13px 0 0}.markdown-body span.float-right{display:block;float:right;margin-left:13px;overflow:hidden}.markdown-body span.float-right>span{display:block;margin:13px auto 0;overflow:hidden;text-align:right}.markdown-body code,.markdown-body tt{padding:.2em .4em;margin:0;font-size:85%;white-space:break-spaces;background-color:#656c7633;border-radius:6px}.markdown-body code br,.markdown-body tt br{display:none}.markdown-body del code{text-decoration:inherit}.markdown-body samp{font-size:85%}.markdown-body pre code{font-size:100%}.markdown-body pre>code{padding:0;margin:0;word-break:normal;white-space:pre;background:#fff0;border:0}.markdown-body .highlight{margin-bottom:1rem}.markdown-body .highlight pre{margin-bottom:0;word-break:normal}.markdown-body .highlight pre,.markdown-body pre{padding:1rem;overflow:auto;font-size:85%;line-height:1.45;color:#f0f6fc;background-color:#151b23;border-radius:6px}.markdown-body pre code,.markdown-body pre tt{display:inline;max-width:auto;padding:0;margin:0;overflow:visible;line-height:inherit;word-wrap:normal;background-color:#fff0;border:0}.markdown-body .csv-data td,.markdown-body .csv-data th{padding:5px;overflow:hidden;font-size:12px;line-height:1;text-align:left;white-space:nowrap}.markdown-body .csv-data .blob-num{padding:10px .5rem 9px;text-align:right;background:#0d1117;border:0}.markdown-body .csv-data tr{border-top:0}.markdown-body .csv-data th{font-weight:600;background:#151b23;border-top:0}.markdown-body [data-footnote-ref]::before{content:"["}.markdown-body [data-footnote-ref]::after{content:"]"}.markdown-body .footnotes{font-size:12px;color:#9198a1;border-top:1px solid #3d444d}.markdown-body .footnotes ol{padding-left:1rem}.markdown-body .footnotes ol ul{display:inline-block;padding-left:1rem;margin-top:1rem}.markdown-body .footnotes li{position:relative}.markdown-body .footnotes li:target::before{position:absolute;top:calc(0.5rem*-1);right:calc(0.5rem*-1);bottom:calc(0.5rem*-1);left:calc(1.5rem*-1);pointer-events:none;content:"";border:2px solid #1f6feb;border-radius:6px}.markdown-body .footnotes li:target{color:#f0f6fc}.markdown-body .footnotes .data-footnote-backref g-emoji{font-family:monospace}.markdown-body .pl-c{color:#9198a1}.markdown-body .pl-c1,.markdown-body .pl-s .pl-v{color:#79c0ff}.markdown-body .pl-e,.markdown-body .pl-en{color:#d2a8ff}.markdown-body .pl-smi,.markdown-body .pl-s .pl-s1{color:#f0f6fc}.markdown-body .pl-ent{color:#7ee787}.markdown-body .pl-k{color:#ff7b72}.markdown-body .pl-s,.markdown-body .pl-pds,.markdown-body .pl-s .pl-pse .pl-s1,.markdown-body .pl-sr,.markdown-body .pl-sr .pl-cce,.markdown-body .pl-sr .pl-sre,.markdown-body .pl-sr .pl-sra{color:#a5d6ff}.markdown-body .pl-v,.markdown-body .pl-smw{color:#ffa657}.markdown-body .pl-bu{color:#f85149}.markdown-body .pl-ii{color:#f0f6fc;background-color:#8e1519}.markdown-body .pl-c2{color:#f0f6fc;background-color:#b62324}.markdown-body .pl-sr .pl-cce{font-weight:700;color:#7ee787}.markdown-body .pl-ml{color:#f2cc60}.markdown-body .pl-mh,.markdown-body .pl-mh .pl-en,.markdown-body .pl-ms{font-weight:700;color:#1f6feb}.markdown-body .pl-mi{font-style:italic;color:#f0f6fc}.markdown-body .pl-mb{font-weight:700;color:#f0f6fc}.markdown-body .pl-md{color:#ffdcd7;background-color:#67060c}.markdown-body .pl-mi1{color:#aff5b4;background-color:#033a16}.markdown-body .pl-mc{color:#ffdfb6;background-color:#5a1e02}.markdown-body .pl-mi2{color:#f0f6fc;background-color:#1158c7}.markdown-body .pl-mdr{font-weight:700;color:#d2a8ff}.markdown-body .pl-ba{color:#9198a1}.markdown-body .pl-sg{color:#3d444d}.markdown-body .pl-corl{text-decoration:underline;color:#a5d6ff}.markdown-body [role=button]:focus:not(:focus-visible),.markdown-body [role=tabpanel][tabindex="0"]:focus:not(:focus-visible),.markdown-body button:focus:not(:focus-visible),.markdown-body summary:focus:not(:focus-visible),.markdown-body a:focus:not(:focus-visible){outline:none;box-shadow:none}.markdown-body [tabindex="0"]:focus:not(:focus-visible),.markdown-body details-dialog:focus:not(:focus-visible){outline:none}.markdown-body g-emoji{display:inline-block;min-width:1ch;font-family:"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:1em;font-style:normal!important;font-weight:400;line-height:1;vertical-align:-.075em}.markdown-body g-emoji img{width:1em;height:1em}.markdown-body .task-list-item{list-style-type:none}.markdown-body .task-list-item label{font-weight:400}.markdown-body .task-list-item.enabled label{cursor:pointer}.markdown-body .task-list-item+.task-list-item{margin-top:.25rem}.markdown-body .task-list-item .handle{display:none}.markdown-body .task-list-item-checkbox{margin:0 .2em .25em -1.4em;vertical-align:middle}.markdown-body ul:dir(rtl) .task-list-item-checkbox{margin:0 -1.6em .25em .2em}.markdown-body ol:dir(rtl) .task-list-item-checkbox{margin:0 -1.6em .25em .2em}.markdown-body .contains-task-list:hover .task-list-item-convert-container,.markdown-body .contains-task-list:focus-within .task-list-item-convert-container{display:block;width:auto;height:24px;overflow:visible;clip:auto}.markdown-body ::-webkit-calendar-picker-indicator{filter:invert(50%)}.markdown-body .markdown-alert{padding:.5rem 1rem;margin-bottom:1rem;color:inherit;border-left:.25em solid #3d444d}.markdown-body .markdown-alert>:first-child{margin-top:0}.markdown-body .markdown-alert>:last-child{margin-bottom:0}.markdown-body .markdown-alert .markdown-alert-title{display:flex;font-weight:500;align-items:center;line-height:1}.markdown-body .markdown-alert.markdown-alert-note{border-left-color:#1f6feb}.markdown-body .markdown-alert.markdown-alert-note .markdown-alert-title{color:#4493f8}.markdown-body .markdown-alert.markdown-alert-important{border-left-color:#8957e5}.markdown-body .markdown-alert.markdown-alert-important .markdown-alert-title{color:#ab7df8}.markdown-body .markdown-alert.markdown-alert-warning{border-left-color:#9e6a03}.markdown-body .markdown-alert.markdown-alert-warning .markdown-alert-title{color:#d29922}.markdown-body .markdown-alert.markdown-alert-tip{border-left-color:#238636}.markdown-body .markdown-alert.markdown-alert-tip .markdown-alert-title{color:#3fb950}.markdown-body .markdown-alert.markdown-alert-caution{border-left-color:#da3633}.markdown-body .markdown-alert.markdown-alert-caution .markdown-alert-title{color:#f85149}.markdown-body>*:first-child>.heading-element:first-child{margin-top:0!important}`;

export default css;
