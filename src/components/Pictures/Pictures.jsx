import React from 'react';
import styles from "./Pictures.module.scss";

const Pictures = ({paintings, authors, locations}) => {
    // Использовать useMemo();
    const identifyAuthor = (id) => {
        const author = authors.filter(item => item.id === id)[0];
        return author.name;
    };

    const identifyLocation = (id) => {
        const location = locations.filter(item => item.id === id)[0];
        return location.location;
    };

    if (!paintings) return null;
    return (
        <div className={styles.gallery}>
            {paintings.map(el =>
                <div className={styles.galleryItemWrapper} key={el.id}>
                    <div className={styles.galleryItem} key={el.id}>
                        <img src={`https://test-front.framework.team/${el.imageUrl}`} alt=""/>
                        <div className={styles.pictureDescription}>
                            <div className={styles.pictureTitle}>
                                {el.name}
                            </div>
                            <ul className={styles.pictureInfo}>
                                <li>Author: {identifyAuthor(el.authorId)}</li>
                                <li>Created: {el.created}</li>
                                <li>Location: {identifyLocation(el.locationId)}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pictures;