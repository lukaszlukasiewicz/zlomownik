import React, {useState,useEffect,useCallback} from 'react';

const  MediaComponent = (props) =>  props.match ? props.children : null


export default function (query = "" ) {
  const [match, setMatch] = useState( window.matchMedia(query).matches);
  
  const matchQuery = useCallback(e => {
    const queryMatch = window.matchMedia(query);
    if(match !== queryMatch.matches) setMatch(queryMatch.matches);
  },[match, query]);

  useEffect(()=>{
    window.addEventListener('resize', matchQuery);
    return () => {
      window.removeEventListener('resize', matchQuery);
    }
  },[matchQuery]);
  return [match,MediaComponent];
} 