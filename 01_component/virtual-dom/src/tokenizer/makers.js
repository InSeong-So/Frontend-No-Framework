const makeMap = str => {
  return str.split(',').reduce((map, cur) => ({ ...map, [cur]: true }), {});
};

export const EMPTY_MAKER = makeMap(
  'area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr',
);

export const FILLATTRS_MAKER = makeMap(
  'checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected',
);

export const isEmptyMaker = tag => !!EMPTY_MAKER[tag];

export const isFillattrsMaker = attr => !!FILLATTRS_MAKER[attr];
