const SeachResults = ( data ) => {

    if(!data || !data.length) return null;

    const resultListHost = data.map(( data ) => {
        
        return (
        <li>
            
            <span>{ data }</span>
        </li>)
    });

    return (
    <div className='results-hosts'>
        <ul>{resultListHost}</ul>
      </div> 
    );    
};

export default SeachResults;