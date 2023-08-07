import React from 'react'
import styled from 'styled-components'

export default function SearchResults({ results, onResultClick }) {
  return (
    <ResultsContainer>
      {results.map((result, index) => (
        <ResultItem
          key={`${result.city}-${index}`}
          onClick={() => onResultClick(result)}
        >
          <p>{result.city}</p>
          <span>{result.country}</span>
        </ResultItem>
      ))}
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  margin-top: -30px;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  z-index: 1;
`

const ResultItem = styled.div`
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  span {
    color: #666;
  }
`
