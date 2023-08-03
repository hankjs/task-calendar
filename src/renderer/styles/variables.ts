// prettier-ignore
export const RootCssVar = {
    Base: {
        "--base-gap": "--base-gap",
        "--base-gap-large": "--base-gap-large",
    },

    Animation: {
        "--transition-snappy": "--transition-snappy",
    },

    Calendar: {
        "--milestone_title-grid": "--milestone_title-grid",
        "--milestone_title-justify-content": "--milestone_title-justify-content",
        "--milestone_title-align-items": "--milestone_title-align-items",

        "--task_title-grid": "--task_title-grid",
        "--task_title-justify-content": "--task_title-justify-content",
        "--task_title-align-items": "--task_title-align-items",

        "--allday_title-grid": "--allday_title-grid",
        "--allday_title-justify-content": "--allday_title-justify-content",
        "--allday_title-align-items": "--allday_title-align-items",

        "--event-time-width": "--event-time-width",
    },

    Headers: {
        "--header-padding-block": "--header-padding-block",
        "--header-padding-inline": "--header-padding-inline",
        "--header-grid-template": "--header-grid-template",
        "--header-grid-template-areas": "--header-grid-template-areas",
        "--header-actions-justify-content": "--header-actions-justify-content",
    },

    PageMain: {
        "--page-main-menu-width": "--page-main-menu-width",
        "--page-main-grid-template": "--page-main-grid-template",
        "--page-main-grid-template-areas": "--page-main-grid-template-areas",
        "--page-main-header-height": "--page-main-header-height",
        "--page-main-footer-height": "--page-main-footer-height",

        "--page-main-menu-width--is-collapsed": "--page-main-menu-width--is-collapsed",
        "--page-main-grid-template--is-collapsed": "--page-main-grid-template--is-collapsed",
        "--page-main-grid-template-areas--is-collapsed": "--page-main-grid-template-areas--is-collapsed",
    },

    Drawer: {
        "--drawer-width": "--drawer-width",
        "--drawer-width-complex": "--drawer-width-complex",
    }
};

export const allCssVar = [
    ...Object.keys(RootCssVar.Animation),
    ...Object.keys(RootCssVar.Calendar),
    ...Object.keys(RootCssVar.Headers),
    ...Object.keys(RootCssVar.PageMain),
    ...Object.keys(RootCssVar.Drawer),
];
