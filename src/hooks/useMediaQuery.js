import {useState,useEffect,useCallback} from 'react';

export default function (query = "" ) {
  const [match, setMatch] = useState(false);
  
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
  return match;
} 