import Button from '@mui/joy/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DCMAButton = () => {
    return (
        <Button size="sm" endDecorator={<ErrorOutlineIcon />} color="danger" disabled={true} variant="soft">
            DCMA
        </Button>
    );
};

export default DCMAButton;