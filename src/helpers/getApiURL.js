URLSearchParams.prototype.filterParams = function(){
    this.forEach((value, key) => {
        if(!value){
            this.delete(key);
        }
    });
}

export default function getApiURL(endpoint, queryParams = {}){
    const url = new URL(`${import.meta.env.VITE_API_URL}/${endpoint}`);
    const searchParams = new URLSearchParams(queryParams);
    searchParams.filterParams();
    url.search = searchParams;
    return url.toString();
}