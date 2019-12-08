import React from 'react'

// dependencies
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';


// component
export default function Asynchronous({ func, labelTxt }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }
        (async () => {
            const response = await fetch('https://api.openaq.org/v1/cities?country=PL&limit=200');
            const countries = await response.json();

            if (active) {
                setOptions(countries.results);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="country-select"
            style={{ width: 300 }}
            onChange={func}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionLabel={option => option.city}
            options={options}
            loading={loading}
            renderInput={params => (
                <TextField
                    {...params}
                    label={labelTxt}
                    fullWidth
                    variant="filled"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}