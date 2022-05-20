export function smoothScroll( id: string, offset: number = 0 ) {
    const element = document?.getElementById( id );
    if (!element) return;
    history?.replaceState( {}, "", `#${ id }` )
    const top = window?.scrollY + element.getBoundingClientRect().top - offset;
    window?.scrollTo( {
        behavior: 'smooth',
        top
    } );
    const focusableItems = [ 'a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', '[tabindex="0"]' ]; //a list of items that should be focusable.
    const focusable = element.querySelectorAll( focusableItems.join( ", " ) )?.[0] as HTMLElement | null
    focusable?.focus()
}
