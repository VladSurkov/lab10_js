import React from 'react';
import style from './Image.module.css';

const Image = (props) => {
    return (
        <div className={style.block}>
            <img src={props.src} />

            <button
                type='button'
                class='btn btn-default'
                onClick={() => {
                    props.onClick(false);
                }}
            >
                Close
            </button>
        </div>
    );
};

export default Image;
