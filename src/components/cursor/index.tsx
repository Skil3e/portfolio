import React, { FC, useEffect } from "react";
import { useMotionValue, motion, useSpring } from "framer-motion";

type TypeCursor = {
    cursorSize?: number
}

const Cursor: FC<TypeCursor> = ( { cursorSize = 36 } ) => {
    const cursorOffset = cursorSize / 2;
    const cursorX = useMotionValue( -100 )
    const cursorY = useMotionValue( -100 )

    const springConfig = { damping: 38, stiffness: 700 };
    const cursorXSpring = useSpring( cursorX, springConfig );
    const cursorYSpring = useSpring( cursorY, springConfig );

    useEffect( () => {
        const moveCursor = ( e: MouseEvent ) => {
            cursorX.set( e.clientX - cursorOffset )
            cursorY.set( e.clientY - cursorOffset )
        }

        window.addEventListener( 'mousemove', moveCursor )
        return () => {
            window.removeEventListener( 'mousemove', moveCursor )
        }

    }, [] )

    return (
        <motion.div
            className={ "cursor" }
            style={ {
                width     : cursorSize,
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            } }
        />
    )
}

export default Cursor
