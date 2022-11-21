import Button from '@mui/joy/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DMCAButton = () => {
    return (
        <Button size="sm" endDecorator={<ErrorOutlineIcon />} color="danger" disabled={true} variant="soft">
            DMCA
        </Button>
    );
};

export default DMCAButton;