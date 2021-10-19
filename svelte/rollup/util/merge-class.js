export default function(arr, separator){
    const rs = [];
    for(var item of arr) {
        if(item && item.length > 0) rs.push(item);
    }
    if (rs.length) {
        return rs.join(separator || ' ');
    }
    return undefined;
    
}