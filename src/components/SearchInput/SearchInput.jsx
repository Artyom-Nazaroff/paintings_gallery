import React, {useState} from 'react';
import styles from "./SearchInput.module.scss";

const SearchInput = ({searchPaintings}) => {
    const [text, setText] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchPaintings(text, 1);
        }
    };

    return (
        <>
            <input
                type="text"
                className={styles.inputName}
                placeholder={'Name'}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={e => handleKeyDown(e)}
            />
        </>
    );
};

export default SearchInput;