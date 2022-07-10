export class CacheMap<K,V> extends Map<K,V>{
    trim(cap:number, f_keep:(e:K)=>boolean, f_rem: (e:V) => void) {
        if(this.size > cap)
            for (const [k, v] of this.entries())
                if (!f_keep(k)) {
                    this.delete(k);
                    f_rem(v);
                }
    }

    getOrSet(k:K, f:()=>V): V {
        if(this.has(k)){
            return this.get(k);
        }else{
            const v = f();
            this.set(k,v);
            return v;
        }
    }
}