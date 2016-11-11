import memberAction from './utils/member-action';
import queryAction from './utils/query-action';
import collectionAction from './utils/collection-action';

export const classOp = collectionAction;
export const instanceOp = memberAction;

export { collectionAction, memberAction, queryAction };
