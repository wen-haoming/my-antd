// @ts-nocheck
import { ApplyPluginsType } from '/Users/wenhaoming/Desktop/学习/datePicker/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"Hello datePicker!","meta":{}},{"title":"Date-picker","path":"/date-picker","meta":{},"children":[{"path":"/date-picker","title":"DatePicker","meta":{}}]}]}},"locales":[],"navs":{},"title":"datePicker","logo":"https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png","mode":"doc"},
      ...props,
    }),
    "routes": [
      {
        "path": "/date-picker",
        "component": require('../../DatePicker/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DatePicker/index.md",
          "updatedTime": 1596077937352,
          "slugs": [
            {
              "depth": 2,
              "value": "DatePicker",
              "heading": "datepicker"
            }
          ],
          "title": "DatePicker",
          "group": {
            "path": "/date-picker",
            "title": "Date-picker"
          }
        },
        "title": "DatePicker"
      },
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1595988497625,
          "slugs": [
            {
              "depth": 2,
              "value": "Hello datePicker!",
              "heading": "hello-datepicker"
            }
          ],
          "title": "Hello datePicker!"
        },
        "title": "Hello datePicker!"
      }
    ],
    "title": "datePicker"
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
