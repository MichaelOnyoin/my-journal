import { useState, useEffect } from 'react';
import { supabase } from '../../backend/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const email = await AsyncStorage.getItem('email');
      try{
      let { data:table, error } = await supabase.from('Journals').select("*").eq('email',email);
      if (error) {
        console.error('Error fetching journals:', error.message);
          return;
      }
      

      //setLoading(false);
      if (table && table.length > 0) {
        setData(table);
      }
     }catch (error) {
      console.error('Error fetching Journal Entries');
    }
};
    

    fetchData();
  }, []);

  return { data, loading };
};
