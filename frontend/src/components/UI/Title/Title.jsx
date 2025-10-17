import React from 'react';
import {motion} from "framer-motion";

const Title = ({children}) => {
    return (
        <motion.div
            className="flex font-bold text-(--color-my-primary) h-10 bg-(--color-my-acient) rounded-bl-3xl rounded-br-3xl items-center justify-center "
            initial = {{y: -100}}
            animate={{y: 0}}
            transition={{duration: 0.3}}
        >
            <h1 className="items-center flex">{children}</h1>
        </motion.div>
    );
};

export default Title;