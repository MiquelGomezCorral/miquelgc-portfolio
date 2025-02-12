import { create } from 'zustand'

// INICIALIZAR EL TYPO DEL ESTADO
interface State{
    pageStack: string[],
    currentPage: string,
    goToPageFrom: (page: string) => void,
    backToPage: () => string,
}

// CREAR EL ESTADO
export const usePageStackStore = create<State>((set, get)=>{
    return {
        pageStack: [],
        currentPage: "/",
        goToPageFrom: (page: string) =>{
            const {pageStack} = get()

            const newPageStack = [...pageStack, page]
            console.log("New page stack: " + newPageStack);
            console.log("Coming from: " + page);

            set({pageStack: newPageStack, currentPage: page})
        },
        backToPage: () => {
            const {pageStack} = get()

            const newPageStack = [... pageStack]
            const nextPage = newPageStack.pop() || "/" // Fallback to "home"

            console.log("New page stack: " + newPageStack);
            console.log("Going to: " + nextPage);

            set({pageStack: [...newPageStack], currentPage: nextPage})

            return nextPage
        },
    }
})