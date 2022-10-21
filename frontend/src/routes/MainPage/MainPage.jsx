import { CssVarsProvider } from '@mui/joy/styles';

import Header from '../../components/Header/Header';
import SearchField from "../../components/SearchField/SearchField";
import VantaBackground from "../../components/VantaBackground/VantaBackground";

const MainPage = () => {
    return (
        <CssVarsProvider>
            <VantaBackground type="Main"/>
            <Header/>
            <SearchField/>
        </CssVarsProvider>
    );
};

export default MainPage;