import { useEffect, useState } from "react";

const Header = () => {
    const [isShow, setIsShow] = useState(false);

    // first work and everytime on re-render
    useEffect(() => {
        console.log("Use effect after re-render");
    });
    // first work only
    useEffect(() => {
        console.log("Use effect first only");
    }, []);
    // first work and on isShow change
    useEffect(() => {
        console.log("Use effect isShow update");
    }, [isShow]);

    const mouseOver = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            <h1 onMouseOver={mouseOver}>Header</h1>
            {isShow && <p>Hello world.</p>}
        </>
    );
};

export default Header;
