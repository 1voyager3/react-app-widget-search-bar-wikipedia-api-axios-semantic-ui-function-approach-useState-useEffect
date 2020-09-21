import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('programming');

    // =================================================================
    // use this useState only for second alternative option of useEffect
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    // =================================================================

    const [results, setResults] = useState([]);


    // initial useEffect with two dependencies which can cause the bug
    // and second XHR request (look at Console --> Network --> XHR)
    // for at presence of second argument
    /*
    useEffect( () => {
        // two alternative full functions:
        //( async () => { await axios.get('somethingUrl') })()
        //const search = async () => { await axios.get("somethingUrl"); }
        // axios.get("something").then((response) => {console.log(response.data)});
        const search = async () => {
            // destructuring to get data variable to set result after we get information from API
            const { data } = await axios.get("https://en.wikipedia.org/w/api.php",
                {
                    // it will take this parameters and append after ? (query) url automatically
                    //example:
                    //https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=programming
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: 'json',
                        srsearch: term
                    }
                });
            setResults(data.query.search);
        }

        // searching on initial render (in order to render the list in initial search without delay of timeout)
        if ( term && !results.length) {
            search()
        } else {
            // delay calling request of API
            const timeoutId = setTimeout( () => {
                // full alternative if (term !== '') { return search() };
                if (term) {
                    search();
                }
            }, 1000);

            // cancel previous timer in order to cancel previous request and to get (search) the data only for last decided request
            return () => {
                clearTimeout(timeoutId);
            };
        }

    }, [term, results.length]);
    */

    // ======================================================================
    // second alternative option of useEffect only with only
    // one dependency to avoid getting a bug for the second dependency
    // and getting second XHR request (look at Console --> Network --> XHR)
    // controlling change of term (pre significant change)
    useEffect( () => {

        const timerId = setTimeout( () => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        }

    }, [term]);

    useEffect( () => {

        // two alternative full functions:
        //( async () => { await axios.get('somethingUrl') })()
        //const search = async () => { await axios.get("somethingUrl"); }
        // axios.get("something").then((response) => {console.log(response.data)});
        const search = async () => {
            // destructuring to get data variable to set result after we get information from API
            const { data } = await axios.get("https://en.wikipedia.org/w/api.php",
                {
                    // it will take this parameters and append after ? (query) url automatically
                    //example:
                    //https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=programming
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: 'json',
                        srsearch: debouncedTerm
                    }
                });
            setResults(data.query.search);
        }

        search()

    }, [debouncedTerm])
    // ========================================================================


    const renderedResults = results.map( (result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* using tag "dangerouslySetInnerHTML" to turn HTML snippet like {/*"<span class="searchmatch">Programming</span> (music)", into the plain text*/}
                    {/* if we use malicious API, our app can be controlled !!! */}
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}/>
                </div>
            </div>
        )
    })


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label> Enter Search Term</label>
                    <input
                        className="input"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )

}

export default Search;