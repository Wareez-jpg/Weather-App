import { useState } from 'react' 

function SearchBar({ onSearch }) {
    const [city, setCity] = useState('')

    function handleClick() {
        onSearch(city)
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter a city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
             />
            <button type="button" onClick={handleClick}>Search</button>
        </div>
    )
}

export default SearchBar