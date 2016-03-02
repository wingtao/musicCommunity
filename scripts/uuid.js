var __id = 0;

$.uuid = function(){
    __id ++;
    return "__id_" + __id;
};
