import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchMusic } from "../../reducers/music";
import { useNavigate } from "react-router-dom";
import { musicAddQuery } from "../../reducers/music";

import Chip from '@mui/joy/Chip';
import TextField from '@mui/joy/TextField';
import { IconButton } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';

import "./SearchField.css";

const SearchField = () => {
    const { register, handleSubmit, setValue, formState: {errors} } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setValue("band", "");
        dispatch(musicAddQuery(data.band));
        dispatch(fetchMusic(data));
        navigate("/search");
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit(onSubmit)} className="search-container_form">
                <TextField
                    className="search-container_input" 
                    color="info" 
                    variant="plain" 
                    placeholder="Search music, based on band you like..."
                    size="lg"
                    {...register("band", {required: true})}
                    endDecorator={
                        errors.band && <Chip color="danger" size="sm" variant="solid">Required</Chip>
                    }/>
                <IconButton color="info" variant="soft" size="lg" type="submit">
                    <SearchIcon />
                </IconButton>
            </form>
        </div>
    );
};

export default SearchField;