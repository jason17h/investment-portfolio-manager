// editBlurb: pushes changes made to the blurb (primary purpose is to update the tax for fee based funds)

const editBlurb = (blurb) => ({
    type: 'EDIT_BLURB',
    blurb
})

export default editBlurb