import React, { Dispatch, FC, useEffect, useReducer } from "react";
import { createContext, useContextSelector } from "use-context-selector";

type LayoutActionType = {
    type: "INIT" | "SET_MOBILE" | "OPEN_SIDEBAR" | "CLOSE_SIDEBAR" | "TOGGLE_SIDEBAR"
    args?: {
        isMobile?: boolean
    }
}

type ReducesType = {
    isMobile: boolean
    isSidebarOpen: boolean
}

type LayoutContextType = ReducesType & {
    toggleSidebar: () => void
    closeSidebar: () => void
    openSidebar: () => void
    dispatch?: Dispatch<LayoutActionType>
}


function layoutReducer( state: ReducesType, action: LayoutActionType ) {
    switch (action.type) {
        case "INIT":
            let defaultMobile = window.matchMedia( "(min-width: 85em)" ).matches;
            return {
                ...state,
                isMobile     : !defaultMobile,
                isSidebarOpen: defaultMobile,
            };
        case "SET_MOBILE":
            return {
                ...state,
                isMobile     : action.args?.isMobile ?? false,
                isSidebarOpen: !action.args?.isMobile,
            };
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen,
            };
        case "OPEN_SIDEBAR":
            return {
                ...state,
                isSidebarOpen: true,
            };
        case "CLOSE_SIDEBAR":
            if (state.isMobile) {
                return {
                    ...state,
                    isSidebarOpen: false,
                };
            } else {
                return state;
            }
        default:
            return state;
    }
}

export const LayoutContext = createContext<LayoutContextType>( {
    isMobile     : false,
    isSidebarOpen: false,
    toggleSidebar: () => {
    },
    closeSidebar : () => {
    },
    openSidebar  : () => {
    },
} );

export const LayoutContextProvider: FC<React.PropsWithChildren<unknown>> = ( { children } ) => {
    const [ state, dispatch ] = useReducer( layoutReducer, {
        isMobile     : false,
        isSidebarOpen: false,
    } );

    useEffect( () => {
        dispatch( { type: "INIT" } );
    }, [] );

    useEffect( () => {
        function toggleIsMobile( e: MediaQueryListEvent ) {
            dispatch( { type: "SET_MOBILE", args: { isMobile: !e.matches } } );
        }

        window.matchMedia( "(min-width: 85em)" ).addEventListener( "change", toggleIsMobile );
        return () => {
            window.matchMedia( "(min-width: 85em)" ).removeEventListener( "change", toggleIsMobile );
        };
    }, [ state.isMobile ] );

    return (
        <LayoutContext.Provider value={ {
            isMobile     : state.isMobile,
            isSidebarOpen: state.isSidebarOpen,
            toggleSidebar: () => dispatch( { type: "TOGGLE_SIDEBAR" } ),
            openSidebar  : () => dispatch( { type: "OPEN_SIDEBAR" } ),
            closeSidebar : () => dispatch( { type: "CLOSE_SIDEBAR" } ),
        } }>
            { children }
        </LayoutContext.Provider>
    );
};

export const useIsMobile = () => useContextSelector( LayoutContext, ( s ) => s.isMobile );
export const useIsSidebarOpen = () => useContextSelector( LayoutContext, ( s ) => s.isSidebarOpen );
export const useToggleSidebar = () => useContextSelector( LayoutContext, ( s ) => s.toggleSidebar );
export const useOpenSidebar = () => useContextSelector( LayoutContext, ( s ) => s.openSidebar );
export const useCloseSidebar = () => useContextSelector( LayoutContext, ( s ) => s.closeSidebar );
