import { create } from 'zustand'
import { useRouter } from "next/navigation"; 

// INICIALIZAR EL TYPO DEL ESTADO
interface State{
    pageStack: string[],
    currentPage: string,
    goToPage: (page: string) => void,
    backToPage: () => void,
}

// CREAR EL ESTADO
export const usePageStackStore = create<State>((set, get)=>{
    return {
        pageStack: [],
        currentPage: "",
        goToPage: (page: string) =>{
            const {pageStack, currentPage} = get()

            const newPageStack = [...pageStack, currentPage]
            console.log("New page stack: " + newPageStack);
            console.log("Going to: " + page);

            set({pageStack: newPageStack, currentPage: page})
        },
        backToPage: () => {
            const {pageStack} = get()
            const router = useRouter()

            const newPageStack = [... pageStack]
            const nextPage = newPageStack.pop() || "" // Fallback to "home"

            console.log("New page stack: " + newPageStack);
            console.log("Going to: " + nextPage);

            set({pageStack: [...newPageStack], currentPage: nextPage})
            router.push(nextPage);
        },
    }
})