import React from "react";

const Genre = (props) => {
    const { items, selectedGenre } = props;
    return ( 
        <ul className="list-group">
        {items.map(genre => (
            <li key={genre._id} style={{ cursor: "pointer" }} 
                onClick={() => props.onGenreChange(genre)}
                className={genre === selectedGenre ?  "list-group-item  active" :  "list-group-item"}>
               {genre.name}
            </li>
        ))}
    </ul>
     );
}
 
export default Genre;