import memberAction from './utils/member-action';
import hasManyAction from './utils/has-many-action';
import collectionAction from './utils/collection-action';

export const classOp = collectionAction;
export const instanceOp = memberAction;

export { collectionAction, memberAction, hasManyAction };
