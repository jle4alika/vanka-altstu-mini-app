import React from 'react';
import {motion} from "framer-motion";
import myWork from "../../APi/workapi.js";

const HomeWork = () => {

    const work = Object.values(myWork).map(item => item.work);

    return (
        <div>
            <motion.div
                className="ml-3 mr-3 p-3 bg-[--color-my-general] rounded-2xl text-[--color-my-primary]  mt-2 "
                initial={{x: -100, opacity:0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 1, ease: "easeInOut"}}
            >
                {work.map((l, id) => (
                    <div key={id} >

                        <div className="p-3  bg-(--color-my-general) rounded-2xl my-3">
                            <div className=" w-fit pl-3 ">{l.time}</div>
                            <div className=" w-full h-1 bg-(--color-my-acient) "></div>
                            <div>{l.title}</div>
                            <div>{l.body}</div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default HomeWork;