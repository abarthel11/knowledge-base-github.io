// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

import React from "react";
import { useState, useEffect } from "react";
import { AUTH_KEY } from "../utils/auth";
import { GET_ALL_ARTICLES } from "./utils/queries";


const URL = `https://cloudcoach--partial.sandbox.my.salesforce.com/services/data/v25.0/query/?q=${GET_ALL_ARTICLES.split(' ').join('+')}`
const GET_ARTICLES = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${AUTH_KEY}`
    }
}


export default function KnowledgeArticles() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    console.log(GET_ALL_ARTICLES);
    console.log(URL);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch(URL,GET_ARTICLES)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.error(error);
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.Title}
            </li>
          ))}
        </ul>
      );
    }
  }

