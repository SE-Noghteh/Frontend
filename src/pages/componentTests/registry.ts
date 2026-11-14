/**
 * Registry of everything shown on the components test page (route: /components-test).
 *
 * To test a new component:
 *   1. create `src/pages/componentTests/<Name>Demo.tsx` with a default-exported demo component;
 *   2. add one entry below.
 * It then appears as a tab on the test page and can be opened directly with `?c=<key>`.
 */

import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export interface ComponentTest {
  key: string;
  title: string;
  component: LazyExoticComponent<ComponentType>;
}

export const COMPONENT_TESTS: ComponentTest[] = [
  { key: "sidebar", title: "سایدبار", component: lazy(() => import("./SidebarDemo")) },
];
