/**
 * Centralized asset exports for the Torra Click & Retire system
 * This file provides a single point of import for all assets
 */

// Brand Icons & Logos
export { default as torraLogo } from './icons/brand/torra-logo.svg';
export { default as clickRetireLogo } from './icons/brand/click-retire-logo.svg';
export { default as torraLogoSquare } from './icons/brand/torra-logo-square.png';
export { default as svelteLogo } from './icons/brand/svelte.svg';

// UI Icons
export { default as iconUser } from './icons/ui/user.svg';
export { default as iconLogin } from './icons/ui/login.svg';
export { default as iconHome } from './icons/ui/home.svg';
export { default as iconAlert } from './icons/ui/alert.svg';
export { default as iconCheckOutline } from './icons/ui/check-outline.svg';
export { default as iconCheckSolid } from './icons/ui/check-solid.svg';
export { default as iconStore } from './icons/ui/store.svg';
export { default as iconLockers } from './icons/ui/lockers.svg';
export { default as iconLockersAlt } from './icons/ui/lockers-alt.svg';
export { default as iconTruck } from './icons/ui/truck.svg';
export { default as iconAvatar } from './icons/ui/avatar.svg';
export { default as iconGift } from './icons/ui/gift.svg';
export { default as iconSyncStatus } from './icons/ui/sync-status.svg';
export { default as iconNotOk } from './icons/ui/not-ok.svg';
export { default as iconDoNotDisturb } from './icons/ui/do-not-disturb.svg';

// Background Images
export { default as backgroundBorderShadow } from './images/backgrounds/background-border-shadow.png';

// Icon collections for easy access
export const brandIcons = {
  torraLogo,
  clickRetireLogo,
  torraLogoSquare,
  svelteLogo
};

export const uiIcons = {
  user: iconUser,
  login: iconLogin,
  home: iconHome,
  alert: iconAlert,
  checkOutline: iconCheckOutline,
  checkSolid: iconCheckSolid,
  store: iconStore,
  lockers: iconLockers,
  lockersAlt: iconLockersAlt,
  truck: iconTruck,
  avatar: iconAvatar,
  gift: iconGift,
  syncStatus: iconSyncStatus,
  notOk: iconNotOk,
  doNotDisturb: iconDoNotDisturb
};

export const backgrounds = {
  borderShadow: backgroundBorderShadow
};