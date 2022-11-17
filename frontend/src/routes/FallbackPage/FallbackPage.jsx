import { CssVarsProvider } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";

import "./FallbackPage.css";

const FallbackPage = () => {
    return (
        <CssVarsProvider>
            <div className="fallback_background">
                <div className="fallback_spinner">
                    <CircularProgress color="info" variant="plain" />
                </div>
            </div>
        </CssVarsProvider>
    );
};

export default FallbackPage;