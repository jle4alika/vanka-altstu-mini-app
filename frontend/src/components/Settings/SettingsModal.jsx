import React, {useState} from 'react';
import cl from './MyModal.module.css';


const SettingsModal = ({visible, setVisible}) => {

    const rootStyle = [cl.myModal]
    if (visible) {
        rootStyle.push(cl.active);
    }



    const [body, setBody] = useState('');

    const addNewHomeWork = (e) => {
        e.preventDefault();
        const newHomeWork = {
            id: new Date(),
            body
        };
        setVisible(false);
        setBody(newHomeWork.body)


    }


    return (
       <>
           <div
               className={rootStyle.join(' ')}
           >
               <form
                   className={cl.myModalContent}
               >
                   <textarea
                       value={body}
                       onChange={e => setBody(e.target.value)}
                       className="w-full h-fit border-3 border-(--color-my-acient-dark) focus:border-(--color-my-acient) focus:outline-1 focus:outline-(--color-my-acient) disabled:border-gray-200 disabled:bg-gray-50  rounded-2xl p-2 mb-2"

                       placeholder={'Задание:'}
                   >
                     {body}
                   </textarea>

                   <button
                       className="flex w-fit bg-transparent rounded-2xl p-1 mt-3 mb-5 border-(--color-my-acient-dark) active:border-(--color-my-acient) border-3"
                       onClick={addNewHomeWork}
                   >
                       Отправить
                   </button>
               </form>
           </div>
       </>
    );
};

export default SettingsModal;