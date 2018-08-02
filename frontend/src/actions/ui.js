export const SHOW_TRASH = 'SHOW_TRASH';
export const HIDE_TRASH = 'HIDE_TRASH';

export function showTrash() {
  return {
    type: SHOW_TRASH,
  };
}

export function hideTrash() {
  return {
    type: HIDE_TRASH,
  };
}
