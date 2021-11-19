export const DRAFT_STATE =
  typeof Symbol !== 'undefined' ? Symbol.for('immer-state') : '__$immer_state';

export const DRAFTABLE =
  typeof Symbol !== 'undefined'
    ? Symbol.for('immer-draftable')
    : '__$immer_draftable';
