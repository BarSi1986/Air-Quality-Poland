import React from 'react'
import Button from '@material-ui/core/Button';


const PrimaryButton = ({ buttonTxt, func }) => {
    return (

        <Button className='detailButton' onClick={func} variant="contained" color="default">
            {buttonTxt}
        </Button>

    )
}

export default PrimaryButton
