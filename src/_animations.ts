const transition = {
    duration: .4,
    ease    : "easeInOut"
}

export const fade = {
    hidden: {
        opacity: 0,
    },
    show  : {
        opacity: 1,
        transition
    },
    inView: {}
}

export const fadeUp = {
    hidden: {
        opacity: 0,
        y      : 30
    },
    show  : {
        opacity: 1,
        y      : 0,
        transition
    }
}

export const fadeDown = {
    hidden: {
        opacity: 0,
        y      : -30
    },
    show  : {
        opacity: 1,
        y      : 0,
        transition
    }
}
