// import "@primer/css/primitives/temp-typography-tokens.scss";
// import "@primer/css/primitives/index.scss";
// // import "@primer/css/core/index.scss";



// import "@primer/css/color-modes/index.scss";
// import "@primer/css/primitives/index.scss";
// import "@primer/css/core/index.scss";
// import "@primer/css/product/index.scss";
// import "@primer/css/marketing/index.scss";

// import '@primer/css/index.scss';
"use client";
import { EyeIcon, GitBranchIcon, GlobeIcon, LawIcon, LinkIcon, MarkGithubIcon, PulseIcon, RepoForkedIcon, StarIcon, TagIcon } from "@primer/octicons-react";
// import { useEffect, useState } from "react";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { cn } from "@/lib/utils";

const githubBaseURL: string = "https://github.com/";

const font = {
   primaryColor: "#f0f6fc",
   secondaryColor: "#9198a1"
};

const svg = {
   link:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-link flex-shrink-0 mr-2"
         fill={font.secondaryColor}
      >
         <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z" />
      </svg>,
   license:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-law mr-2"
         fill={font.secondaryColor}
      >
         <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z" />
      </svg>,
   star:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-star mr-1"
         fill={font.secondaryColor}
      >
         <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
      </svg>,
   fork:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-repo-forked mr-1"
         fill={font.secondaryColor}
      >
         <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
      </svg>,
   watching:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-eye mr-1"
         fill={font.secondaryColor}
      >
         <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
      </svg>,
   branch:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-git-branch mr-1"
         fill={font.secondaryColor}
      >
         <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
      </svg>,
   tags:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-tag mr-1"
         fill={font.secondaryColor}
      >
         <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>,
   activity:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-pulse mr-1"
         fill={font.secondaryColor}
      >
         <path d="M6 2c.306 0 .582.187.696.471L10 10.731l1.304-3.26A.751.751 0 0 1 12 7h3.25a.75.75 0 0 1 0 1.5h-2.742l-1.812 4.528a.751.751 0 0 1-1.392 0L6 4.77 4.696 8.03A.75.75 0 0 1 4 8.5H.75a.75.75 0 0 1 0-1.5h2.742l1.812-4.529A.751.751 0 0 1 6 2Z" />
      </svg>,
   globe:
      <svg
         aria-hidden="true"
         height={16}
         viewBox="0 0 16 16"
         version="1.1"
         width={16}
         data-view-component="true"
         className="octicon octicon-globe flex-shrink-0 mr-2"
         fill={font.secondaryColor}
      >
         <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 8.75a9.64 9.64 0 0 0 1.363 4.177c.255.426.542.832.857 1.215.245-.296.551-.705.857-1.215A9.64 9.64 0 0 0 10.22 8.75Zm4.44-1.5a9.64 9.64 0 0 0-1.363-4.177c-.307-.51-.612-.919-.857-1.215a9.927 9.927 0 0 0-.857 1.215A9.64 9.64 0 0 0 5.78 7.25Zm-5.944 1.5H1.543a6.507 6.507 0 0 0 4.666 5.5c-.123-.181-.24-.365-.352-.552-.715-1.192-1.437-2.874-1.581-4.948Zm-2.733-1.5h2.733c.144-2.074.866-3.756 1.58-4.948.12-.197.237-.381.353-.552a6.507 6.507 0 0 0-4.666 5.5Zm10.181 1.5c-.144 2.074-.866 3.756-1.58 4.948-.12.197-.237.381-.353.552a6.507 6.507 0 0 0 4.666-5.5Zm2.733-1.5a6.507 6.507 0 0 0-4.666-5.5c.123.181.24.365.353.552.714 1.192 1.436 2.874 1.58 4.948Z" />
      </svg>
};


// const Github = () => (
//    <div className="d-block d-md-none mb-2 px-3 px-md-4 px-lg-5"
//    // style={{ backgroundColor: "#0d1117", color: "#757c84" }}
//    >
//       <div className="d-flex gap-2 mt-n3 mb-3 flex-wrap">
//          <div className="d-flex flex-row gap-2">
//             <link
//                crossOrigin="anonymous"
//                media="all"
//                rel="stylesheet"
//                href="https://github.githubassets.com/assets/primer-react.7558f0254d56b9bec77f.module.css"
//             />
//             <link
//                crossOrigin="anonymous"
//                media="all"
//                rel="stylesheet"
//                href="https://github.githubassets.com/assets/notifications-subscriptions-menu.1bcff9205c241e99cff2.module.css"
//             />
//             <div data-target="react-partial.reactRoot">
//                <div className="d-md-none">
//                   <button
//                      type="button"
//                      data-testid="notifications-subscriptions-menu-button-desktop"
//                      aria-label="Unwatch: All Activity in sabeerbikba/dev.tools"
//                      aria-haspopup="true"
//                      aria-expanded="false"
//                      tabIndex={0}
//                      className="types__StyledButton-sc-ws60qy-0 cDbgyb NotificationsSubscriptionsMenu-module__watchButton--ifxlS"
//                      data-loading="false"
//                      data-size="medium"
//                      aria-describedby=":r1:-loading-announcement"
//                      id=":r1:"
//                   >
//                      <span
//                         data-component="buttonContent"
//                         className="Box-sc-g0xbh4-0 gUkoLg"
//                      >
//                         <span
//                            data-component="leadingVisual"
//                            className="Box-sc-g0xbh4-0 hzSPyu"
//                         >
//                            <svg
//                               aria-hidden="true"
//                               focusable="false"
//                               className="octicon octicon-eye"
//                               viewBox="0 0 16 16"
//                               width={16}
//                               height={16}
//                               fill="currentColor"
//                               style={{
//                                  display: "inline-block",
//                                  userSelect: "none",
//                                  verticalAlign: "text-bottom",
//                                  overflow: "visible"
//                               }}
//                            >
//                               <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
//                            </svg>
//                         </span>
//                         <span data-component="text" />
//                      </span>
//                   </button>
//                </div>
//                <div className="d-none d-md-block">
//                   <button
//                      type="button"
//                      data-testid="notifications-subscriptions-menu-button-mobile"
//                      aria-label="Unwatch: All Activity in sabeerbikba/dev.tools"
//                      aria-haspopup="true"
//                      aria-expanded="false"
//                      tabIndex={0}
//                      className="types__StyledButton-sc-ws60qy-0 drIBIt"
//                      data-loading="false"
//                      data-size="small"
//                      aria-describedby=":r4:-loading-announcement"
//                      id=":r4:"
//                   >
//                      <span
//                         data-component="buttonContent"
//                         className="Box-sc-g0xbh4-0 gUkoLg"
//                      >
//                         <span
//                            data-component="leadingVisual"
//                            className="Box-sc-g0xbh4-0 hzSPyu"
//                         >
//                            <svg
//                               aria-hidden="true"
//                               focusable="false"
//                               className="octicon octicon-eye"
//                               viewBox="0 0 16 16"
//                               width={16}
//                               height={16}
//                               fill="currentColor"
//                               style={{
//                                  display: "inline-block",
//                                  userSelect: "none",
//                                  verticalAlign: "text-bottom",
//                                  overflow: "visible"
//                               }}
//                            >
//                               <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
//                            </svg>
//                         </span>
//                         <span data-component="text">
//                            Unwatch
//                            <span className="ml-2 Counter rounded-3 NotificationsSubscriptionsMenu-module__watchCounter--nAbhU">
//                               2
//                            </span>
//                         </span>
//                      </span>
//                      <span
//                         data-component="trailingAction"
//                         className="Box-sc-g0xbh4-0 hzSPyu"
//                      >
//                         <svg
//                            aria-hidden="true"
//                            focusable="false"
//                            className="octicon octicon-triangle-down"
//                            viewBox="0 0 16 16"
//                            width={16}
//                            height={16}
//                            fill="currentColor"
//                            style={{
//                               display: "inline-block",
//                               userSelect: "none",
//                               verticalAlign: "text-bottom",
//                               overflow: "visible"
//                            }}
//                         >
//                            <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z" />
//                         </svg>
//                      </span>
//                   </button>
//                </div>
//             </div>
//             <div data-view-component="true" className="BtnGroup d-flex">
//                <a
//                   id="fork-icon-button"
//                   href="/sabeerbikba/dev.tools/fork"
//                   data-hydro-click='{"event_type":"repository.click","payload":{"target":"FORK_BUTTON","repository_id":750439019,"originating_url":"https://github.com/sabeerbikba/dev.tools","user_id":59386700}}'
//                   data-hydro-click-hmac="0bf4766518687be3e0410054131e0b50701b9ef32a347647e1eab6de8a1fdae3"
//                   data-ga-click="Repository, show fork modal, action:files#disambiguate; text:Fork"
//                   aria-labelledby="tooltip-d46fc7fa-ef96-48f0-8eef-1a62f3af348b"
//                   data-view-component="true"
//                   className="Button Button--iconOnly Button--secondary Button--medium"
//                >
//                   {" "}
//                   <svg
//                      aria-hidden="true"
//                      height={16}
//                      viewBox="0 0 16 16"
//                      version="1.1"
//                      width={16}
//                      data-view-component="true"
//                      className="octicon octicon-repo-forked Button-visual"
//                   >
//                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
//                   </svg>
//                </a>
//             </div>
//             <div
//                data-view-component="true"
//                className="js-toggler-container starring-container on"
//             >
//                <form
//                   className="starred js-social-form"
//                   data-turbo="false"
//                   action="/sabeerbikba/dev.tools/unstar"
//                   acceptCharset="UTF-8"
//                   method="post"
//                >
//                   <input
//                      type="hidden"
//                      name="authenticity_token"
//                      defaultValue="pOl77Hf2hmuS1HQaBDgztvb36HmWUO52o0uN2h5-eweEbTOrQKkHYHmLTKP4FzwZn-9qgII2bJ9omKBgQOmvXg"
//                      autoComplete="off"
//                   />
//                   <input type="hidden" name="context" defaultValue="repository" />
//                   <button
//                      data-hydro-click='{"event_type":"repository.click","payload":{"target":"UNSTAR_BUTTON","repository_id":750439019,"originating_url":"https://github.com/sabeerbikba/dev.tools","user_id":59386700}}'
//                      data-hydro-click-hmac="940bc79bb8d17cb2bfab6c11a757420f55aa13ad4ec958d800b1466f9739b3d8"
//                      data-ga-click="Repository, click unstar button, action:files#disambiguate; text:Unstar"
//                      id="icon-button-8489e11b-7052-44a1-9fd1-431b0828d48c"
//                      aria-labelledby="tooltip-aa9b0b2a-6197-4c2e-8495-675918ca8c99"
//                      type="submit"
//                      data-view-component="true"
//                      className="Button Button--iconOnly Button--secondary Button--medium js-toggler-target starred-button-icon"
//                   >
//                      {" "}
//                      <svg
//                         aria-hidden="true"
//                         height={16}
//                         viewBox="0 0 16 16"
//                         version="1.1"
//                         width={16}
//                         data-view-component="true"
//                         className="octicon octicon-star-fill Button-visual"
//                      >
//                         <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
//                      </svg>
//                   </button>
//                </form>
//                <form
//                   className="unstarred js-social-form"
//                   data-turbo="false"
//                   action="/sabeerbikba/dev.tools/star"
//                   acceptCharset="UTF-8"
//                   method="post"
//                >
//                   <input
//                      type="hidden"
//                      name="authenticity_token"
//                      defaultValue="puZtWr6Tv7M5tULOwF6MDAoqMEY8oHTcWOPyOIZZzVUWTjjLGMTDUoC07i93kGlKesmVG5BuiFnJwwrDaZ0qFQ"
//                      autoComplete="off"
//                   />
//                   <input type="hidden" name="context" defaultValue="repository" />
//                   <button
//                      data-hydro-click='{"event_type":"repository.click","payload":{"target":"STAR_BUTTON","repository_id":750439019,"originating_url":"https://github.com/sabeerbikba/dev.tools","user_id":59386700}}'
//                      data-hydro-click-hmac="92bd324cbf51df682b508a475272b996aaf46a923e068e6bb9789fbcbd27685a"
//                      data-ga-click="Repository, click star button, action:files#disambiguate; text:Star"
//                      id="icon-button-1efed794-cf53-44cb-91ef-d46163eaed88"
//                      aria-labelledby="tooltip-050214af-6499-4eaa-bfc8-eec023220ea5"
//                      type="submit"
//                      data-view-component="true"
//                      className="Button Button--iconOnly Button--secondary Button--medium js-toggler-target"
//                   >
//                      {" "}
//                      <svg
//                         aria-hidden="true"
//                         height={16}
//                         viewBox="0 0 16 16"
//                         version="1.1"
//                         width={16}
//                         data-view-component="true"
//                         className="octicon octicon-star Button-visual"
//                      >
//                         <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
//                      </svg>
//                   </button>
//                </form>
//             </div>
//          </div>
//          <div className="d-flex flex-row gap-2"></div>
//       </div>
//       <p className="f4 mb-3 color-fg-muted">
//          A collection of useful developer tools built with React.
//       </p>
//       <div className="mb-2 d-flex flex-items-center Link--secondary">
//          {/* link : svg */}
//          <span className="flex-auto min-width-0 css-truncate css-truncate-target width-fit">
//             <a
//                title="https://devtools-sabeerbikba.vercel.app/"
//                role="link"
//                target="_blank"
//                className="text-bold"
//                rel="noopener noreferrer"
//                href="https://devtools-sabeerbikba.vercel.app/"
//             >
//                devtools-sabeerbikba.vercel.app/
//             </a>
//          </span>
//       </div>
//       <h3 className="sr-only">License</h3>
//       <div className="mb-2">
//          <a
//             href="/sabeerbikba/dev.tools/blob/main/LICENSE"
//             className="Link--muted"
//             data-analytics-event='{"category":"Repository Overview","action":"click","label":"location:sidebar;file:license"}'
//          >
//             {/* svg : license */}
//             MIT license
//          </a>
//       </div>
//       <div className="mb-3">
//          <ul className="d-flex flex-wrap mb-2 gap-2" aria-label="Repository details">
//             <a
//                className="Link--secondary no-underline d-block mr-2"
//                role="listitem"
//                href="/sabeerbikba/dev.tools/stargazers"
//             >
//                {/* svg : stars */}
//                <span className="text-bold color-fg-default">32</span>
//                stars
//             </a>{" "}
//             <a
//                className="Link--secondary no-underline d-block mr-2"
//                role="listitem"
//                href="/sabeerbikba/dev.tools/forks"
//             >
//                {/* svg : forks */}
//                <span className="text-bold color-fg-default">5</span>
//                forks
//             </a>{" "}
//             <a
//                className="Link--secondary no-underline d-block mr-2"
//                role="listitem"
//                href="/sabeerbikba/dev.tools/watchers"
//             >
//                {/* svg : watching */}
//                <span className="text-bold color-fg-default">2</span>
//                watching
//             </a>{" "}
//             <a
//                className="Link--secondary no-underline d-block mr-2"
//                role="listitem"
//                href="/sabeerbikba/dev.tools/branches"
//             >
//                {/* svg : branch */}
//                <strong className="color-fg-default">1</strong>
//                <span className="color-fg-muted">Branch</span>
//             </a>
//             <a
//                className="Link--secondary no-underline d-block mr-2"
//                role="listitem"
//                href="/sabeerbikba/dev.tools/tags"
//             >
//                {/* svg : tags */}
//                <strong className="color-fg-default">0</strong>
//                <span className="color-fg-muted">Tags</span>
//             </a>
//             <a
//                className="Link--secondary no-underline d-block mr-2"
//                role="listitem"
//                href="/sabeerbikba/dev.tools/activity"
//             >
//                {/* svg : activity */}
//                <span>Activity</span>
//             </a>
//          </ul>
//          <div className="mb-2 d-flex color-fg-muted">
//             <div className="d-flex flex-items-center" style={{ height: 21 }}>
//                {/* svg : public repository */}
//             </div>
//             <span className="flex-auto min-width-0 width-fit">Public repository</span>
//          </div>
//       </div>
//    </div>
// );



const Github = ({
   repo = 'sabeerbikba/dev.tools', // need to remove
   description = " A collection of useful developer tools built with React. ", // need to remove
   website = "htt://devtools-sabeerbikba.vercel.app/",// tmp : need to remove
}: {
   repo: string,
   description: string | null,
   website: string,
}) => {
   const [previewTab, setPreviewTab] = // need to move
      useLocalStorageState<'about' | 'license'>(`home:projects:githubcard:${repo}`, 'about');

   const [userName, repositoryName] = repo.split("/");

   return (
      <div className={`bg-[#0d1117] p-4 rounded-lg`} style={{ color: font.secondaryColor }}>
         <h2 className="space-y-4 text-2xl font-extrabold ml-1" style={{ color: font.primaryColor }}>
            <a href={githubBaseURL + repo} className=" hover:underline">
               <MarkGithubIcon size={32} className="mr-2" />
               <span className="text-xl" style={{ color: font.secondaryColor }}>{userName}/</span>
               {repositoryName}
            </a>
         </h2>
         <div className="space-y-4">
            {description != null && (
               <p className="text-base font-normal">
                  {/* A collection of useful developer tools built with React. */}
                  {description}
               </p>
            )}

            {website !== "" && (
               <a
                  href={website}
                  className="text-[#58a6ff] hover:underline inline-flex items-center gap-2"
               >
                  <LinkIcon className="fill-current" />
                  {/* devtools-sabeerbikba.vercel.app/ */}
                  {/* {website.replace(/^https?:\/\//, '')} */}
                  {website.split("://")[1]}
                  {/* {website} */}
               </a>
            )}


            {/* <h3 className="sr-only">License</h3> */}
            <button className="flex items-center gap-2 hover:text-blue-400">
               <LawIcon className="fill-current" />
               <span className="text-sm">MIT license</span>
            </button>

            <ul className="flex flex-wrap items-center gap-5 text-sm">
               {[
                  {
                     href: `/${repo}/stargazers`,
                     icon: <StarIcon className="fill-current" />,
                     count: 32, //
                     what: "stars"
                  },
                  {
                     href: `/${repo}/forks`,
                     icon: <RepoForkedIcon className="fill-current" />,
                     count: 4, //
                     what: "forks"
                  },
                  {
                     href: `/${repo}/watchers`,
                     icon: <EyeIcon className="fill-current" />,
                     count: 1, //
                     what: "watching",
                  },
                  {
                     href: `/${repo}/branches`,
                     icon: <GitBranchIcon className="fill-current" />,
                     count: 1, // by default: 1
                     what: "Branch",
                  },
                  { // not needed i think 
                     href: `/${repo}/tags`,
                     icon: <TagIcon className="fill-current" />,
                     count: 0, //
                     what: "Tags",
                  },
                  {
                     href: `/${repo}/activity`,
                     icon: <PulseIcon className="fill-current" />,
                     count: null,
                     what: "Activity",
                  }
               ].map(link => {
                  const { href, icon, count, what } = link;
                  return (
                     <a
                        href={githubBaseURL + href}
                        key={what}
                        target="_blank"
                        role="listitem"
                        className="inline-flex items-center gap-2 text-current hover:text-blue-400" // Apply hover color here
                     >
                        {icon}
                        {count != null && (
                           <span className="font-semibold">{count}</span> // No inline color styling here
                        )}
                        <span>{what}</span>
                     </a>
                  );
               })}

               {/* <a className="inline-flex items-center gap-2 hover:text-blue-400">
               <StarIcon fill={font.secondaryColor} />
               <span className="font-semibold">31</span>
               <span>stars</span>
            </a>

            <a className="inline-flex items-center gap-1 hover:text-blue-400">
               <RepoForkedIcon fill={font.secondaryColor} />
               <span className="font-semibold">5</span>
               <span>forks</span>
            </a>
                
            <a className="inline-flex items-center gap-1 hover:text-blue-400">
               <EyeIcon fill={font.secondaryColor} />
               <span className="font-semibold">2</span>
               <span>watching</span>
            </a>

            <a className="inline-flex items-center gap-1">
               <GitBranchIcon fill={font.secondaryColor} />
               <span className="font-semibold">1</span>
               <span>Branch</span>
            </a>

            <a className="inline-flex items-center gap-1">
               <TagIcon fill={font.secondaryColor} />
               <span className="font-semibold">0</span>
               <span>Tags</span>
            </a>

            <a className="inline-flex items-center gap-1 hover:text-blue-400">
               <PulseIcon fill={font.secondaryColor} />
               <span>Activity</span>
            </a> */}
            </ul>


            <div className="inline-flex items-center gap-1 text-sm">
               <GlobeIcon fill={font.secondaryColor} />
               <span>Public repository</span>
            </div>
         </div>
      </div>
   );
}

export default Github;