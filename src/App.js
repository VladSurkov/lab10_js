import React, {useState, useEffect} from 'react';
import {FixedSizeList as List} from 'react-window';
import './App.css';
import Image from './Components/Image';

const VirtualizedList = ({data}) => {
    const [showImage, setShowImage] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const handleImageClick = (url) => {
        setSelectedImageIndex(url);
        setShowImage(true);
    };

    const closeWindow = (value) => {
        setShowImage(value);
    };

    const Row = ({index}) => (
        <div className='item'>
            <img
                className='img'
                src={data[index].thumbnailUrl}
                onClick={() => {
                    handleImageClick(data[index].url);
                }}
            />{' '}
            {data[index].title}
        </div>
    );

    return (
        <>
            <List
                height={400}
                width={500}
                itemSize={50}
                itemCount={data.length}
                // className='box'
            >
                {Row}
            </List>
            {showImage ? (
                <Image
                    src={selectedImageIndex}
                    onClick={closeWindow}
                />
            ) : null}
        </>
    );
};

function App() {
    const [data, setData] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const temp = data.filter((item) => {
                    const wordsCount = item.title.split(' ').length;
                    return wordsCount <= 7;
                });
                setData(temp);
            })
            .catch((error) => {
                console.error(
                    'There was a problem with the fetch operation:',
                    error,
                );
            });
    }, []);

    return (
        <div
            id='main'
            className='main'
        >
            {data.length > 0 ? (
                <VirtualizedList data={data} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
