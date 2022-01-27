import { DIVIDE_CHARGING } from '../constants/index.js';

export const mergeObject = (target, source) => ({ ...target, ...source });

/**
 * 내림 값을 반환합니다.
 *
 * @param {number} value
 * @returns
 */
export const roundDown = value => Math.floor(value / +DIVIDE_CHARGING) * +DIVIDE_CHARGING;
