export function smoothScroll( id: string, offset: number = 76 ) {
    const element = document.getElementById( id );
    if (!element) {
        return
    }
    history.replaceState( {}, "", `#${ id }` )
    const top = window.scrollY + element.getBoundingClientRect().top - offset;
    window.scrollTo( {
        behavior: 'smooth',
        top
    } );
    element.focus()
}
