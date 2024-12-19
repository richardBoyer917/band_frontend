import { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  return useContext(SearchContext)
}

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
    const fakeResults = [`Result for "${searchQuery}" 1`, `Result for "${searchQuery}" 2`]
    setResults(fakeResults)
  }

  return (
    <SearchContext.Provider value={{ query, results, handleSearch }}>
      {children}
    </SearchContext.Provider>
  )
}
