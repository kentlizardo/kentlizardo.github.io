import { basic, initSidebar, initTopbar } from './modules/layouts';
import { initLocaleDatetime, loadImg, listenStuck } from './modules/components';

loadImg();
initLocaleDatetime();
initSidebar();
initTopbar();
basic();
listenStuck();
