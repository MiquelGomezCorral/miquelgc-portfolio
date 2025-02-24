import { create } from 'zustand'

// INICIALIZAR EL TYPO DEL ESTADO
interface State{
    pageStack: string[],
    currentPage: string,
    goToPageFrom: (fromPage: string, ToPage: string) => void,
    backToPage: () => string,
}

// CREAR EL ESTADO
export const usePageStackStore = create<State>((set, get)=>{
    return {
        pageStack: [],
        currentPage: "/",
        goToPageFrom: (fromPage: string, ToPage: string) =>{
            const {pageStack} = get()

            const newPageStack = [...pageStack, fromPage]
            console.log("New page stack: " + newPageStack);
            console.log("Coming from: " + fromPage);
            console.log("Current: " + ToPage);

            set({pageStack: newPageStack, currentPage: ToPage})
        },
        backToPage: () => {
            const {pageStack} = get()

            const newPageStack = [... pageStack]
            const followingPage = newPageStack.pop() || "/" // Fallback to "home"

            console.log("New page stack: " + newPageStack);
            console.log("Going to: " + followingPage);
            console.log("Current: " + followingPage);


            set({pageStack: [...newPageStack], currentPage: followingPage})

            return followingPage
        },
    }
})