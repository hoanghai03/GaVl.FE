import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 8,
    label: 'MENUITEMS.APPS.TEXT',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 10,
        label: 'MENUITEMS.APPS.LIST.CHAT',
        link: '/chat',
        parentId: 8
      }
    ]
  }

];
