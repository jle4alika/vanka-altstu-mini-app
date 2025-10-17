import React from 'react';
import '../../index.css'
import {motion} from 'framer-motion';

const Lessons = ({ selectedDay, myPair }) => {
    return (
        <motion.div className="p-0"
            initial={{x: -100, opacity:0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1, ease: "easeInOut"}}
        >

            <div className="p-0">
                {myPair[selectedDay].lessons.map((lesson, idx) => (
                    <div key={idx} >
                        <div className="flex items-center justify-start mb-3 mt-3">
                            <div className=" ml bg-(--color-my-general) justify-start rounded-br-2xl rounded-tr-2xl w-10 h-5"></div>
                            <div className=" w-fit pl-3 ">{lesson.time}</div>
                        </div>
                        <div className="ml-3 mr-3 p-3  bg-(--color-my-general) rounded-2xl ">
                            <div>{lesson.subject}</div>
                            <div>{lesson.type}</div>
                            <div>{lesson.teacher}</div>
                        </div>
                    </div>


                ))}
            </div>
        </motion.div>
    );
};

export default Lessons;