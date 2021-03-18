import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './Search.css';
import { getAllProducts } from '../api'

const BASE_URL = 'http://localhost:5000'

const Search = () => {
    const [productList, setProductList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchEl = useRef(null);

    const fetchProducts = async () => {
        try {
          const {products} = await getAllProducts();
          setProductList(products);
        //   console.log(products)
        } catch (error) {
          console.error(error);
        }
      }

      console.log('Product List:', productList)

    useEffect(() => {
        fetchProducts();
    }, [])

    return (<>
        <div className='pageContainer'>
            <div className='searchBox'>{
                productList && productList.filter((product) => {
                    if (searchTerm == "") {
                        return;
                    } else if (product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return product;
                    } 
                }).map(({id, authorId, title, active}, idx) =>
                    <div key={idx} className='productLine'>
                        <p>{id}</p>
                        <p>{title}</p>
                        <p>{active ? <>In stock</> : <>Out of stock</>}</p>
                    </div>
                )
                }
            </div>
            <div className='searchForm'>
                <input className='searchBar' type='text' name='search-term' placeholder='Search' ref={searchEl} onChange={e =>{setSearchTerm(e.target.value)}}/>
            </div>
        </div>
    </>)
}

export default Search;