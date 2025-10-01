import {create} from 'zustand'


interface NetI {
    ready:boolean;
    isready:() => void ;
}


export const useNetworkStore = create<NetI>((set) => ({
    ready:false,
    isready:() =>  set({ready:true})
}));