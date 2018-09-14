export const SHOW_TRASH = 'SHOW_TRASH';
export const HIDE_TRASH = 'HIDE_TRASH';
export const TOGGLE_REQUIREMENTS_SIDEBAR = 'TOGGLE_REQUIREMENTS_SIDEBAR';
export const MOUSE_ENTER_COURSE = 'MOUSE_ENTER_COURSE';
export const MOUSE_LEAVE_COURSE = 'MOUSE_LEAVE_COURSE';

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

export function toggleRequirementsSidebar() {
  return {
    type: TOGGLE_REQUIREMENTS_SIDEBAR,
  };
}

export function mouseEnterCourse(courseId) {
  return {
    type: MOUSE_ENTER_COURSE,
    courseId,
  };
}
export function mouseLeaveCourse(courseId) {
  return {
    type: MOUSE_LEAVE_COURSE,
    courseId,
  };
}
