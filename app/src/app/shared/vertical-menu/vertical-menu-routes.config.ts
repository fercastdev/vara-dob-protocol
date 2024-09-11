import { RouteInfo } from './vertical-menu.metadata';


// let params: UserUrlComponent = new UserUrlComponent();

// let url: string = 'https://datastudio.google.com/u/0/reporting/ae2b6fd5-f90f-43a6-aaef-69bec7d3be22/page/BT5RC?params='+params;

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {path: '/home', title: 'Dashboard', icon: '../../../assets/img/menu-icons/dashboard.svg', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  {path: '/my-pools', title: 'My pools', icon: '../../../assets/img/menu-icons/users.svg', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  {path: '/explore-pools', title: 'Explore pools', icon: '../../../assets/img/menu-icons/global.svg', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

];
